import prisma from '#src/lib/prisma';
import { ControllerFn } from '#src/types/index';
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
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { userId },
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
        (f.userCuid = ${user.id} AND f.friendCuid = u.id) OR
        (f.friendCuid = ${user.id} AND f.userCuid = u.id)
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
    const { userId } = req.params;
    const { friendCuid } = req.body;

    const user = await prisma.user.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!user) {
      createErrorResponse(res, 404, USER_ERROR.USER_NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
      return;
    }

    const existingFriend = await prisma.friend.findFirst({
      where: {
        OR: [
          { userCuid: user.id, friendCuid },
          { userCuid: friendCuid, friendCuid: user.id },
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
          { userCuid: user.id, friendCuid },
          { userCuid: friendCuid, friendCuid: user.id },
        ],
      },
    });

    createSuccessResponse(res, 200, undefined, FRIEND_SUCCESS.DELETE_FRIEND);
  } catch (error) {
    console.error('친구 삭제 에러:', error);
    next(error);
  }
};

