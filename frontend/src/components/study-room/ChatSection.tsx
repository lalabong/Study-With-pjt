'use client';

import { useState } from 'react';

import Image from 'next/image';

import { TextField } from '@mui/material';
import { HiChatAlt } from 'react-icons/hi';
import { HiPaperAirplane } from 'react-icons/hi';

import { useAuthStore } from '@stores/authStore';

import { formatDateToHHMM } from '@utils/date';

interface ChatMessage {
  id: string;
  sender: {
    id: string;
    nickname: string;
    profileImg?: string | null;
  };
  message: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

const ChatSection = () => {
  const { user } = useAuthStore();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'user2의 uuid',
      sender: {
        id: 'user2',
        nickname: 'Sarah Chen',
      },
      message: 'Hi everyone! Ready to start our study session?Hi everyone!',
      timestamp: new Date(),
      isCurrentUser: false,
    },
  ]);

  // const chatContainerRef = useRef<HTMLDivElement>(null);

  // // 새 메시지 도착시 스크롤 맨 아래로 이동
  // useEffect(() => {
  //   if (chatContainerRef.current) {
  //     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  //   }
  // }, [messages]);

  if (!user) return null;

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(), // 임시 채팅 메세지 uuid
      sender: {
        id: user.id,
        nickname: user.nickname,
        profileImg: user.profileImg,
      },
      message: message.trim(),
      timestamp: new Date(),
      isCurrentUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-[750px]">
      <h2 className="text-xl font-medium mb-10 flex items-center">
        <HiChatAlt className="mr-2 text-blue-500" aria-hidden="true" />
        채팅
      </h2>

      <div
        // ref={chatContainerRef}
        className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2"
        aria-label="채팅 메시지"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            {!msg.isCurrentUser && (
              <div className="flex-shrink-0 mr-3">
                <div className="h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src={msg.sender.profileImg || '/images/default-user-image.png'}
                    alt={`${msg.sender.nickname}의 프로필 이미지`}
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className={`max-w-[75%]`}>
              {!msg.isCurrentUser && (
                <div className="text-xs text-gray-500 mb-1">{msg.sender.nickname}</div>
              )}
              <div className="flex items-end">
                {msg.isCurrentUser && (
                  <span className="text-xs text-gray-500 pr-1 whitespace-nowrap inline-flex">
                    {formatDateToHHMM(msg.timestamp)}
                  </span>
                )}
                <div
                  className={`rounded-2xl px-4 py-2 break-words break-all overflow-x-auto ${
                    msg.isCurrentUser
                      ? 'bg-blue-500 text-white rounded-tr-none'
                      : 'bg-gray-200 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {msg.message}
                </div>
                {!msg.isCurrentUser && (
                  <span className="text-xs text-gray-500 ml-2 whitespace-nowrap inline-flex">
                    {formatDateToHHMM(msg.timestamp)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
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
    </div>
  );
};

export default ChatSection;
