import { NextFunction, Request, Response } from 'express';
import { ControllerFn } from '../types/index.js';
import prisma from '../lib/prisma.js';
import { createErrorResponse, createSuccessResponse } from '../utils/responseUtils.js';
import { ERROR_CODES, ROOM_ERROR, ROOM_SUCCESS } from '../constants/index.js';

export const getParticipants: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const roomId = req.params.roomId;

    const participants = await prisma.user.findMany({
      where: { roomCuid: roomId },
      select: {
        id: true,
        userId: true,
        nickname: true,
        profileImg: true,
      },
    });

    if (!roomId) {
      createErrorResponse(res, 404, ROOM_ERROR.ROOM_NOT_FOUND, ERROR_CODES.ROOM_NOT_FOUND);
      return;
    }

    createSuccessResponse(res, 200, undefined, ROOM_SUCCESS.GET_PARTICIPANT_INFO, {
      data: { participants },
    });
  } catch (error) {
    console.error('참가자 정보 조회 에러:', error);
    next(error);
  }
};
