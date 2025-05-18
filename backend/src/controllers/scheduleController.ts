import { Request, Response, NextFunction } from 'express';

import prisma from '../lib/prisma.js';
import { ControllerFn, AuthRequest } from '../types/index.js';
import { createErrorResponse, createSuccessResponse } from '../utils/responseUtils.js';
import { AUTH_ERROR, SCHEDULE_ERROR, USER_ERROR, ERROR_CODES } from '../constants/errorMessages.js';
import { SCHEDULE_SUCCESS } from '../constants/successMessages.js';
import { DAILY_SCHEDULE_LIMIT } from '../constants/schedule.js';

// 사용자의 일정 날짜만 조회(선택한 달 +-1달)
export const getUserScheduleDates: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      createErrorResponse(res, 404, USER_ERROR.USER_NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
      return;
    }

    let whereClause: any = {
      userCuid: user.id,
    };

    if (startDate && endDate) {
      whereClause.date = {
        gte: startDate as string,
        lte: endDate as string,
      };
    }

    const schedules = await prisma.schedule.findMany({
      where: whereClause,
      select: {
        date: true,
      },
      distinct: ['date'],
    });

    const scheduleDates = schedules.map((schedule) => schedule.date);

    createSuccessResponse(res, 200, undefined, SCHEDULE_SUCCESS.GET_SCHEDULES, {
      data: { scheduleDates },
    });
  } catch (error) {
    console.error('일정 날짜 조회 에러:', error);
    next(error);
  }
};

// 특정 날짜의 일정 리스트 조회
export const getUserSchedulesByDate: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { date } = req.query;

    if (!date) {
      createErrorResponse(
        res,
        400,
        SCHEDULE_ERROR.REQUIRED_FIELDS,
        ERROR_CODES.SCHEDULE_REQUIRED_FIELDS
      );
      return;
    }

    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      createErrorResponse(res, 404, USER_ERROR.USER_NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
      return;
    }

    const schedules = await prisma.schedule.findMany({
      where: {
        userCuid: user.id,
        date: date as string,
      },
      orderBy: {
        order: 'asc',
      },
    });

    createSuccessResponse(res, 200, undefined, SCHEDULE_SUCCESS.GET_SCHEDULES, {
      data: { schedules },
    });
  } catch (error) {
    console.error('일정 상세 조회 에러:', error);
    next(error);
  }
};

export const createSchedule: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, date, startTime, endTime, status = '대기중' } = req.body;
    const authUser = (req as AuthRequest).user;

    if (!authUser) {
      createErrorResponse(res, 401, USER_ERROR.UNAUTHORIZED, ERROR_CODES.USER_UNAUTHORIZED);
      return;
    }

    if (!title) {
      createErrorResponse(
        res,
        400,
        SCHEDULE_ERROR.REQUIRED_FIELDS,
        ERROR_CODES.SCHEDULE_REQUIRED_FIELDS
      );
      return;
    }

    if (startTime && endTime && startTime >= endTime) {
      createErrorResponse(
        res,
        422,
        SCHEDULE_ERROR.INVALID_TIME_RANGE,
        ERROR_CODES.SCHEDULE_INVALID_TIME_RANGE
      );
      return;
    }

    // 일정 날짜의 시작과 끝 계산 (시작 시간 기준 날짜의 00:00:00부터 23:59:59까지)
    const scheduleDateStart = new Date(date);
    scheduleDateStart.setHours(0, 0, 0, 0);

    const scheduleDateEnd = new Date(date);
    scheduleDateEnd.setHours(23, 59, 59, 999);

    const schedulesForDate = await prisma.schedule.findMany({
      where: {
        userCuid: authUser.id,
        AND: [
          {
            startTime: {
              gte: scheduleDateStart,
            },
          },
          {
            startTime: {
              lte: scheduleDateEnd,
            },
          },
        ],
      },
    });

    if (schedulesForDate.length >= DAILY_SCHEDULE_LIMIT) {
      createErrorResponse(
        res,
        429,
        SCHEDULE_ERROR.DAILY_SCHEDULE_LIMIT,
        ERROR_CODES.SCHEDULE_DAILY_SCHEDULE_LIMIT
      );
      return;
    }

    // 사용자의 마지막 일정 순서 확인
    const lastSchedule = await prisma.schedule.findFirst({
      where: { userCuid: authUser.id, date },
      orderBy: [{ order: 'desc' }],
    });

    // 새 일정의 순서 결정 (마지막 일정 + 1 또는 초기값)
    const newOrder = lastSchedule ? (lastSchedule.order || 0) + 1 : 0;

    const newSchedule = await prisma.schedule.create({
      data: {
        title,
        date,
        startTime: startTime ?? null,
        endTime: endTime ?? null,
        status,
        userCuid: authUser.id,
        order: newOrder,
      },
    });

    createSuccessResponse(res, 201, undefined, SCHEDULE_SUCCESS.CREATE_SCHEDULE, {
      data: { schedule: newSchedule },
    });
  } catch (error) {
    console.error('일정 생성 에러:', error);
    next(error);
  }
};

// 일정 수정(order 제외)
export const updateSchedule: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { scheduleId } = req.params;
    const { title, startTime, endTime, status } = req.body;
    const authUser = (req as AuthRequest).user;

    if (!authUser) {
      createErrorResponse(res, 401, AUTH_ERROR.UNAUTHORIZED, ERROR_CODES.AUTH_UNAUTHORIZED);
      return;
    }

    const existingSchedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
    });

    if (!existingSchedule) {
      createErrorResponse(
        res,
        404,
        SCHEDULE_ERROR.SCHEDULE_NOT_FOUND,
        ERROR_CODES.SCHEDULE_NOT_FOUND
      );
      return;
    }

    if (existingSchedule.userCuid !== authUser.id) {
      createErrorResponse(
        res,
        403,
        SCHEDULE_ERROR.PERMISSION_DENIED,
        ERROR_CODES.SCHEDULE_PERMISSION_DENIED
      );
      return;
    }

    const updateData: any = {};

    if (title) updateData.title = title;
    if (status) updateData.status = status;

    if (startTime || endTime) {
      const start = startTime ? new Date(startTime) : existingSchedule.startTime;
      const end = endTime ? new Date(endTime) : existingSchedule.endTime;

      // 시작 시간이 종료 시간보다 이후인지 확인
      if (start && end && start >= end) {
        createErrorResponse(
          res,
          422,
          SCHEDULE_ERROR.INVALID_TIME_RANGE,
          ERROR_CODES.SCHEDULE_INVALID_TIME_RANGE
        );
        return;
      }

      if (startTime) updateData.startTime = start;
      if (endTime) updateData.endTime = end;
    }

    const updatedSchedule = await prisma.schedule.update({
      where: { id: scheduleId },
      data: updateData,
    });

    createSuccessResponse(res, 200, undefined, SCHEDULE_SUCCESS.UPDATE_SCHEDULE, {
      data: { schedule: updatedSchedule },
    });
  } catch (error) {
    console.error('일정 수정 에러:', error);
    next(error);
  }
};

export const deleteSchedule: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { scheduleId } = req.params;
    const authUser = (req as AuthRequest).user;

    if (!authUser) {
      createErrorResponse(res, 401, AUTH_ERROR.UNAUTHORIZED, ERROR_CODES.AUTH_UNAUTHORIZED);
      return;
    }

    const existingSchedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
    });

    if (!existingSchedule) {
      createErrorResponse(
        res,
        404,
        SCHEDULE_ERROR.SCHEDULE_NOT_FOUND,
        ERROR_CODES.SCHEDULE_NOT_FOUND
      );
      return;
    }

    if (existingSchedule.userCuid !== authUser.id) {
      createErrorResponse(
        res,
        403,
        SCHEDULE_ERROR.PERMISSION_DENIED,
        ERROR_CODES.SCHEDULE_PERMISSION_DENIED
      );
      return;
    }

    await prisma.schedule.delete({
      where: { id: scheduleId },
    });

    createSuccessResponse(res, 200, undefined, SCHEDULE_SUCCESS.DELETE_SCHEDULE);
  } catch (error) {
    console.error('일정 삭제 에러:', error);
    next(error);
  }
};

// 일정 순서 일괄 변경
export const updateScheduleOrder: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { date, schedules } = req.body;
    const authUser = (req as AuthRequest).user;

    if (!authUser) {
      createErrorResponse(res, 401, USER_ERROR.UNAUTHORIZED, ERROR_CODES.USER_UNAUTHORIZED);
      return;
    }

    if (!date || !schedules || !Array.isArray(schedules)) {
      createErrorResponse(
        res,
        400,
        SCHEDULE_ERROR.REQUIRED_FIELDS,
        ERROR_CODES.SCHEDULE_REQUIRED_FIELDS
      );
      return;
    }

    // 해당 날짜의 사용자 일정 모두 가져오기
    const existingSchedules = await prisma.schedule.findMany({
      where: {
        userCuid: authUser.id,
        date: date,
      },
    });

    // 존재하는 일정 ID 맵 생성 (ID를 키로, 일정 객체를 값으로)
    const existingScheduleMap = new Map(
      existingSchedules.map((schedule) => [schedule.id, schedule])
    );

    // 요청된 일정 ID 유효성 검사 (모든 ID가 사용자의 일정인지 확인)
    for (const scheduleId of schedules) {
      if (!existingScheduleMap.has(scheduleId)) {
        createErrorResponse(
          res,
          404,
          SCHEDULE_ERROR.SCHEDULE_NOT_FOUND,
          ERROR_CODES.SCHEDULE_NOT_FOUND
        );
        return;
      }
    }

    // 트랜잭션으로 모든 일정 순서 업데이트
    const updateOperations = schedules.map((scheduleId, index) => {
      return prisma.schedule.update({
        where: { id: scheduleId },
        data: { order: index },
      });
    });

    await prisma.$transaction(updateOperations);

    createSuccessResponse(res, 200, undefined, SCHEDULE_SUCCESS.UPDATE_ORDER);
  } catch (error) {
    console.error('일정 순서 일괄 변경 에러:', error);
    next(error);
  }
};
