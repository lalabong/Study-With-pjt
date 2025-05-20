import { useEffect } from 'react';

type ClickOutsideHandler = () => void;

interface UseClickOutsideOptions {
  containerSelector?: string;
  exceptSelector?: string;
  elementId?: string | number;
  isOpen?: boolean;
}

/**
 * 특정 영역 외부 클릭을 감지하는 훅
 * @param onClickOutside 외부 클릭 시 실행할 콜백 함수
 * @param options 설정 옵션
 * @param options.containerSelector 컨테이너 요소 선택자 (이 요소 내부 클릭만 감지)
 * @param options.exceptSelector 제외할 요소 선택자
 * @param options.elementId 제외할 요소의 ID
 * @param options.isOpen 드롭다운/모달 등이 열려있는지 여부
 */

export const useClickOutside = (
  onClickOutside: ClickOutsideHandler,
  options: UseClickOutsideOptions = {},
) => {
  const { containerSelector, exceptSelector, elementId, isOpen } = options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 컨테이너가 지정된 경우 컨테이너 내부 클릭인지 확인
      if (containerSelector) {
        const container = document.querySelector(containerSelector);
        // 컨테이너가 없거나 컨테이너 외부 클릭인 경우 무시
        if (!container || !container.contains(event.target as Node)) {
          return;
        }
      }

      // 특정 요소를 제외하고 처리
      if (exceptSelector && elementId) {
        if ((event.target as Element).closest(`${exceptSelector}="${elementId}"`)) {
          return;
        }
      }

      onClickOutside();
    };

    if (isOpen === false) return;

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickOutside, containerSelector, exceptSelector, elementId, isOpen]);
};
