'use client';

import { useEffect, use } from 'react';

import { useRouter } from 'next/navigation';

import { AxiosError } from 'axios';

import { LoadingSpinner } from '@components/common';
import Header from '@components/common/Header';
import HeaderActionButtons from '@components/common/HeaderActionButtons';
import ChatSection from '@components/study-room/ChatSection';
import ParticipantsSection from '@components/study-room/ParticipantsSection';
import RoomInfoSection from '@components/study-room/RoomInfoSection';
import ScheduleSection from '@components/study-room/ScheduleSection';
import TimerSection from '@components/study-room/TimerSection';

import { useRoomInfoQuery } from '@hooks/api/useRoomInfoQuery';

import { useAuthStore } from '@stores/authStore';
import { useRoomStore } from '@stores/roomStore';

interface StudyRoomPageProps {
  params: Promise<{
    roomId: string;
  }>;
}

const StudyRoomPage = ({ params }: StudyRoomPageProps) => {
  const { roomId } = use(params);
  const router = useRouter();

  const { isAuthenticated, user } = useAuthStore();
  const {
    setCurrentRoomId,
    setCurrentRoomName,
    setCurrentRoomCreatedAt,
    currentRoomName,
    currentRoomCreatedAt,
  } = useRoomStore();

  const {
    data: roomInfoData,
    isLoading: isRoomInfoLoading,
    error,
  } = useRoomInfoQuery({
    roomId,
    enabled: !!roomId && isAuthenticated && !!user,
  });

  // 접근 권한이 없는 경우 리디렉션
  useEffect(() => {
    if (!roomId || !error) return;

    const axiosError = error as AxiosError<{ errorCode?: number }>;

    if (axiosError?.response?.status === 403 || axiosError?.response?.status === 404) {
      router.replace('/study-room/unauthorized');
      return;
    }
  }, [error, router, roomId]);

  useEffect(() => {
    setCurrentRoomId(roomId);

    if (roomInfoData?.room) {
      setCurrentRoomName(roomInfoData.room.name);
      setCurrentRoomCreatedAt(roomInfoData.room.createdAt);
    }

    return () => {};
  }, [roomId, setCurrentRoomId, setCurrentRoomName, setCurrentRoomCreatedAt, roomInfoData]);

  if (!roomId || !isAuthenticated || !user) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </main>
    );
  }

  if (error) {
    const axiosError = error as AxiosError<{ errorCode?: number }>;
    if (axiosError?.response?.status === 403 || axiosError?.response?.status === 404) {
      return null;
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header>
        <HeaderActionButtons />
      </Header>

      <TimerSection />

      <div className="container mx-auto px-4 py-6">
        {isRoomInfoLoading ? (
          <div className="flex justify-center items-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <RoomInfoSection
            roomTitle={currentRoomName || '방 정보 없음'}
            creationTime={
              currentRoomCreatedAt ? new Date(currentRoomCreatedAt).toLocaleString() : ''
            }
            isActive={true}
          />
        )}

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ScheduleSection />
          <ParticipantsSection />
          <ChatSection />
        </section>
      </div>
    </main>
  );
};

export default StudyRoomPage;
