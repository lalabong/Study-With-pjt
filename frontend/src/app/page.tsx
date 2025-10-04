import dynamic from 'next/dynamic';
import Image from 'next/image';

import { Button, Header } from '@components/common';
import HeaderActionButtons from '@components/common/HeaderActionButtons';

const ImageSlider = dynamic(() => import('@components/landing/ImageSlider'));

const FeatureSection = dynamic(() => import('@components/landing/FeatureSection'));

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header>
        <HeaderActionButtons isHome={true} />
      </Header>

      <section className="relative w-full h-[600px] overflow-hidden">
        {/* 첫 번째 이미지를 즉시 표시 */}
        <Image
          src="/images/landing-img1.webp"
          alt="Study With Landing Page"
          fill
          className="object-cover hidden md:block"
          priority
          quality={85}
          sizes="(min-width: 768px) 100vw, 0vw"
        />
        <Image
          src="/images/landing-img1-mobile.webp"
          alt="Study With Landing Page"
          fill
          className="object-cover block md:hidden"
          priority
          quality={75}
          sizes="(max-width: 767px) 100vw, 0vw"
        />
        {/* 슬라이더는 hydration 후 작동 */}
        <ImageSlider />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-shadow-lg break-keep">
            공부부터 협업까지, 함께 몰입하는 온라인 모임 공간
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl text-shadow-lg break-keep">
            SWITH에서 하루를 설계하고, 사람들과 함께 목표를 향해 나아가보세요.
          </p>
          <Button href="/signup" variant="primary" size="md">
            지금 시작하기
          </Button>
        </div>
      </section>

      <FeatureSection />

      <footer className="bg-gray-100 py-6 px-4">
        <div className="max-w-6xl mx-auto pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>&copy; SWith. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
