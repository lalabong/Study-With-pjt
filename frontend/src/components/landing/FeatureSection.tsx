import { HiPlus, HiCalendar, HiChat } from 'react-icons/hi';

const FeatureSection = () => {
  return (
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
  );
};

export default FeatureSection;
