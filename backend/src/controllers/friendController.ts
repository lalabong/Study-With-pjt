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

export const getUserByNickname: ControllerFn = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { nickname } = req.query as { nickname: string };
    const currentUserId = req.user?.id;

    if (!currentUserId) {
      createErrorResponse(
        res,
        401,
        USER_ERROR.UNAUTHORIZED,
        ERROR_CODES.USER_UNAUTHORIZED
      );
      return;
    }

    if (!nickname || typeof nickname !== 'string') {
      createErrorResponse(
        res,
        400,
        FRIEND_ERROR.FRIEND_REQUEST_REQUIRED_FIELD,
        ERROR_CODES.FRIEND_REQUEST_REQUIRED_FIELD
      );
      return;
    }

    const trimmedNickname = nickname.trim();
    if (trimmedNickname.length < 2) {
      createErrorResponse(
        res,
        400,
        FRIEND_ERROR.FRIEND_SEARCH_INVALID_NICKNAME,
        ERROR_CODES.FRIEND_SEARCH_INVALID_NICKNAME
      );
      return;
    }

    interface UserSearchResult {
      id: string;
      userId: string;
      nickname: string;
      profileImg: string | null;
      status: string | null;
    }

    const usersWithStatus = await prisma.$queryRaw<UserSearchResult[]>`
      SELECT DISTINCT
        u.id,
        u.userId,
        u.nickname,
        u.profileImg,
        CASE 
          WHEN f.status IS NULL THEN NULL
          WHEN f.status = 'accepted' THEN 'accepted'
          WHEN f.userCuid = ${currentUserId} AND f.status = 'pending' THEN 'pending_sent'
          WHEN f.friendCuid = ${currentUserId} AND f.status = 'pending' THEN 'pending_received'
          ELSE f.status
        END as status
      FROM user u
      LEFT JOIN friend f ON (
        (f.userCuid = ${currentUserId} AND f.friendCuid = u.id) OR
        (f.friendCuid = ${currentUserId} AND f.userCuid = u.id)
      )
      WHERE u.nickname LIKE ${`%${trimmedNickname}%`}
        AND u.id != ${currentUserId}
      ORDER BY u.nickname ASC
    `;
    
    createSuccessResponse(res, 200, { users: usersWithStatus, count: usersWithStatus.length }, FRIEND_SUCCESS.SEARCH_USER_BY_NICKNAME);
  } catch (error) {
    console.error('유저 닉네임으로 유저 검색 에러:', error);
    next(error);
  } 
}

export const getReceivedFriendRequests: ControllerFn = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userCuid } = req.params;

    const receivedFriendRequests = await prisma.friend.findMany({
      where: { 
        friendCuid: userCuid, 
        status: 'pending' 
      },
      select: {
        userCuid: true,
        status: true,
        user: {
          select: {
            id: true,
            userId: true,
            nickname: true,
            profileImg: true,
          },
        },
      },
      orderBy: {
        user: {
          createdAt: 'desc' 
        }
      }
    });

    createSuccessResponse(res, 200, { receivedFriendRequests }, FRIEND_SUCCESS.GET_RECEIVED_FRIEND_REQUESTS);
  } catch (error) {
    console.error('받은 친구 요청 목록 조회 에러:', error);
    next(error);
  }
}

export const postAcceptFriendRequest: ControllerFn = async (
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


    const existingRelation = await prisma.friend.findUnique({
      where: {
        userCuid_friendCuid: {
          userCuid: friendCuid,
          friendCuid: userCuid,
        },
      },
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

    if (existingRelation.status !== 'pending') {
      if (existingRelation.status === 'accepted') {
        createErrorResponse(
          res,
          400,
          FRIEND_ERROR.FRIEND_ALREADY_FRIENDS,
          ERROR_CODES.FRIEND_ALREADY_FRIENDS
        );
        return;
      }
    }

    await prisma.friend.update({
      where: {
        userCuid_friendCuid: {
          userCuid: friendCuid,
          friendCuid: userCuid,
        },
      },
      data: {
        status: 'accepted',
      },
    });

    createSuccessResponse(res, 200, undefined, FRIEND_SUCCESS.ACCEPT_FRIEND_REQUEST);
  } catch (error) {
    console.error('친구 요청 수락 에러:', error);
    next(error);
  }
}


export const deleteRejectFriendRequest: ControllerFn = async (
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

    const existingRelation = await prisma.friend.findUnique({
      where: {
        userCuid_friendCuid: {
          userCuid: friendCuid,
          friendCuid: userCuid,
        },
      },
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

    if (existingRelation.status !== 'pending') {
      if (existingRelation.status === 'accepted') {
        createErrorResponse(
          res,
          400,
          FRIEND_ERROR.FRIEND_ALREADY_FRIENDS,
          ERROR_CODES.FRIEND_ALREADY_FRIENDS
        );
        return;
      }
    }

    await prisma.friend.delete({
      where: {
        userCuid_friendCuid: {
          userCuid: friendCuid,
          friendCuid: userCuid,
        },
      },
    });

    createSuccessResponse(res, 200, undefined, FRIEND_SUCCESS.REJECT_FRIEND_REQUEST);
  } catch (error) {
    console.error('친구 요청 거절 에러:', error);
    next(error);
  }
}