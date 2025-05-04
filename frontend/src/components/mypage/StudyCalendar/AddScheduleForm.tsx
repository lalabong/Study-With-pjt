'use client';

import { memo } from 'react';

import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { HiPlus } from 'react-icons/hi';

import Button from '@components/common/Button';

interface AddScheduleFormProps {
  inputValue: string;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAddSchedule: () => void;
  onTimeChange: (value: Dayjs | null, field: 'startTime' | 'endTime') => void;
}

const AddScheduleForm = memo(
  ({
    inputValue,
    startTime,
    endTime,
    onInputChange,
    onKeyDown,
    onAddSchedule,
    onTimeChange,
  }: AddScheduleFormProps) => {
    return (
      <section
        className="border border-gray-200 p-6 rounded-md h-fit min-w-[280px] sm:min-w-[300px] lg:col-span-1"
        aria-labelledby="add-schedule-title"
      >
        <h3 id="add-schedule-title" className="font-medium text-lg mb-3 flex items-center">
          <HiPlus className="mr-1 text-blue-500" aria-hidden="true" />새 일정 추가
        </h3>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            일정 이름
          </label>

          <TextField
            id="name"
            variant="outlined"
            name="name"
            value={inputValue}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
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
                onChange={(time) => onTimeChange(time, 'startTime')}
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
                onChange={(time) => onTimeChange(time, 'endTime')}
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
          onClick={onAddSchedule}
          variant="primary"
          size="md"
          fullWidth
          disabled={!inputValue.trim()}
          aria-label="일정 추가하기"
          className="mt-2"
        >
          추가
        </Button>
      </section>
    );
  },
);

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
