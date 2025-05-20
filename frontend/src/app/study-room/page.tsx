import Header from '@components/common/Header';
import HeaderActionButtons from '@components/common/HeaderActionButtons';
import ChatSection from '@components/study-room/ChatSection';
import ParticipantsSection from '@components/study-room/ParticipantsSection';
import RoomInfoSection from '@components/study-room/RoomInfoSection';
import ScheduleSection from '@components/study-room/ScheduleSection';
import TimerSection from '@components/study-room/TimerSection';

const StudyRoomPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header>
        <HeaderActionButtons />
      </Header>

      <TimerSection />

      <div className="container mx-auto px-4 py-6">
        <RoomInfoSection
          roomTitle="방 제목입니다."
          creationTime="방 생성 시간 9:00 AM"
          isActive={true}
        />

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
