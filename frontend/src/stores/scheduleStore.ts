import { create } from 'zustand';

export type ScheduleStatus = '대기중' | '진행중' | '완료' | '취소';

export interface ScheduleItem {
  id: string;
  name: string;
  startTime?: string;
  endTime?: string;
  status: ScheduleStatus;
  order: number;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface ScheduleState {
  isOpenCalendarModal: boolean; // 캘린더 모달 열림 여부
  selectedDate: Value; // 캘린더에서 선택한 날짜
  openStatusDropdownId: string | null; // 드롭다운을 연 일정의 id
  filteredSchedules: ScheduleItem[]; // 캘린더에서 선택한 날짜의 일정 목록

  openCalendarModal: (date: Date, schedules: ScheduleItem[]) => void; // 캘린더 모달 열기

  closeCalendarModal: () => void; // 캘린더 모달 닫기

  setOpenStatusDropdownId: (id: string | null) => void; // 드롭다운을 연 일정의 id 설정

  setSelectedDate: (date: Value) => void; // 캘린더에서 선택한 날짜 설정

  // 필터링된 일정 목록 직접 설정
  setFilteredSchedules: (schedules: ScheduleItem[]) => void;

  // 일정 항목을 업데이트하는 함수
  updateScheduleItem: (id: string, updatedSchedule: Partial<ScheduleItem>) => void;

  // 새 일정 추가 함수
  addScheduleItem: (newSchedule: ScheduleItem) => void;

  // 일정 삭제 함수
  removeScheduleItem: (id: string) => void;
}

export const useScheduleStore = create<ScheduleState>((set) => ({
  isOpenCalendarModal: false,
  selectedDate: null,
  openStatusDropdownId: null,
  filteredSchedules: [],

  setSelectedDate: (date: Value) => set({ selectedDate: date }),

  openCalendarModal: (date: Date, schedules: ScheduleItem[]) =>
    set({
      isOpenCalendarModal: true,
      selectedDate: date,
      filteredSchedules: schedules,
    }),

  closeCalendarModal: () =>
    set(() => ({
      isOpenCalendarModal: false,
      selectedDate: null,
      filteredSchedules: [],
    })),

  setOpenStatusDropdownId: (id) =>
    set(() => ({
      openStatusDropdownId: id,
    })),

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
}));
