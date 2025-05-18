// Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환
export const formatDateToYYYYMMDD = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// ISO 날짜 문자열을 '오전/오후 HH:MM' 형식으로 변환
export const formatTimeToKorean = (isoDateString?: string): string => {
  if (!isoDateString) return '';

  const date = new Date(isoDateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // 오전/오후 구분
  const ampm = hours < 12 ? '오전' : '오후';

  // 12시간제로 변환
  const formattedHours = hours % 12 || 12;

  // 분 두 자리로 패딩
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${ampm} ${formattedHours}:${formattedMinutes}`;
};

// Date 객체를 'YYYY년 MM월 DD일' 형식의 문자열로 변환
export const formatDateToKorean = (date: Date | null | [Date | null, Date | null]): string => {
  if (!date) return '';

  if (Array.isArray(date)) {
    // 배열인 경우 첫 번째 요소 사용 (범위 선택 시)
    return formatDateToKorean(date[0]);
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

//현재 날짜를 'YYYY-MM-DD' 형식의 문자열로 반환
export const getCurrentDateString = (): string => {
  return formatDateToYYYYMMDD(new Date());
};

// 주어진 날짜에서 지정된 일수만큼 이동한 날짜를 'YYYY-MM-DD' 형식으로 반환
export const addDays = (date: Date | string, days: number): string => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return formatDateToYYYYMMDD(newDate);
};

// 주어진 날짜에서 지정된 월수만큼 이동한 날짜를 'YYYY-MM-DD' 형식으로 반환
export const addMonths = (date: Date | string, months: number): string => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return formatDateToYYYYMMDD(newDate);
};

// 주어진 날짜가 미래인지 확인
export const isFutureDate = (date: Date | string): boolean => {
  const compareDate = new Date(date);
  const today = new Date();
  return compareDate > today;
};

// 연도 범위 생성 (현재 연도 기준 -2년 ~ +2년)
export const getYearRange = (currentYear: number, range: number = 2): number[] => {
  return Array.from({ length: range * 2 + 1 }, (_, i) => currentYear - range + i);
};

// 현재 날짜를 기준으로 월 범위 생성 (현재 월 기준 -1달 ~ +1달)
export const getMonthRange = (): [string, string] => {
  const now = new Date();
  const startDate = formatDateToYYYYMMDD(new Date(now.getFullYear(), now.getMonth() - 1, 1));
  const endDate = formatDateToYYYYMMDD(new Date(now.getFullYear(), now.getMonth() + 2, 0));
  return [startDate, endDate];
};

// 숫자를 2자리 문자열로 변환
export const formatToTwoDigits = (value: number) => {
  return value.toString().padStart(2, '0');
};

// Date 객체를 HH:MM 형태의 문자열로 변경
export const formatDateToHHMM = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
