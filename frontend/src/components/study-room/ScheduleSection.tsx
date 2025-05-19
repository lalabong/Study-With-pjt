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
    <div className="flex flex-col gap-6">
      <ScheduleList
        isAddScheduleMode={isAddScheduleMode}
        onAddScheduleMode={handleAddScheduleMode}
        mainContainerClasses="flex flex-col bg-white rounded-lg shadow-sm max-h-[550px] sm:max-h-[750px]"
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
    </div>
  );
};

export default ScheduleSection;
