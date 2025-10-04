'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);
  const imageCount = 3;

  const desktopImages: string[] = Array.from(
    { length: imageCount },
    (_, i) => `/images/landing-img${i + 1}.webp`,
  );

  const mobileImages: string[] = Array.from(
    { length: imageCount },
    (_, i) => `/images/landing-img${i + 1}-mobile.webp`,
  );

  useEffect(() => {
    setIsClient(true);

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === imageCount - 1 ? 0 : prevIndex + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [imageCount]);

  // 클라이언트에서만 렌더링 (첫 이미지는 page.tsx에서 이미 표시됨)
  if (!isClient) return null;

  return (
    <>
      {desktopImages.slice(1).map((src, index) => {
        const actualIndex = index + 1;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              actualIndex === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Desktop Image */}
            <Image
              src={desktopImages[actualIndex]}
              alt={`Study With Landing Page ${actualIndex + 1}`}
              fill
              className="object-cover hidden md:block"
              loading="lazy"
              quality={85}
              sizes="(min-width: 768px) 100vw, 0vw"
            />
            {/* Mobile Image */}
            <Image
              src={mobileImages[actualIndex]}
              alt={`Study With Landing Page ${actualIndex + 1}`}
              fill
              className="object-cover block md:hidden"
              loading="lazy"
              quality={75}
              sizes="(max-width: 767px) 100vw, 0vw"
            />
          </div>
        );
      })}
    </>
  );
};

export default ImageSlider;
