// 날짜를 'YYYY-MM-DD' 형식의 문자열로 변환하는 유틸리티 함수
export function formatDateToYYYYMMDD(date: Date): string {
    return date.toISOString().split('T')[0];
  }