'use client';

import { useState, useEffect } from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';

import Modal from '@components/common/Modal';
import AddScheduleForm from '@components/mypage/StudyCalendar/AddScheduleForm';
import ScheduleList from '@components/mypage/StudyCalendar/ScheduleList';

import { useScheduleStore } from '@stores/scheduleStore';

import { formatDate } from '@utils/date';

dayjs.locale('ko');

const CalendarModal = () => {
  const {
    isOpenCalendarModal: isOpen,
    selectedDate,
    closeCalendarModal,
    setOpenStatusDropdownId: setOpenStatusDropdown,
    filteredSchedules,
  } = useScheduleStore();

  const [inputScheduleName, setInputScheduleName] = useState('');

  const [newSchedule, setNewSchedule] = useState({
    startTime: null as Dayjs | null,
    endTime: null as Dayjs | null,
  });

  // 모달이 열리거나 닫힐 때 입력 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setInputScheduleName('');
      setNewSchedule({
        startTime: null,
        endTime: null,
      });
    }
  }, [isOpen]);

  // 입력 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputScheduleName(e.target.value);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setOpenStatusDropdown(null);
    closeCalendarModal();
  };

  // 일정 추가 핸들러
  const handleAddSchedule = () => {
    // addSchedule(newSchedule);
    setInputScheduleName('');
    setNewSchedule({ startTime: null, endTime: null });
  };

  // 키 입력 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputScheduleName.trim()) {
      handleAddSchedule();
    }
  };

  // 시간 변경 핸들러
  const handleTimeChange = (value: Dayjs | null, field: 'startTime' | 'endTime') => {
    setNewSchedule((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Modal isOpen={isOpen} onClose={handleCloseModal} title={formatDate(selectedDate)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <ScheduleList schedules={filteredSchedules} />

          <AddScheduleForm
            inputValue={inputScheduleName}
            onInputChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onAddSchedule={handleAddSchedule}
            startTime={newSchedule.startTime}
            endTime={newSchedule.endTime}
            onTimeChange={handleTimeChange}
          />
        </div>
      </Modal>
    </LocalizationProvider>
  );
};

export default CalendarModal;
