'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const ImageSlider = (): React.ReactElement => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const imageCount = 3; // 이미지 갯수를 변수로 지정
  const images: string[] = Array.from(
    { length: imageCount },
    (_, i) => `/images/landing-img${i + 1}.jpg`,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === imageCount - 1 ? 0 : prevIndex + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [imageCount]);

  return (
    <>
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Study With Landing Page ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
    </>
  );
};

export default ImageSlider;
