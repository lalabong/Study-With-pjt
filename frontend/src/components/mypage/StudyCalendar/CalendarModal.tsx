'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import Modal from '@components/common/Modal';
import AddScheduleForm from '@components/mypage/StudyCalendar/AddScheduleForm';
import ScheduleList from '@components/mypage/StudyCalendar/ScheduleList';

import { useScheduleStore } from '@stores/scheduleStore';

import { formatDateToKorean } from '@utils/date';

dayjs.locale('ko');

const CalendarModal = () => {
  const {
    isOpenCalendarModal,
    selectedDate,
    closeCalendarModal,
    setOpenStatusDropdownId: setOpenStatusDropdown,
    filteredSchedules,
  } = useScheduleStore();

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setOpenStatusDropdown(null);
    closeCalendarModal();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Modal
        isOpen={isOpenCalendarModal}
        onClose={handleCloseModal}
        title={formatDateToKorean(selectedDate)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <ScheduleList schedules={filteredSchedules} />

          <AddScheduleForm />
        </div>
      </Modal>
    </LocalizationProvider>
  );
};

export default CalendarModal;
