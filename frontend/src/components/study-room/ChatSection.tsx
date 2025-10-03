'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

import Image from 'next/image';

import { TextField } from '@mui/material';
import { HiChatAlt } from 'react-icons/hi';
import { HiPaperAirplane } from 'react-icons/hi';
import { toast } from 'react-toastify';

import { useInfiniteRoomChatMessagesQuery } from '@hooks/api/useInfiniteRoomChatMessagesQuery';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';

import { useAuthStore } from '@stores/authStore';
import { useRoomStore } from '@stores/roomStore';

import { formatDateToHHMM } from '@utils/date';

import { ApiResponse, PaginatedResponse } from '@/types/api';
import { ChatMessageData, ChatMessageReceived, ChatMessageSent } from '@/types/websocket';

const ChatSection = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { currentRoomId } = useRoomStore();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [optimisticMessages, setOptimisticMessages] = useState<Map<string, ChatMessageData>>(
    new Map(),
  );
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 무한스크롤 채팅 메시지 조회 - 인증 상태와 방 ID가 모두 준비된 후에 호출
  const {
    data: infiniteChatData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isChatLoading,
    isError: isChatError,
    error: chatError,
  } = useInfiniteRoomChatMessagesQuery(
    currentRoomId || '',
    { limit: 20 }, // 페이지당 20개씩 로드
    !!currentRoomId && isAuthenticated && !!user,
  );

  // 무한스크롤 Hook
  const { containerRef: infiniteScrollRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    threshold: 100,
    reverse: true, // 채팅은 위로 스크롤할 때 이전 메시지 로드
  });

  // 무한스크롤 메시지 로드
  useEffect(() => {
    if (infiniteChatData?.pages) {
      // 페이지를 역순으로 합쳐서 오래된 메시지부터 최신 메시지 순으로 정렬
      // 페이지 1 = 최신 메시지, 페이지 2 = 이전 메시지, ...
      // 따라서 페이지를 역순으로 합쳐야 오래된 것부터 최신 순으로 됨
      const allMessages = [...infiniteChatData.pages]
        .reverse()
        .flatMap(
          (page) => (page as ApiResponse<PaginatedResponse<ChatMessageData>>).data?.items || [],
        );

      // 중복 제거: id를 기준으로 Map을 사용하여 중복 메시지 제거
      const uniqueMessages = Array.from(new Map(allMessages.map((msg) => [msg.id, msg])).values());

      setMessages(uniqueMessages);
    }
  }, [infiniteChatData, currentRoomId]);

  // 방 변경 시에만 메시지 초기화 (새로고침과 구분)
  const prevRoomIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (currentRoomId && isAuthenticated && user) {
      // 실제로 방이 변경된 경우에만 메시지 초기화
      if (prevRoomIdRef.current && prevRoomIdRef.current !== currentRoomId) {
        setMessages([]);
        setOptimisticMessages(new Map());
      }
      prevRoomIdRef.current = currentRoomId;
    }
  }, [currentRoomId, isAuthenticated, user]);

  // 웹소켓 채팅 메시지 수신 처리
  useEffect(() => {
    const handleChatMessage = (event: CustomEvent<ChatMessageReceived>) => {
      const { data } = event.detail;
      if (data.roomId === currentRoomId) {
        setMessages((prev) => {
          // 중복 메시지 체크
          const exists = prev.some((msg) => msg.id === data.message.id);
          if (exists) return prev;

          return [...prev, data.message];
        });

        // Optimistic 메시지 제거
        setOptimisticMessages((prev) => {
          const next = new Map(prev);
          next.forEach((msg, key) => {
            if (
              msg.user.id === data.message.user.id &&
              Math.abs(
                new Date(msg.createdAt).getTime() - new Date(data.message.createdAt).getTime(),
              ) < 5000
            ) {
              next.delete(key);
            }
          });
          return next;
        });
      }
    };

    // 웹소켓 채팅 메시지 이벤트 리스너 등록
    window.addEventListener('chat-message-received', handleChatMessage as EventListener);

    return () => {
      window.removeEventListener('chat-message-received', handleChatMessage as EventListener);
    };
  }, [currentRoomId]);

  // 스크롤 위치 확인 함수
  const checkScrollPosition = useCallback(() => {
    if (!chatContainerRef.current) return;
    const container = chatContainerRef.current;
    const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 100;

    setShowScrollButton(!isAtBottom);
    if (isAtBottom) {
      setUnreadCount(0);
    }
  }, []);

  // 스크롤 이벤트 리스너
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', checkScrollPosition);
    return () => container.removeEventListener('scroll', checkScrollPosition);
  }, [checkScrollPosition]);

  // 스크롤 위치 관리
  const prevMessagesLengthRef = useRef(0);
  const prevScrollHeightRef = useRef(0);

  useEffect(() => {
    if (!chatContainerRef.current) return;

    const container = chatContainerRef.current;
    const currentMessagesLength = messages.length + optimisticMessages.size;
    const prevMessagesLength = prevMessagesLengthRef.current;

    if (prevMessagesLength === 0) {
      // 초기 로드 시 맨 아래로 스크롤
      container.scrollTop = container.scrollHeight;
      setUnreadCount(0);
      setShowScrollButton(false);
    } else if (currentMessagesLength > prevMessagesLength) {
      const newMessagesCount = currentMessagesLength - prevMessagesLength;
      const isAtBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight - 100;

      if (isAtBottom) {
        // 맨 아래에 있으면 자동 스크롤
        container.scrollTop = container.scrollHeight;
        setUnreadCount(0);
        setShowScrollButton(false);
      } else if (newMessagesCount === 1) {
        // 맨 아래에 없고 새 메시지가 1개 추가된 경우 (실시간 메시지)
        // 스크롤하지 않고 읽지 않은 메시지 수 증가
        setUnreadCount((prev) => prev + 1);
        setShowScrollButton(true);
      } else {
        // 이전 메시지 로드 시 스크롤 위치 유지
        const scrollDiff = container.scrollHeight - prevScrollHeightRef.current;
        container.scrollTop += scrollDiff;
      }
    }

    prevMessagesLengthRef.current = currentMessagesLength;
    prevScrollHeightRef.current = container.scrollHeight;
  }, [messages, optimisticMessages]);

  // 웹소켓 메시지 전송
  const sendWebSocketMessage = useCallback(
    (content: string, tempId: string) => {
      const wsMessage: ChatMessageSent = {
        type: 'CHAT_MESSAGE_SENT',
        data: {
          roomId: currentRoomId || '',
          content,
          userCuid: user?.id || '',
          tempId,
        },
        timestamp: Date.now(),
      };

      // 웹소켓 메시지 전송 이벤트 발생
      window.dispatchEvent(new CustomEvent('send-websocket-message', { detail: wsMessage }));
    },
    [currentRoomId, user?.id],
  );

  // 맨 아래로 스크롤하는 함수
  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      setUnreadCount(0);
      setShowScrollButton(false);
    }
  }, []);

  if (!user || !currentRoomId) return null;

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const tempId = `temp-${Date.now()}`;
    const messageContent = message.trim();

    // Optimistic Update: 즉시 UI에 메시지 표시
    const optimisticMessage: ChatMessageData = {
      id: tempId,
      content: messageContent,
      messageType: 'message',
      createdAt: new Date().toISOString(),
      user: {
        id: user.id,
        userId: user.userId,
        nickname: user.nickname,
        profileImg: user.profileImg || undefined,
      },
    };

    setOptimisticMessages((prev) => new Map(prev).set(tempId, optimisticMessage));
    setMessage('');

    try {
      // 웹소켓으로만 전송 (실시간 + 영속성)
      sendWebSocketMessage(messageContent, tempId);
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      toast.error('메시지 전송에 실패했습니다.');

      // 실패시 Optimistic 메시지 제거
      setOptimisticMessages((prev) => {
        const next = new Map(prev);
        next.delete(tempId);
        return next;
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-[750px] relative">
      <h2 className="text-xl font-medium mb-10 flex items-center">
        <HiChatAlt className="mr-2 text-blue-500" aria-hidden="true" />
        채팅
      </h2>

      <div
        ref={(el) => {
          chatContainerRef.current = el;
          infiniteScrollRef.current = el;
        }}
        className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2"
        aria-label="채팅 메시지"
      >
        {/* 이전 메시지 로딩 인디케이터 */}
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-sm text-gray-500">이전 메시지를 불러오는 중...</span>
          </div>
        )}

        {/* 실제 메시지 렌더링 */}
        {messages.map((msg) => {
          const isCurrentUser = msg.user.id === user.id;
          const isSystemMessage = msg.messageType === 'system';

          if (isSystemMessage) {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                  {msg.content}
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
              {!isCurrentUser && (
                <div className="flex-shrink-0 mr-3">
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    <Image
                      src={msg.user.profileImg || '/images/default-user-image.png'}
                      alt={`${msg.user.nickname}의 프로필 이미지`}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className={`max-w-[75%]`}>
                {!isCurrentUser && (
                  <div className="text-xs text-gray-500 mb-1">{msg.user.nickname}</div>
                )}
                <div className="flex items-end">
                  {isCurrentUser && (
                    <span className="text-xs text-gray-500 pr-1 whitespace-nowrap inline-flex">
                      {formatDateToHHMM(new Date(msg.createdAt))}
                    </span>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2 break-words break-all overflow-x-auto ${
                      isCurrentUser
                        ? 'bg-blue-500 text-white rounded-tr-none'
                        : 'bg-gray-200 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {!isCurrentUser && (
                    <span className="text-xs text-gray-500 ml-2 whitespace-nowrap inline-flex">
                      {formatDateToHHMM(new Date(msg.createdAt))}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Optimistic 메시지 렌더링 */}
        {Array.from(optimisticMessages.values()).map((msg) => {
          const isCurrentUser = msg.user.id === user.id;

          return (
            <div
              key={msg.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} opacity-75`}
            >
              {!isCurrentUser && (
                <div className="flex-shrink-0 mr-3">
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    <Image
                      src={msg.user.profileImg || '/images/default-user-image.png'}
                      alt={`${msg.user.nickname}의 프로필 이미지`}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className={`max-w-[75%]`}>
                {!isCurrentUser && (
                  <div className="text-xs text-gray-500 mb-1">{msg.user.nickname}</div>
                )}
                <div className="flex items-end">
                  {isCurrentUser && (
                    <span className="text-xs text-gray-500 pr-1 whitespace-nowrap inline-flex">
                      {formatDateToHHMM(new Date(msg.createdAt))}
                    </span>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2 break-words break-all overflow-x-auto ${
                      isCurrentUser
                        ? 'bg-blue-400 text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-700 rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {!isCurrentUser && (
                    <span className="text-xs text-gray-500 ml-2 whitespace-nowrap inline-flex">
                      {formatDateToHHMM(new Date(msg.createdAt))}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto flex items-center">
        <TextField
          id="text"
          variant="outlined"
          name="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
          aria-label="메시지 입력"
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
        <button
          onClick={handleSendMessage}
          disabled={!message.trim()}
          className={`ml-1 rounded-md p-3 ${
            message.trim() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
          }`}
          aria-label="메시지 전송"
        >
          <HiPaperAirplane className="h-5 w-5" />
        </button>
      </div>

      {/* Floating 스크롤 버튼 */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-20 right-8 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition-all duration-200 flex items-center gap-2"
          aria-label="최신 메시지로 이동"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default ChatSection;
