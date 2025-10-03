import { NextFunction, Request, Response } from 'express';
import { ControllerFn } from '../types/index.js';
import prisma from '../lib/prisma.js';
import { createErrorResponse, createSuccessResponse } from '../utils/responseUtils.js';
import { ERROR_CODES } from '../constants/index.js';
import { AuthRequest } from '../types/index.js';
import { WebSocketTimerService } from '../services/webSocketTimer.js';

// 채팅 메시지 전송
export const sendMessage: ControllerFn = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { roomId } = req.params;
    const { content } = req.body;
    const userCuid = req.user?.id;

    if (!userCuid) {
      createErrorResponse(res, 401, '인증이 필요합니다.', ERROR_CODES.CHAT_MESSAGE_UNAUTHORIZED);
      return;
    }

    if (!content || content.trim().length === 0) {
      createErrorResponse(
        res,
        400,
        '메시지 내용이 필요합니다.',
        ERROR_CODES.CHAT_MESSAGE_INVALID_CONTENT
      );
      return;
    }

    if (content.length > 1000) {
      createErrorResponse(
        res,
        400,
        '메시지는 1000자를 초과할 수 없습니다.',
        ERROR_CODES.CHAT_MESSAGE_INVALID_LENGTH
      );
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
        '해당 방에 접근 권한이 없습니다.',
        ERROR_CODES.CHAT_MESSAGE_FORBIDDEN
      );
      return;
    }

    // 채팅 메시지 생성
    const chatMessage = await prisma.chatMessage.create({
      data: {
        content: content.trim(),
        userCuid,
        roomCuid: roomId,
        messageType: 'message',
      },
      include: {
        user: {
          select: {
            id: true,
            userId: true,
            nickname: true,
            profileImg: true,
          },
        },
      },
    });

    // 웹소켓으로 실시간 채팅 메시지 브로드캐스트
    WebSocketTimerService.broadcastChatMessage(roomId, {
      id: chatMessage.id,
      content: chatMessage.content,
      messageType: chatMessage.messageType,
      createdAt: chatMessage.createdAt,
      user: {
        ...chatMessage.user,
        profileImg: chatMessage.user.profileImg || undefined,
      },
    });

    createSuccessResponse(
      res,
      201,
      {
        id: chatMessage.id,
        content: chatMessage.content,
        messageType: chatMessage.messageType,
        createdAt: chatMessage.createdAt,
        user: {
          ...chatMessage.user,
          profileImg: chatMessage.user.profileImg || undefined,
        },
      },
      '메시지가 전송되었습니다.',
      {
        message: {
          id: chatMessage.id,
          content: chatMessage.content,
          messageType: chatMessage.messageType,
          createdAt: chatMessage.createdAt,
          user: {
            ...chatMessage.user,
            profileImg: chatMessage.user.profileImg || undefined,
          },
        },
      }
    );
  } catch (error) {
    console.error('채팅 메시지 전송 에러:', error);
    next(error);
  }
};

// 방의 채팅 메시지 목록 조회
export const getRoomMessages: ControllerFn = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { roomId } = req.params;
    const userCuid = req.user?.id;
    const { page = '1', limit = '50' } = req.query;

    if (!userCuid) {
      createErrorResponse(res, 401, '인증이 필요합니다.', ERROR_CODES.CHAT_MESSAGE_UNAUTHORIZED);
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
        '해당 방에 접근 권한이 없습니다.',
        ERROR_CODES.CHAT_MESSAGE_FORBIDDEN
      );
      return;
    }

    const pageNumber = Math.max(1, parseInt(page as string, 10));
    const limitNumber = Math.min(100, Math.max(1, parseInt(limit as string, 10)));
    const offset = (pageNumber - 1) * limitNumber;

    // 채팅 메시지 조회 (최신순)
    const messages = await prisma.chatMessage.findMany({
      where: {
        roomCuid: roomId,
      },
      include: {
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
        createdAt: 'desc',
      },
      skip: offset,
      take: limitNumber,
    });

    // 전체 메시지 수 조회
    const totalMessages = await prisma.chatMessage.count({
      where: {
        roomCuid: roomId,
      },
    });

    const totalPages = Math.ceil(totalMessages / limitNumber);

    createSuccessResponse(
      res,
      200,
      {
        items: messages.reverse().map((msg) => ({
          ...msg,
          user: {
            ...msg.user,
            profileImg: msg.user.profileImg || undefined,
          },
        })), // 시간순으로 정렬
        pagination: {
          currentPage: pageNumber,
          totalPages,
          totalItems: totalMessages,
          hasNextPage: pageNumber < totalPages,
          hasPrevPage: pageNumber > 1,
        },
      },
      '채팅 메시지를 조회했습니다.'
    );
  } catch (error) {
    console.error('채팅 메시지 조회 에러:', error);
    next(error);
  }
};

// 최근 채팅 메시지 조회 (페이지네이션 없이 최근 N개)
export const getRecentMessages: ControllerFn = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { roomId } = req.params;
    const userCuid = req.user?.id;
    const { limit = '50' } = req.query;

    if (!userCuid) {
      createErrorResponse(res, 401, '인증이 필요합니다.', ERROR_CODES.CHAT_MESSAGE_UNAUTHORIZED);
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
        '해당 방에 접근 권한이 없습니다.',
        ERROR_CODES.CHAT_MESSAGE_FORBIDDEN
      );
      return;
    }

    const limitNumber = Math.min(100, Math.max(1, parseInt(limit as string, 10)));

    // 최근 채팅 메시지 조회
    const messages = await prisma.chatMessage.findMany({
      where: {
        roomCuid: roomId,
      },
      include: {
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
        createdAt: 'desc',
      },
      take: limitNumber,
    });

    const formattedMessages = messages.reverse().map((msg) => ({
      ...msg,
      user: {
        ...msg.user,
        profileImg: msg.user.profileImg || undefined,
      },
    }));

    createSuccessResponse(res, 200, formattedMessages, '최근 채팅 메시지를 조회했습니다.', {
      messages: formattedMessages,
    });
  } catch (error) {
    console.error('최근 채팅 메시지 조회 에러:', error);
    next(error);
  }
};
