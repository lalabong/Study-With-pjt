'use client';

import { useEffect, useState } from 'react';

import { Modal } from '@components/common';
import { AddScheduleForm, ScheduleList } from '@components/mypage';

import { useScheduleStore } from '@stores/scheduleStore';

import { formatDateToKorean } from '@utils/date';

const ScheduleSection = () => {
  const [isAddScheduleMode, setIsAddScheduleMode] = useState(false);

  const { selectedDate, setSelectedDate } = useScheduleStore();

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const handleAddScheduleMode = () => {
    setIsAddScheduleMode(!isAddScheduleMode);
  };

  return (
    <>
      <ScheduleList
        isAddScheduleMode={isAddScheduleMode}
        onAddScheduleMode={handleAddScheduleMode}
        classes="bg-white rounded-lg shadow-sm"
      />
      <div
        className={`
           flex justify-center items-center bg-white rounded-lg shadow-sm overflow-hidden lg:hidden
          `}
      >
        <AddScheduleForm onAddScheduleMode={handleAddScheduleMode} />
      </div>
      {isAddScheduleMode && (
        <Modal
          isOpen={isAddScheduleMode}
          onClose={() => setIsAddScheduleMode(!isAddScheduleMode)}
          title={formatDateToKorean(selectedDate)}
          width=" "
        >
          <AddScheduleForm
            containerClasses="border border-gray-200"
            onAddScheduleMode={handleAddScheduleMode}
          />
        </Modal>
      )}
    </>
  );
};

export default ScheduleSection;
