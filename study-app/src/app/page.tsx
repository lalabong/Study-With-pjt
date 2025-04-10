import Image from 'next/image';
import Link from 'next/link';

import ImageSlider from '../landingPage/ImageSlider';

const Home = (): React.ReactNode => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="w-full px-6 py-6 flex justify-between items-center">
        <Image src="/images/swith-logo.png" alt="SWith Logo" width={140} height={100} />
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

      {/* 메인 히어로 섹션 */}
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

      {/* 특징 섹션 */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 break-keep">
            SWITH에서는 이런 것들이 가능해요.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 스터디 그룹 */}
            <div className="p-6 border rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 break-keep">함께 공부하는 스터디룸</h3>
              <p className="text-gray-600 break-keep">
                온라인에서 친구들과 모여 함께 동기부여를 하며 공부해요.
              </p>
            </div>

            {/* 일정 관리 */}
            <div className="p-6 border rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 break-keep">계획부터 기록까지</h3>
              <p className="text-gray-600 break-keep">
                하루의 일정을 직접 계획하고, 진행한 시간을 자동으로 기록해요.
              </p>
            </div>

            {/* 실시간 소통 */}
            <div className="p-6 border rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 break-keep">실시간 소통 가능</h3>
              <p className="text-gray-600 break-keep">
                채팅 기능과 실시간 진행 상황 공유로, 협업에도 유용해요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-100 py-6 px-4">
        <div className="max-w-6xl mx-auto pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} SWith. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
