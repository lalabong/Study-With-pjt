// Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환
export const formatDateToString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

//현재 날짜를 'YYYY-MM-DD' 형식의 문자열로 반환
export const getCurrentDateString = (): string => {
  return formatDateToString(new Date());
};

// 주어진 날짜에서 지정된 일수만큼 이동한 날짜를 'YYYY-MM-DD' 형식으로 반환
export const addDays = (date: Date | string, days: number): string => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return formatDateToString(newDate);
};

// 주어진 날짜에서 지정된 월수만큼 이동한 날짜를 'YYYY-MM-DD' 형식으로 반환
export const addMonths = (date: Date | string, months: number): string => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return formatDateToString(newDate);
};

// 주어진 날짜가 미래인지 확인
export const isFutureDate = (date: Date | string): boolean => {
  const compareDate = new Date(date);
  const today = new Date();
  return compareDate > today;
};
