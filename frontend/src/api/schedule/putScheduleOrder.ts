import { axiosInstance } from '@api/axiosInstance';

import { SCHEDULE_ENDPOINTS } from '@constants/api';

import { Schedule } from '@/types/api';

interface PutScheduleOrdersProps {
  date: string;
  schedules: Schedule[];
}

const putScheduleOrders = async ({ date, schedules }: PutScheduleOrdersProps): Promise<null> => {
  const response = await axiosInstance.put(SCHEDULE_ENDPOINTS.UPDATE_SCHEDULE_ORDER, {
    date,
    schedules: schedules.map((schedule) => schedule.id),
  });
  return response.data;
};

export default putScheduleOrders;
