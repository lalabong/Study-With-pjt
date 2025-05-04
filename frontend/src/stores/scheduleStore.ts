import { create } from 'zustand';

export type ScheduleStatus = '대기중' | '진행중' | '완료' | '취소';

export interface ScheduleItem {
  id: string;
  name: string;
  startTime?: string;
  endTime?: string;
  status: ScheduleStatus;
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
}));
