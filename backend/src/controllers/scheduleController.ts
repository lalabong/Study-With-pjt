import { Request, Response, NextFunction } from 'express';

import prisma from '../lib/prisma.js';
import { ControllerFn, AuthRequest } from '../types/index.js';
import { createErrorResponse, createSuccessResponse } from '../utils/responseUtils.js';
import { AUTH_ERROR, SCHEDULE_ERROR, USER_ERROR, ERROR_CODES } from '../constants/errorMessages.js';
import { SCHEDULE_SUCCESS } from '../constants/successMessages.js';
import {
  DAILY_SCHEDULE_LIMIT,
  SCHEDULE_ORDER_GAP,
  MIN_ORDER_GAP_THRESHOLD,
} from '../constants/schedule.js';
import { formatDateToYYYYMMDD } from '#src/utils/dateUtils';
import { start } from 'repl';

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
      whereClause.startTime = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    }

    const schedules = await prisma.schedule.findMany({
      where: whereClause,
      select: {
        date: true
      },
      distinct: ['date']
    });

    // 일정이 있는 날짜만 YYYY-MM-DD 포맷의 문자열 리스트로 변환
    const hasScheduleDates = schedules.map(schedule => schedule.date);

    createSuccessResponse(res, 200, undefined, SCHEDULE_SUCCESS.GET_SCHEDULES, {
      data: { hasScheduleDates },
    });
  } catch (error) {
    console.error('일정 날짜 조회 에러:', error);
    next(error);
  }
};

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
        date: date as string
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

// export const getUserAllSchedules: ControllerFn = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { userId } = req.params;
//     const { startDate, endDate } = req.query;

//     const user = await prisma.user.findUnique({
//       where: { userId },
//     });

//     if (!user) {
//       createErrorResponse(res, 404, USER_ERROR.USER_NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
//       return;
//     }

//     let whereClause: any = {
//       userCuid: user.id,
//     };

//     if (startDate && endDate) {
//       whereClause.startTime = {
//         gte: new Date(startDate as string), // 시작 시간이 조회 시작 시간보다 크거나 같은 경우
//         lte: new Date(endDate as string), // 종료 시간이 조회 종료 시간보다 작거나 같은 경우
//       };
//     }

//     const schedules = await prisma.schedule.findMany({
//       where: whereClause,
//       orderBy: {
//         order: 'asc',
//       },
//     });

//     // 날짜별로 일정 그룹화
//     const schedulesByDate: Record<string, any[]> = {};
    
//     schedules.forEach(schedule => {
//       if (!schedulesByDate[schedule.date]) {
//         schedulesByDate[schedule.date] = [];
//       }
      
//       schedulesByDate[schedule.date].push(schedule);
//     });

//     createSuccessResponse(res, 200, undefined, SCHEDULE_SUCCESS.GET_SCHEDULES, {
//       data: { schedulesByDate },
//     });
//   } catch (error) {
//     console.error('일정 조회 에러:', error);
//     next(error);
//   }
// };

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
      where: { userCuid: authUser.id },
      orderBy: [{ order: 'desc' }],
    });

    // 새 일정의 순서 결정 (마지막 일정 + 1000 또는 초기값)
    const newOrder = lastSchedule ? (lastSchedule.order || 0) + SCHEDULE_ORDER_GAP : 0;
    
    let newStartTime = startTime ? new Date(startTime) : new Date(date);
    let newEndTime = endTime ? new Date(endTime) : new Date(date);  

    if (!startTime) {
      newStartTime.setHours(0, 0, 0, 0);
    }

    if (!endTime) {
      newEndTime.setHours(23, 59, 59, 999);
    }

    const newSchedule = await prisma.schedule.create({
      data: {
        title,
        date,
        startTime: newStartTime,
        endTime: newEndTime,
        status,
        userCuid: authUser.id,
        order: newOrder,
      },
    });

    // 응답용 객체체
    const responseSchedule: any = {
      id: newSchedule.id,
      title: newSchedule.title,
      date: newSchedule.date,
      status: newSchedule.status,
      userCuid: newSchedule.userCuid,
      order: newSchedule.order,
      createdAt: newSchedule.createdAt
    };

    if (startTime) {
      responseSchedule.startTime = newSchedule.startTime;
    }
    
    if (endTime) {
      responseSchedule.endTime = newSchedule.endTime;
    }

    createSuccessResponse(res, 201, undefined, SCHEDULE_SUCCESS.CREATE_SCHEDULE, {
      data: { schedule: responseSchedule },
    });
  } catch (error) {
    console.error('일정 생성 에러:', error);
    next(error);
  }
};

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
      if (start >= end) {
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

export const updateScheduleOrder: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { scheduleId } = req.params;
    const { targetPosition } = req.body;
    const authUser = (req as AuthRequest).user;

    if (!authUser) {
      createErrorResponse(res, 401, USER_ERROR.UNAUTHORIZED, ERROR_CODES.USER_UNAUTHORIZED);
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

    // 사용자의 모든 일정을 순서대로 가져옴
    const userSchedules = await prisma.schedule.findMany({
      where: { userCuid: authUser.id },
      orderBy: [{ order: 'asc' }],
    });

    // 유효한 targetPosition 범위 확인
    if (targetPosition < 0 || targetPosition >= userSchedules.length) {
      createErrorResponse(
        res,
        422,
        SCHEDULE_ERROR.INVALID_ORDER_POSITION,
        ERROR_CODES.SCHEDULE_INVALID_ORDER_POSITION
      );
      return;
    }

    let prevOrder = 0;
    let nextOrder = 0;

    if (targetPosition === 0) {
      // 맨 앞으로 이동하는 경우
      nextOrder = userSchedules[0]?.order ?? SCHEDULE_ORDER_GAP;
      prevOrder = nextOrder - SCHEDULE_ORDER_GAP;
    } else if (targetPosition === userSchedules.length - 1) {
      // 맨 뒤로 이동하는 경우
      prevOrder = userSchedules[userSchedules.length - 1]?.order ?? 0;
      nextOrder = prevOrder + SCHEDULE_ORDER_GAP;
    } else {
      // 중간으로 이동하는 경우
      prevOrder = userSchedules[targetPosition - 1]?.order ?? 0;
      nextOrder = userSchedules[targetPosition]?.order ?? prevOrder + SCHEDULE_ORDER_GAP;
    }

    // 새 order 값 계산 (중간값)
    const newOrder = Math.floor((prevOrder + nextOrder) / 2);

    // 순서 간격이 너무 좁아졌는지 확인 (재정렬 필요 여부)
    const needsReordering = nextOrder - prevOrder <= MIN_ORDER_GAP_THRESHOLD;

    if (needsReordering) {
      // 모든 일정 재정렬
      await reorderAllSchedules(authUser.id);

      // 재정렬 후 다시 위치 조정
      return updateScheduleOrder(req, res, next);
    }

    const updatedSchedule = await prisma.schedule.update({
      where: { id: scheduleId },
      data: { order: newOrder },
    });

    createSuccessResponse(res, 200, undefined, SCHEDULE_SUCCESS.UPDATE_ORDER, {
      data: { schedule: updatedSchedule },
    });
  } catch (error) {
    console.error('일정 순서 변경 에러:', error);
    next(error);
  }
};

async function reorderAllSchedules(userCuid: string): Promise<void> {
  const schedules = await prisma.schedule.findMany({
    where: { userCuid: userCuid },
    orderBy: [{ order: 'asc' }],
  });

  const updates = schedules.map((schedule, index) =>
    prisma.schedule.update({
      where: { id: schedule.id },
      data: { order: index * SCHEDULE_ORDER_GAP },
    })
  );

  await prisma.$transaction(updates);
}
