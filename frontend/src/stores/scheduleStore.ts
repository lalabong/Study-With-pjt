import { create } from 'zustand';

import { getMonthRange } from '@utils/date';

import { Schedule } from '@/types/api';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface ScheduleState {
  // isOpenCalendarModal: boolean; // 캘린더 모달 열림 여부
  selectedDate: Value; // 캘린더에서 선택한 날짜
  openStatusDropdownId: string | null; // 드롭다운을 연 일정의 id
  filteredSchedules: Schedule[]; // 캘린더에서 선택한 날짜의 일정 목록
  startDate: string | null; // 일정 조회 시작일(YYYY-MM-DD)
  endDate: string | null; // 일정 조회 종료일(YYYY-MM-DD)

  // openCalendarModal: (date: Date) => void; // 캘린더 모달 열기

  // closeCalendarModal: () => void; // 캘린더 모달 닫기

  setOpenStatusDropdownId: (id: string | null) => void; // 드롭다운을 연 일정의 id 설정

  setSelectedDate: (date: Value) => void; // 캘린더에서 선택한 날짜 설정

  setDateRange: (startDate: string, endDate: string) => void; // 일정 조회 범위 설정

  setFilteredSchedules: (schedules: Schedule[]) => void; // 필터링된 일정 목록 직접 설정
  // 일정 항목을 업데이트하는 함수
  updateScheduleItem: (id: string, updatedSchedule: Partial<Schedule>) => void;

  // 새 일정 추가 함수
  addScheduleItem: (newSchedule: Schedule) => void;

  // 일정 삭제 함수
  removeScheduleItem: (id: string) => void;

  // 여러 일정의 순서를 한 번에 업데이트하는 함수
  updateSchedulesOrder: (schedules: Schedule[]) => void;
}

export const useScheduleStore = create<ScheduleState>((set) => ({
  // isOpenCalendarModal: false,
  selectedDate: null,
  openStatusDropdownId: null,
  filteredSchedules: [],
  startDate: getMonthRange()[0],
  endDate: getMonthRange()[1],

  setSelectedDate: (date: Value) => set({ selectedDate: date }),

  // openCalendarModal: (date: Date) =>
  //   set({
  //     isOpenCalendarModal: true,
  //     selectedDate: date,
  //   }),

  // closeCalendarModal: () =>
  //   set(() => ({
  //     isOpenCalendarModal: false,
  //     selectedDate: null,
  //     filteredSchedules: [],
  //   })),

  setOpenStatusDropdownId: (id) =>
    set(() => ({
      openStatusDropdownId: id,
    })),

  setDateRange: (startDate: string, endDate: string) => set({ startDate, endDate }),

  // 필터링된 일정 목록 직접 설정
  setFilteredSchedules: (schedules) =>
    set(() => ({
      filteredSchedules: schedules,
    })),

  // 일정 항목 업데이트
  updateScheduleItem: (id, updatedSchedule) =>
    set((state) => ({
      filteredSchedules: state.filteredSchedules.map((schedule) =>
        schedule.id === id ? { ...schedule, ...updatedSchedule } : schedule,
      ),
    })),

  // 새 일정 추가
  addScheduleItem: (newSchedule) =>
    set((state) => ({
      filteredSchedules: [...state.filteredSchedules, newSchedule],
    })),

  // 일정 삭제
  removeScheduleItem: (id) =>
    set((state) => ({
      filteredSchedules: state.filteredSchedules.filter((schedule) => schedule.id !== id),
    })),

  // 일정 순서 업데이트
  updateSchedulesOrder: (schedules) =>
    set(() => ({
      filteredSchedules: schedules,
    })),
}));
