import { Request, Response, NextFunction } from 'express';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { ko } from 'date-fns/locale';

import prisma from '../lib/prisma.js';
import { ControllerFn } from '../types/index.js';
import { createErrorResponse, createSuccessResponse } from '../utils/responseUtils.js';
import { USER_ERROR } from '../constants/errorMessages.js';
import { USER_SUCCESS } from '../constants/successMessages.js';

const getUserInfo: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.userId;

    const user = await prisma.user.findUnique({
      where: { userId },
      select: {
        id: true,
        userId: true,
        nickname: true,
        profileImg: true,
        createdAt: true,
      },
    });
    if (!user) {
      createErrorResponse(res, 404, USER_ERROR.USER_NOT_FOUND);
      return;
    }

    const formattedCreatedAt = user.createdAt ? format(user.createdAt, 'yyyy-MM-dd') : null;
    createSuccessResponse(res, 200, undefined, USER_SUCCESS.GET_USER_INFO, {
      data: {
        ...user,
        createdAt: formattedCreatedAt,
      },
    });
  } catch (error) {
    console.error('사용자 정보 조회 에러:', error);
    next(error);
  }
};

const getUserSchedules: ControllerFn = async (
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
      createErrorResponse(res, 404, USER_ERROR.USER_NOT_FOUND);
      return;
    }

    let whereClause: any = {
      userId: user.id,
    };

    if (startDate && endDate) {
      whereClause.startTime = {
        gte: new Date(startDate as string), // 시작 시간이 조회 시작 시간보다 크거나 같은 경우
        lte: new Date(endDate as string), // 종료 시간이 조회 종료 시간보다 작거나 같은 경우
      };
    }

    const schedules = await prisma.schedule.findMany({
      where: whereClause,
      orderBy: {
        startTime: 'asc',
      },
    });

    createSuccessResponse(res, 200, undefined, USER_SUCCESS.GET_SCHEDULES, { data: { schedules } });
  } catch (error) {
    console.error('일정 조회 에러:', error);
    next(error);
  }
};

const getUserTimeLogs: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { period, date: dateParam } = req.query;

    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      createErrorResponse(res, 404, USER_ERROR.USER_NOT_FOUND);
      return;
    }

    const baseDate = dateParam ? new Date(dateParam as string) : new Date();

    let startDate: Date | null = null;
    let endDate: Date | null = null;

    let whereClause: {
      userId: number;
      date?: {
        gte?: Date;
        lte?: Date;
      };
    } = { userId: user.id };
    let dailyLogs: Record<string, any> = {};
    let monthlyRanges: { start: Date; end: Date; month: string }[] = [];

    if (period === 'week') {
      // 주간 데이터 처리
      startDate = startOfWeek(baseDate, { locale: ko, weekStartsOn: 1 });
      endDate = endOfWeek(baseDate, { locale: ko, weekStartsOn: 1 });

      whereClause = {
        userId: user.id,
        date: {
          gte: startDate,
          lte: endDate,
        },
      };

      // 주간 표시를 위한 날짜 미리 생성
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dateKey = format(currentDate, 'yyyy-MM-dd');
        dailyLogs[dateKey] = {
          date: dateKey,
          hours: 0,
          minutes: 0,
          decimalHours: 0,
          totalMinutes: 0, // 내부 계산용
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (period === 'month') {
      // 월별 데이터 처리 (현재 달부터 과거 5개월)
      for (let i = 0; i < 6; i++) {
        const targetDate = new Date(baseDate);
        targetDate.setMonth(baseDate.getMonth() - i);

        const start = startOfMonth(targetDate);
        const end = endOfMonth(targetDate);
        const monthName = format(targetDate, 'yyyy-MM');

        monthlyRanges.push({ start, end, month: monthName });
      }

      // 6개월 범위로 쿼리 설정
      whereClause = {
        userId: user.id,
        date: {
          gte: monthlyRanges[5].start, // 가장 과거 달의 시작일
          lte: monthlyRanges[0].end, // 현재 달의 마지막 일
        },
      };

      startDate = monthlyRanges[5].start;
      endDate = monthlyRanges[0].end;
    } else {
      startDate = baseDate;
      endDate = baseDate;

      whereClause = {
        userId: user.id,
        date: {
          gte: startDate,
          lte: endDate,
        },
      };
    }

    // 공부시간 데이터 조회
    const timeLogs = await prisma.timeLog.findMany({
      where: whereClause,
      orderBy: {
        date: 'desc',
      },
    });

    // 공통(월별, 주별) 총 공부시간 계산
    const totalMinutes = timeLogs.reduce((total, log) => total + log.totalTime, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const decimalHours = parseFloat((totalMinutes / 60).toFixed(1));

    // 주별 데이터 계산 (기간, 주별 공부시간, 일별 공부시간 계산)
    if (period === 'week') {
      timeLogs.forEach((log) => {
        const dateKey = format(log.date, 'yyyy-MM-dd');
        if (dailyLogs[dateKey]) {
          dailyLogs[dateKey].totalMinutes += log.totalTime;
          dailyLogs[dateKey].hours = Math.floor(dailyLogs[dateKey].totalMinutes / 60);
          dailyLogs[dateKey].minutes = dailyLogs[dateKey].totalMinutes % 60;
          dailyLogs[dateKey].decimalHours = parseFloat(
            (dailyLogs[dateKey].totalMinutes / 60).toFixed(1)
          );
        }
      });
    }

    // 월별 데이터 계산 (기간, 월별 공부시간 계산)
    let monthlyData: any[] = [];
    if (period === 'month') {
      monthlyData = monthlyRanges.map((range) => {
        const filteredLogs = timeLogs.filter(
          (log) => log.date >= range.start && log.date <= range.end
        );

        const monthlyMinutes = filteredLogs.reduce((total, log) => total + log.totalTime, 0);

        return {
          month: range.month,
          totalTime: {
            hours: Math.floor(monthlyMinutes / 60),
            minutes: monthlyMinutes % 60,
            decimalHours: parseFloat((monthlyMinutes / 60).toFixed(1)),
          },
        };
      });
    }

    // 시작, 종료 날짜 형식 변환
    const periodInfo = {
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
    };

    const weeklyLogsArray = Object.values(dailyLogs).sort((a, b) => a.date.localeCompare(b.date));
    const monthlyDataArray = Object.values(monthlyData).sort((a, b) =>
      a.month.localeCompare(b.month)
    );

    const responseData: any = {
      totalTime: {
        hours,
        minutes,
        decimalHours,
      },
      periodInfo,
    };

    if (period === 'week' && weeklyLogsArray.length > 0) {
      responseData.weeklyData = weeklyLogsArray.map((log) => {
        const { totalMinutes, ...rest } = log;
        return rest;
      });
    } else if (period === 'month' && monthlyDataArray.length > 0) {
      responseData.monthlyData = monthlyDataArray;
    }

    createSuccessResponse(res, 200, undefined, USER_SUCCESS.GET_TIMELOGS, { data: responseData });
  } catch (error) {
    console.error('시간 기록 조회 에러:', error);
    next(error);
  }
};

const getUserTotalStudyTime: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      createErrorResponse(res, 404, USER_ERROR.USER_NOT_FOUND);
      return;
    }

    const totalStudyTime = user.totalStudyTime;

    createSuccessResponse(res, 200, undefined, USER_SUCCESS.GET_TOTAL_STUDY_TIME, {
      data: { totalStudyTime },
    });
  } catch (error) {
    console.error('총 학습 시간 조회 에러:', error);
    next(error);
  }
};

export { getUserInfo, getUserSchedules, getUserTimeLogs, getUserTotalStudyTime };
