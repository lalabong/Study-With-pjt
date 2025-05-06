'use client';

import { memo, useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { HiPlus } from 'react-icons/hi';

import Button from '@components/common/Button';

import { useCreateScheduleMutation } from '@hooks/api/useCreateScheduleMutaion';

import { useScheduleStore } from '@stores/scheduleStore';

const AddScheduleForm = memo(() => {
  const [title, setTitle] = useState('');

  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  const createScheduleMutation = useCreateScheduleMutation();

  const { setOpenStatusDropdownId, selectedDate } = useScheduleStore();

  // 모달이 열리거나 닫힐 때 입력 상태 초기화
  useEffect(() => {
    setTitle('');
    setStartTime(null);
    setEndTime(null);
  }, [selectedDate]);

  // 입력 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 시간 변경 핸들러
  const handleTimeChange = (value: Dayjs | null, field: 'startTime' | 'endTime') => {
    if (field === 'startTime') {
      setStartTime(value);
    } else {
      setEndTime(value);
    }
  };

  // 일정 추가 핸들러
  const handleAddSchedule = () => {
    if (!selectedDate || !title.trim()) return;

    // 시작 시간과 종료 시간을 Date 객체로 생성
    let startDateTime: Date;
    let endDateTime: Date;

    // 선택된 날짜를 기준으로 Date 객체 생성
    const selectedDateObj = selectedDate as Date;

    // 시작 시간 처리
    if (startTime) {
      startDateTime = new Date(selectedDateObj);
      startDateTime.setHours(startTime.hour(), startTime.minute(), 0, 0);
    } else {
      // 시작 시간이 없으면 날짜의 00:00:00으로 설정
      startDateTime = new Date(selectedDateObj);
      startDateTime.setHours(0, 0, 0, 0);
    }

    // 종료 시간 처리
    if (endTime) {
      endDateTime = new Date(selectedDateObj);
      endDateTime.setHours(endTime.hour(), endTime.minute(), 0, 0);
    } else {
      // 종료 시간이 없으면 날짜의 23:59:59로 설정
      endDateTime = new Date(selectedDateObj);
      endDateTime.setHours(23, 59, 59, 999);
    }

    // 종료 시간이 시작 시간보다 이전인 경우 조정
    if (endDateTime < startDateTime) {
      endDateTime = new Date(startDateTime);
      endDateTime.setHours(startDateTime.getHours() + 1);
    }

    createScheduleMutation.mutate(
      {
        title,
        startTime: startDateTime,
        endTime: endDateTime,
      },
      {
        onSuccess: () => {
          setTitle('');
          setStartTime(null);
          setEndTime(null);

          setOpenStatusDropdownId(null);
        },
      },
    );
  };

  // 키 입력 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && title.trim()) {
      handleAddSchedule();
    }
  };

  return (
    <section
      className="border border-gray-200 p-6 rounded-md h-fit min-w-[280px] sm:min-w-[300px] lg:col-span-1"
      aria-labelledby="add-schedule-title"
    >
      <h3 id="add-schedule-title" className="font-medium text-lg mb-3 flex items-center">
        <HiPlus className="mr-1 text-blue-500" aria-hidden="true" />새 일정 추가
      </h3>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          일정 이름
        </label>

        <TextField
          id="title"
          variant="outlined"
          name="title"
          value={title}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="일정 이름을 입력하세요"
          aria-required="true"
          autoComplete="off"
          size="small"
          sx={{
            width: '100%',
            '& .MuiInputBase-root': {
              height: '40px',
              maxWidth: '100%',
              fontSize: '0.875rem',
            },
          }}
        />
      </div>

      <div className="flex flex-row mb-4 w-full">
        <div className="w-1/2 pr-1">
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
            시작 시간
          </label>
          <div className="w-full">
            <TimePicker
              {...timePickerBaseProps}
              value={startTime}
              onChange={(time) => handleTimeChange(time, 'startTime')}
              slotProps={{
                textField: {
                  ...textFieldBaseProps,
                  placeholder: '시작 시간',
                  id: 'startTime',
                  inputProps: {
                    ...textFieldBaseProps.inputProps,
                    'aria-label': '시작 시간 선택',
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="w-1/2 pl-1">
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
            종료 시간
          </label>
          <div className="w-full">
            <TimePicker
              {...timePickerBaseProps}
              value={endTime}
              onChange={(time) => handleTimeChange(time, 'endTime')}
              minTime={startTime || undefined}
              slotProps={{
                textField: {
                  ...textFieldBaseProps,
                  placeholder: '종료 시간',
                  id: 'endTime',
                  inputProps: {
                    ...textFieldBaseProps.inputProps,
                    'aria-label': '종료 시간 선택',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <Button
        onClick={handleAddSchedule}
        variant="primary"
        size="md"
        fullWidth
        disabled={!title.trim() || createScheduleMutation.isPending}
        aria-label="일정 추가하기"
        className="mt-2"
      >
        {createScheduleMutation.isPending ? '추가 중...' : '추가'}
      </Button>
    </section>
  );
});

AddScheduleForm.displayName = 'AddScheduleForm';

export default AddScheduleForm;

const textFieldBaseProps = {
  variant: 'outlined' as const,
  fullWidth: true,
  size: 'small' as const,
  sx: {
    width: '100%',
    '& .MuiInputBase-root': {
      maxWidth: '100%',
      fontSize: '0.875rem',
      height: '40px',
    },
  },
  inputProps: {
    'aria-label': '시간 선택',
    sx: {
      fontSize: '0.875rem',
    },
  },
};

const timePickerBaseProps = {
  format: 'HH:mm',
  ampm: false,
  closeOnSelect: true,
  disableOpenPicker: true, // 시계 아이콘 클릭 비활성화
  skipDisabled: true, // 비활성화된 시간 자동 건너뛰기
  orientation: 'portrait' as const,
};
