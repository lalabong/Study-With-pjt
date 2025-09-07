import { NextFunction, Request, Response } from 'express';
import { ControllerFn } from '../types/index.js';
import prisma from '../lib/prisma.js';
import { createErrorResponse, createSuccessResponse } from '../utils/responseUtils.js';
import { ERROR_CODES, ROOM_ERROR, ROOM_SUCCESS } from '../constants/index.js';
import { AuthRequest } from '../types/index.js';

export const getParticipants: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const roomId = req.params.roomId;

    if (!roomId) {
      createErrorResponse(res, 404, ROOM_ERROR.ROOM_NOT_FOUND, ERROR_CODES.ROOM_NOT_FOUND);
      return;
    }

    const participants = await prisma.user.findMany({
      where: {
        roomParticipations: {
          some: {
            roomCuid: roomId,
          },
        },
      },
      select: {
        id: true,
        userId: true,
        nickname: true,
        profileImg: true,
      },
    });

    createSuccessResponse(res, 200, undefined, ROOM_SUCCESS.GET_PARTICIPANT_INFO, {
      data: { participants },
    });
  } catch (error) {
    console.error('참가자 정보 조회 에러:', error);
    next(error);
  }
};

export const createRoom: ControllerFn = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.body;
    const userCuid = req.user?.id;

    if (!name || name.trim() === '') {
      createErrorResponse(res, 400, ROOM_ERROR.ROOM_NAME_REQUIRED, ERROR_CODES.ROOM_NAME_REQUIRED);
      return;
    }

    if (!userCuid) {
      createErrorResponse(res, 401, ROOM_ERROR.ROOM_NOT_FOUND, ERROR_CODES.USER_UNAUTHORIZED);
      return;
    }

    // 트랜잭션을 사용하여 이전 방 나가기와 새 방 생성을 한번에 처리
    const newRoom = await prisma.$transaction(async (tx) => {
      // 기존에 참여 중인 방 정보 조회
      const existingParticipations = await tx.roomParticipation.findMany({
        where: { userCuid },
        select: { roomCuid: true },
      });

      // 기존에 참여 중인 방이 있다면 모두 나가기
      if (existingParticipations.length > 0) {
        await tx.roomParticipation.deleteMany({
          where: { userCuid },
        });

        // 각 방에서 남은 참여자 수를 확인하고 빈 방은 삭제
        for (const participation of existingParticipations) {
          const remainingParticipants = await tx.roomParticipation.count({
            where: { roomCuid: participation.roomCuid },
          });

          // 남은 참여자가 없으면 방 삭제
          if (remainingParticipants === 0) {
            await tx.room.delete({
              where: { id: participation.roomCuid },
            });
          }
        }
      }

      // 새로운 방 생성
      const room = await tx.room.create({
        data: {
          name: name.trim(),
          ownerCuid: userCuid,
        },
      });

      // 새 방에 참여자로 추가
      await tx.roomParticipation.create({
        data: {
          userCuid: userCuid,
          roomCuid: room.id,
        },
      });

      return room;
    });

    createSuccessResponse(res, 201, undefined, ROOM_SUCCESS.CREATE_ROOM, {
      data: { room: newRoom },
    });
  } catch (error) {
    console.error('방 생성 에러:', error);
    next(error);
  }
};

export const leaveRoom: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const roomId = req.params.roomId;
    const userCuid = (req as any).user?.id;

    if (!roomId || !userCuid) {
      createErrorResponse(res, 400, ROOM_ERROR.ROOM_NOT_FOUND, ERROR_CODES.ROOM_NOT_FOUND);
      return;
    }

    // 트랜잭션을 사용하여 방 나가기 및 필요시 방 삭제 처리
    const result = await prisma.$transaction(async (tx) => {
      // 사용자가 해당 방에 참여하고 있는지 확인
      const participation = await tx.roomParticipation.findUnique({
        where: {
          userCuid_roomCuid: {
            userCuid,
            roomCuid: roomId,
          },
        },
      });

      if (!participation) {
        throw new Error('PARTICIPANT_NOT_FOUND');
      }

      // 참여자 제거
      await tx.roomParticipation.delete({
        where: {
          userCuid_roomCuid: {
            userCuid,
            roomCuid: roomId,
          },
        },
      });

      // 남은 참여자 수 확인
      const remainingParticipants = await tx.roomParticipation.count({
        where: { roomCuid: roomId },
      });

      // 마지막 참여자였다면 방 삭제
      if (remainingParticipants === 0) {
        await tx.room.delete({
          where: { id: roomId },
        });
        return { roomDeleted: true };
      }

      return { roomDeleted: false };
    });

    createSuccessResponse(res, 200, undefined, ROOM_SUCCESS.LEAVE_ROOM, {
      data: { roomDeleted: result.roomDeleted },
    });
  } catch (error) {
    if ((error as Error).message === 'PARTICIPANT_NOT_FOUND') {
      createErrorResponse(
        res,
        404,
        ROOM_ERROR.PARTICIPANT_NOT_FOUND,
        ERROR_CODES.ROOM_PARTICIPANT_NOT_FOUND
      );
      return;
    }

    console.error('방 나가기 에러:', error);
    next(error);
  }
};

export const checkLastParticipant: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const roomId = req.params.roomId;
    const userCuid = (req as any).user?.id;

    if (!roomId || !userCuid) {
      createErrorResponse(res, 400, ROOM_ERROR.ROOM_NOT_FOUND, ERROR_CODES.ROOM_NOT_FOUND);
      return;
    }

    // 현재 방의 참여자 수 확인
    const participantCount = await prisma.roomParticipation.count({
      where: { roomCuid: roomId },
    });

    // 사용자가 해당 방에 참여하고 있는지 확인
    const isParticipant = await prisma.roomParticipation.findUnique({
      where: {
        userCuid_roomCuid: {
          userCuid,
          roomCuid: roomId,
        },
      },
    });

    const isLastParticipant = participantCount === 1 && !!isParticipant;

    createSuccessResponse(res, 200, undefined, ROOM_SUCCESS.CHECK_LAST_PARTICIPANT, {
      data: { isLastParticipant, participantCount },
    });
  } catch (error) {
    console.error('마지막 참여자 확인 에러:', error);
    next(error);
  }
};

export const getCurrentRoom: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userCuid = (req as any).user?.id;

    if (!userCuid) {
      createErrorResponse(res, 400, ROOM_ERROR.ROOM_NOT_FOUND, ERROR_CODES.ROOM_NOT_FOUND);
      return;
    }

    // 현재 사용자가 참여 중인 방 찾기
    const participation = await prisma.roomParticipation.findFirst({
      where: { userCuid },
      include: {
        room: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            ownerCuid: true,
          },
        },
      },
    });

    if (!participation) {
      createSuccessResponse(res, 200, undefined, ROOM_SUCCESS.GET_ROOM_INFO, {
        data: { currentRoom: null },
      });
      return;
    }

    createSuccessResponse(res, 200, undefined, ROOM_SUCCESS.GET_ROOM_INFO, {
      data: { currentRoom: participation.room },
    });
  } catch (error) {
    console.error('현재 방 조회 에러:', error);
    next(error);
  }
};

export const getRoomInfo: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const roomId = req.params.roomId;
    const userCuid = (req as any).user?.id;

    if (!roomId || !userCuid) {
      createErrorResponse(res, 400, ROOM_ERROR.ROOM_NOT_FOUND, ERROR_CODES.ROOM_NOT_FOUND);
      return;
    }

    // 사용자가 해당 방에 참여하고 있는지 확인
    const participation = await prisma.roomParticipation.findUnique({
      where: {
        userCuid_roomCuid: {
          userCuid,
          roomCuid: roomId,
        },
      },
    });

    if (!participation) {
      createErrorResponse(
        res,
        403,
        ROOM_ERROR.PARTICIPANT_NOT_FOUND,
        ERROR_CODES.ROOM_PARTICIPANT_NOT_FOUND
      );
      return;
    }

    const room = await prisma.room.findUnique({
      where: { id: roomId },
      select: {
        id: true,
        name: true,
        createdAt: true,
        ownerCuid: true,
      },
    });

    if (!room) {
      createErrorResponse(res, 404, ROOM_ERROR.ROOM_NOT_FOUND, ERROR_CODES.ROOM_NOT_FOUND);
      return;
    }

    createSuccessResponse(res, 200, undefined, ROOM_SUCCESS.GET_ROOM_INFO, {
      data: { room },
    });
  } catch (error) {
    console.error('방 정보 조회 에러:', error);
    next(error);
  }
};
