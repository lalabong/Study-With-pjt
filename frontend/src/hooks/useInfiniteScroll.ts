import { useCallback, useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
  threshold?: number; // 스크롤 임계값 (px)
  reverse?: boolean; // 역방향 스크롤 (채팅의 경우 위로 스크롤)
}

export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 100,
  reverse = false,
}: UseInfiniteScrollOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || isLoadingRef.current || isFetchingNextPage || !hasNextPage) {
      return;
    }

    const container = containerRef.current;
    const { scrollTop, scrollHeight, clientHeight } = container;

    let shouldFetch = false;

    if (reverse) {
      // 채팅의 경우: 위로 스크롤할 때 이전 메시지 로드
      shouldFetch = scrollTop <= threshold;
    } else {
      // 일반적인 경우: 아래로 스크롤할 때 다음 페이지 로드
      shouldFetch = scrollTop + clientHeight >= scrollHeight - threshold;
    }

    if (shouldFetch) {
      isLoadingRef.current = true;
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, threshold, reverse]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetchingNextPage) {
      isLoadingRef.current = false;
    }
  }, [isFetchingNextPage]);

  return { containerRef };
};
