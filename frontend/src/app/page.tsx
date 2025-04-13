import Image from 'next/image';
import Link from 'next/link';
import { HiPlus, HiCalendar, HiChat } from 'react-icons/hi';

import ImageSlider from '@components/landing/ImageSlider';

const Home = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white">
      <header className="w-full px-6 py-6 flex justify-between items-center">
        <Image src="/images/swith-logo.png" alt="SWith Logo" width={140} height={39} />
        <div className="flex space-x-4">
          <Link href="/login" className="px-4 py-3 text-gray-600 hover:text-gray-900">
            로그인
          </Link>
          <Link href="/signup">
            <div className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 transition-colors duration-300">
              회원가입
            </div>
          </Link>
        </div>
      </header>

      <section className="relative w-full h-[600px] overflow-hidden">
        <ImageSlider />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-shadow-lg break-keep">
            공부부터 취미까지, 함께 몰입하는 온라인 모임 공간
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl text-shadow-lg break-keep">
            SWITH에서 하루를 설계하고, 사람들과 함께 목표를 향해 나아가보세요.
          </p>
          <Link
            href="/signup"
            className="px-8 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            지금 시작하기
          </Link>
        </div>
      </section>

      <section id="features" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 break-keep">
            SWITH에서는 이런 것들이 가능해요.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <HiPlus className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 break-keep">함께 공부하는 스터디룸</h3>
              <p className="text-gray-600 break-keep">
                온라인에서 친구들과 모여 함께 동기부여를 하며 공부해요.
              </p>
            </div>

            <div className="p-6 border rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <HiCalendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 break-keep">계획부터 기록까지</h3>
              <p className="text-gray-600 break-keep">
                하루의 일정을 직접 계획하고, 진행한 시간을 자동으로 기록해요.
              </p>
            </div>

            <div className="p-6 border rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <HiChat className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 break-keep">실시간 소통 가능</h3>
              <p className="text-gray-600 break-keep">
                채팅 기능과 실시간 진행 상황 공유로, 협업에도 유용해요.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-100 py-6 px-4">
        <div className="max-w-6xl mx-auto pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} SWith. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
