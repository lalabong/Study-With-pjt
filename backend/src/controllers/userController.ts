import { Request, Response, NextFunction } from 'express';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { ko } from 'date-fns/locale';

import prisma from '../lib/prisma.js';
import { ControllerFn } from '../types/index.js';
import { createErrorResponse, createSuccessResponse } from '../utils/responseUtils.js';
import { USER_ERROR, ERROR_CODES } from '../constants/errorMessages.js';
import { USER_SUCCESS } from '../constants/successMessages.js';
import { AUTH_ERROR } from '../constants/errorMessages.js';
import { getProfileImgPath } from '../middlewares/fileMiddleware.js';

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
      createErrorResponse(res, 404, USER_ERROR.USER_NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
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
      createErrorResponse(res, 404, USER_ERROR.USER_NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
      return;
    }

    const baseDate = dateParam ? new Date(dateParam as string) : new Date();

    let startDate: Date | null = null;
    let endDate: Date | null = null;

    let whereClause: {
      userCuid: string;
      date?: {
        gte?: Date;
        lte?: Date;
      };
    } = { userCuid: user.id };
    let dailyLogs: Record<string, any> = {};
    let monthlyRanges: { start: Date; end: Date; month: string }[] = [];

    if (period === 'week') {
      // 주간 데이터 처리
      startDate = startOfWeek(baseDate, { locale: ko, weekStartsOn: 1 });
      endDate = endOfWeek(baseDate, { locale: ko, weekStartsOn: 1 });

      whereClause = {
        userCuid: user.id,
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
        userCuid: user.id,
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
        userCuid: user.id,
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
        totalMinutes, // 분 단위 총 시간 추가
      },
      periodInfo,
    };

    if (period === 'week') {
      responseData.weeklyData = weeklyLogsArray.map((log) => {
        const { totalMinutes, ...rest } = log;
        return {
          ...rest,
          totalMinutes, // 분 단위 추가
        };
      });
    } else if (period === 'month') {
      responseData.monthlyData = monthlyDataArray.map((data) => ({
        ...data,
        totalTime: {
          ...data.totalTime,
          totalMinutes: data.totalTime.hours * 60 + data.totalTime.minutes, // 분 단위 추가
        },
      }));
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
      createErrorResponse(res, 404, USER_ERROR.USER_NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
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

const patchUserProfileImg: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;

    const file = (req as any).file;

    // body에서 profileImg 값 확인 (문자열인 경우)
    const { profileImg } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { userId },
      select: { id: true, profileImg: true },
    });

    if (!userExists) {
      createErrorResponse(res, 404, USER_ERROR.USER_NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
      return;
    }

    let finalProfileImgPath: string | null = null;

    // 파일이 있는 경우 파일 경로 사용
    if (file) {
      finalProfileImgPath = getProfileImgPath(file.filename);
    }
    // 문자열로 URL이 전달된 경우 - 객체가 아니고 유효한 문자열인지 확인
    else if (profileImg && typeof profileImg === 'string' && profileImg.trim() !== '') {
      finalProfileImgPath = profileImg;
    }
    // 둘 다 없는 경우 또는 profileImg가 객체인 경우 null로 처리
    else {
      finalProfileImgPath = null;
    }

    const user = await prisma.user.update({
      where: { userId },
      data: { profileImg: finalProfileImgPath },
      select: { id: true, userId: true, profileImg: true },
    });

    createSuccessResponse(res, 200, undefined, USER_SUCCESS.POST_USER_PROFILE_IMG, {
      data: { profileImg: user.profileImg },
    });
  } catch (error) {
    console.error('프로필 이미지 수정 에러:', error);
    next(error);
  }
};

const patchUserNickname: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { nickname } = req.body;

    if (!nickname || nickname.length > 50) {
      createErrorResponse(res, 400, USER_ERROR.INVALID_NICKNAME, ERROR_CODES.USER_INVALID_NICKNAME);
      return;
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        nickname,
        userId: { not: userId }, // 자기 자신 제외
      },
    });

    if (existingUser) {
      createErrorResponse(res, 409, AUTH_ERROR.NICKNAME_EXISTS, ERROR_CODES.AUTH_NICKNAME_EXISTS);
      return;
    }

    const user = await prisma.user.update({
      where: { userId },
      data: { nickname },
    });

    createSuccessResponse(res, 200, undefined, USER_SUCCESS.POST_USER_NICKNAME, {
      data: { nickname: user.nickname },
    });
  } catch (error) {
    console.error('닉네임 수정 에러:', error);
    next(error);
  }
};

const postTimeLog: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { totalTime, roomId } = req.body;

    // 입력 값 검증
    if (!totalTime || totalTime <= 0) {
      createErrorResponse(res, 400, '공부 시간은 0보다 커야 합니다.', 4001);
      return;
    }

    if (!roomId) {
      createErrorResponse(res, 400, '방 정보가 필요합니다.', 4002);
      return;
    }

    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      createErrorResponse(res, 404, USER_ERROR.USER_NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
      return;
    }

    // 방이 존재하는지 확인
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      createErrorResponse(res, 404, '방을 찾을 수 없습니다.', 4003);
      return;
    }

    // 사용자가 해당 방에 참여중인지 확인
    const participation = await prisma.roomParticipation.findUnique({
      where: {
        userCuid_roomCuid: {
          userCuid: user.id,
          roomCuid: roomId,
        },
      },
    });

    if (!participation) {
      createErrorResponse(res, 403, '해당 방에 참여하고 있지 않습니다.', 4004);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 트랜잭션으로 TimeLog 저장 및 totalStudyTime 업데이트
    const result = await prisma.$transaction(async (tx) => {
      // 오늘 날짜의 기존 TimeLog 조회
      const existingTimeLog = await tx.timeLog.findFirst({
        where: {
          userCuid: user.id,
          roomCuid: roomId,
          date: today,
        },
      });

      let timeLog;
      if (existingTimeLog) {
        // 기존 기록에 시간 추가
        timeLog = await tx.timeLog.update({
          where: { id: existingTimeLog.id },
          data: {
            totalTime: existingTimeLog.totalTime + totalTime,
          },
        });
      } else {
        // 새 기록 생성
        timeLog = await tx.timeLog.create({
          data: {
            totalTime,
            date: today,
            userCuid: user.id,
            roomCuid: roomId,
          },
        });
      }

      // 사용자 totalStudyTime 업데이트
      const updatedUser = await tx.user.update({
        where: { userId },
        data: {
          totalStudyTime: user.totalStudyTime + totalTime,
        },
      });

      return { timeLog, updatedUser };
    });

    createSuccessResponse(res, 201, undefined, '공부 시간이 성공적으로 저장되었습니다.', {
      data: {
        savedTime: totalTime,
        totalStudyTime: result.updatedUser.totalStudyTime,
        date: format(today, 'yyyy-MM-dd'),
      },
    });
  } catch (error) {
    console.error('공부 시간 저장 에러:', error);
    next(error);
  }
};

export {
  getUserInfo,
  getUserTimeLogs,
  getUserTotalStudyTime,
  patchUserProfileImg,
  patchUserNickname,
  postTimeLog,
};
