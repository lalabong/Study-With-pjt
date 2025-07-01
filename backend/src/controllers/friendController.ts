import prisma from '#src/lib/prisma';
import { ControllerFn, AuthRequest } from '#src/types/index';
import { NextFunction, Request, Response } from 'express';
import { createErrorResponse, createSuccessResponse } from '#src/utils/responseUtils';
import { USER_ERROR, ERROR_CODES, FRIEND_ERROR } from '#src/constants/errorMessages';
import { FRIEND_SUCCESS } from '#src/constants/successMessages';

export const getFriends: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userCuid } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userCuid },
      select: { id: true },
    });

    if (!user) {
      createErrorResponse(res, 404, USER_ERROR.USER_NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
      return;
    }

    interface FriendInfo {
      id: string;
      userId: string;
      nickname: string;
      profileImg: string | null;
    }

    const friends = await prisma.$queryRaw<FriendInfo[]>`
      SELECT DISTINCT
        u.id,
        u.userId,
        u.nickname,
        u.profileImg
      FROM user u
      INNER JOIN friend f ON (
        (f.userCuid = ${userCuid} AND f.friendCuid = u.id) OR
        (f.friendCuid = ${userCuid} AND f.userCuid = u.id)
      )
      WHERE f.status = 'accepted'
    `;

    createSuccessResponse(res, 200, { friends }, FRIEND_SUCCESS.GET_FRIENDS);
  } catch (error) {
    console.error('친구 목록 조회 에러:', error);
    next(error);
  }
};

export const deleteFriend: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userCuid } = req.params;
    const { friendCuid } = req.body;

    const users = await prisma.user.findMany({
      where: {
        id: { in: [userCuid, friendCuid] },
      },
      select: { id: true },
    });

    if (users.length !== 2) {
      createErrorResponse(res, 404, USER_ERROR.USER_NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
      return;
    }

    const existingFriend = await prisma.friend.findFirst({
      where: {
        OR: [
          { userCuid, friendCuid },
          { userCuid: friendCuid, friendCuid: userCuid },
        ],
      },
    });

    if (!existingFriend) {
      createErrorResponse(res, 404, FRIEND_ERROR.FRIEND_NOT_FOUND, ERROR_CODES.FRIEND_NOT_FOUND);
      return;
    }

    await prisma.friend.deleteMany({
      where: {
        OR: [
          { userCuid, friendCuid },
          { userCuid: friendCuid, friendCuid: userCuid },
        ],
      },
    });

    createSuccessResponse(res, 200, undefined, FRIEND_SUCCESS.DELETE_FRIEND);
  } catch (error) {
    console.error('친구 삭제 에러:', error);
    next(error);
  }
};

export const postFriendRequest: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userCuid } = req.params;
    const { friendCuid } = req.body;
    
    if (!friendCuid) {
      createErrorResponse(
        res,
        400,
        FRIEND_ERROR.FRIEND_REQUEST_REQUIRED_FIELD,
        ERROR_CODES.FRIEND_REQUEST_REQUIRED_FIELD
      );
      return;
    }

    if (userCuid === friendCuid) {
      createErrorResponse(
        res,
        400,
        FRIEND_ERROR.FRIEND_SELF_REQUEST,
        ERROR_CODES.FRIEND_SELF_REQUEST
      );
      return;
    }

    const users = await prisma.user.findMany({
      where: {
        id: { in: [userCuid, friendCuid] },
      },
      select: { id: true, userId: true },
    });

    if (users.length !== 2) {
      createErrorResponse(res, 404, USER_ERROR.USER_NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
      return;
    }

    const existingRelation = await prisma.friend.findFirst({
      where: {
        OR: [
          { userCuid, friendCuid },
          { userCuid: friendCuid, friendCuid: userCuid },
        ],
      },
      select: { status: true, userCuid: true, friendCuid: true },
    });

    if (existingRelation) {
      if (existingRelation.status === 'accepted') {
        createErrorResponse(
          res,
          400,
          FRIEND_ERROR.FRIEND_ALREADY_FRIENDS,
          ERROR_CODES.FRIEND_ALREADY_FRIENDS
        );
        return;
      }

      if (existingRelation.status === 'pending') {
        createErrorResponse(
          res,
          400,
          FRIEND_ERROR.FRIEND_REQUEST_ALREADY_EXISTS,
          ERROR_CODES.FRIEND_REQUEST_ALREADY_EXISTS
        );
        return;
      }
    }

    await prisma.friend.create({
      data: {
        userCuid,
        friendCuid,
        status: 'pending',
      },
    });

    createSuccessResponse(res, 200, undefined, FRIEND_SUCCESS.SEND_FRIEND_REQUEST);
  } catch (error) {
    console.error('친구 요청 전송 에러:', error);
    next(error);
  }
};

export const deleteFriendRequest: ControllerFn = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userCuid } = req.params;
    const { friendCuid } = req.body;

    if (!friendCuid) {
      createErrorResponse(
        res,
        400,
        FRIEND_ERROR.FRIEND_REQUEST_REQUIRED_FIELD,
        ERROR_CODES.FRIEND_REQUEST_REQUIRED_FIELD
      );
      return;
    }

    // 본인이 보낸 친구 요청인지 확인
    if (req.user?.id !== userCuid) {
      createErrorResponse(
        res,
        403,
        FRIEND_ERROR.FRIEND_REQUEST_UNAUTHORIZED,
        ERROR_CODES.FRIEND_REQUEST_UNAUTHORIZED
      );
      return;
    }

    // 자기 자신에게 친구 요청 취소 방지
    if (userCuid === friendCuid) {
      createErrorResponse(
        res,
        400,
        FRIEND_ERROR.FRIEND_SELF_REQUEST,
        ERROR_CODES.FRIEND_SELF_REQUEST
      );
      return;
    }

    // 대상 사용자 존재 확인
    const targetUser = await prisma.user.findUnique({
      where: { id: friendCuid },
      select: { id: true },
    });

    if (!targetUser) {
      createErrorResponse(
        res,
        404,
        USER_ERROR.USER_NOT_FOUND,
        ERROR_CODES.USER_NOT_FOUND
      );
      return;
    }

    const existingRelation = await prisma.friend.findUnique({
      where: {
        userCuid_friendCuid: {
          userCuid,
          friendCuid,
        },
      },
      select: { status: true },
    });

    if (!existingRelation) {
      createErrorResponse(
        res,
        404,
        FRIEND_ERROR.FRIEND_REQUEST_NOT_FOUND,
        ERROR_CODES.FRIEND_REQUEST_NOT_FOUND
      );
      return;
    }

    // pending 상태의 친구 요청만 취소 가능
    if (existingRelation.status !== 'pending') {
      createErrorResponse(
        res,
        400,
        existingRelation.status === 'accepted'
          ? FRIEND_ERROR.FRIEND_ALREADY_FRIENDS
          : FRIEND_ERROR.FRIEND_REQUEST_CANCEL_NOT_FOUND,
        existingRelation.status === 'accepted'
          ? ERROR_CODES.FRIEND_ALREADY_FRIENDS
          : ERROR_CODES.FRIEND_REQUEST_CANCEL_NOT_FOUND
      );
      return;
    }

    await prisma.friend.delete({
      where: {
        userCuid_friendCuid: {
          userCuid,
          friendCuid,
        },
      },
    });

    createSuccessResponse(res, 200, undefined, FRIEND_SUCCESS.DELETE_FRIEND_REQUEST);
  } catch (error) {
    console.error('친구 요청 취소 전송 에러:', error);
    next(error);
  }
};
