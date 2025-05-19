'use client';

import { memo, useCallback, useEffect } from 'react';

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { debounce } from 'lodash';
import { HiCalendar } from 'react-icons/hi';

import Button from '@components/common/Button';
import ScheduleItem from '@components/mypage/StudyCalendar/ScheduleItem';

import { useSchedulesByDateQuery } from '@hooks/api/useSchedulesByDateQuery';
import { useUpdateSchedulesOrderMutation } from '@hooks/api/useUpdateSchedulesOrderMutation';

import { useAuthStore } from '@stores/authStore';
import { useScheduleStore } from '@stores/scheduleStore';

import { formatDateToYYYYMMDD, getCurrentDateString } from '@utils/date';

import { Schedule } from '@/types/api';

// 드래그 앤 드롭으로 순서 변경하는 함수
const reorder = (
  list: Schedule[],
  startIndex: number, // 드래그 시작(기존)
  endIndex: number, // 드래그 끝(목표)
): Schedule[] => {
  const result = Array.from(list); // 얕은 복사
  const [removed] = result.splice(startIndex, 1); // 시작 위치에서 1개 삭제(배열 구조 분해 할당)
  result.splice(endIndex, 0, removed); // 목표 위치에 삭제된 요소 추가

  return result;
};

interface ScheduleListProps {
  isAddScheduleMode?: boolean;
  onAddScheduleMode?: () => void;
  mainContainerClasses?: string;
  draggableContainerClasses?: string;
}

const ScheduleList = memo(
  ({
    isAddScheduleMode,
    onAddScheduleMode,
    mainContainerClasses,
    draggableContainerClasses,
  }: ScheduleListProps) => {
    const { filteredSchedules, setFilteredSchedules, selectedDate } = useScheduleStore();

    const userId = useAuthStore((state) => state.user?.userId);

    const formattedDate =
      selectedDate instanceof Date ? formatDateToYYYYMMDD(selectedDate) : getCurrentDateString();
    // 드래그 기능을 사용할 수 있는지 확인
    const canDrag = filteredSchedules.length > 0;

    const { data: scheduleData, isLoading } = useSchedulesByDateQuery({
      userId: userId || '',
      date: formattedDate,
      enabled: !!userId && !!formattedDate,
    });

    useEffect(() => {
      if (scheduleData?.schedules) {
        setFilteredSchedules(scheduleData.schedules);
      } else {
        setFilteredSchedules([]);
      }
    }, [scheduleData]);

    const updateSchedulesOrderMutation = useUpdateSchedulesOrderMutation();

    // 디바운스된 API 업데이트 호출
    const debouncedUpdateSchedules = useCallback(
      debounce((updatedSchedules: Schedule[]) => {
        if (selectedDate instanceof Date && userId) {
          updateSchedulesOrderMutation.mutate({
            date: formatDateToYYYYMMDD(selectedDate),
            schedules: updatedSchedules,
          });
        }
      }, 300),
      [updateSchedulesOrderMutation, selectedDate, userId],
    );

    // 드래그 종료 시
    const handleDragEnd = (result: DropResult) => {
      try {
        // 드롭 위치가 없으면 종료
        if (!result.destination) return;

        // 위치가 변경되지 않았으면 종료
        if (result.destination.index === result.source.index) return;

        // 순서 재정렬
        const reorderedSchedules = reorder(
          filteredSchedules,
          result.source.index,
          result.destination.index,
        );

        setFilteredSchedules(reorderedSchedules);

        debouncedUpdateSchedules(reorderedSchedules);
      } catch (error) {
        console.error('드래그 종료 처리 중 오류:', error);
      }
    };

    return (
      <section
        className={`${mainContainerClasses} rounded-md p-6 bg-white`}
        aria-labelledby="schedule-list-title"
      >
        <div className="flex justify-between">
          <h2 id="schedule-list-title" className="text-lg font-medium mb-4 flex items-center">
            <HiCalendar className="mr-2 text-blue-500" aria-hidden="true" />
            일정 목록
          </h2>
          {!isAddScheduleMode && (
            <Button
              variant="primary"
              size="sm"
              onClick={onAddScheduleMode}
              className="hidden lg:flex lg:justify-center lg:items-center"
            >
              일정 추가
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-gray-500">일정을 불러오는 중...</div>
        ) : filteredSchedules.length === 0 ? (
          <div className="text-center py-8 text-gray-500" aria-live="polite">
            일정이 없습니다. 새 일정을 추가해 보세요.
          </div>
        ) : (
          <>
            {canDrag ? (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable
                  droppableId="schedule-list-droppable"
                  isDropDisabled={false}
                  isCombineEnabled={false}
                  ignoreContainerClipping={false}
                >
                  {(provided) => (
                    <ul
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`${draggableContainerClasses} flex-1 list-none p-4 m-0 mt-2 overflow-x-hidden overflow-y-auto`}
                      aria-label="일정 목록"
                    >
                      {filteredSchedules.map((schedule, index) => (
                        <Draggable key={schedule.id} draggableId={schedule.id} index={index}>
                          {(provided, snapshot) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? 0.8 : 1,
                              }}
                              className={`${snapshot.isDragging ? 'dragging shadow-md bg-gray-50' : ''}`}
                              data-schedule-id={schedule.id}
                            >
                              <ScheduleItem
                                schedule={schedule}
                                isLast={index === filteredSchedules.length - 1}
                              />
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <ul className="list-none p-0 m-0 max-h-[250px] sm:max-h-[450px] pr-1 overflow-y-auto overflow-x-hidden">
                {filteredSchedules.map((schedule, index) => (
                  <li
                    key={schedule.id}
                    className="cursor-not-allowed"
                    data-schedule-id={schedule.id}
                  >
                    <ScheduleItem
                      schedule={schedule}
                      isLast={index === filteredSchedules.length - 1}
                    />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    );
  },
);

ScheduleList.displayName = 'ScheduleList';

export default ScheduleList;
