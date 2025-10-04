'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push('/');
  };
  return (
    <header className="w-full px-6 py-6 flex justify-between items-center">
      <Image
        src={'/images/swith-logo.webp'}
        alt={'SWith Logo'}
        width={140}
        height={39}
        onClick={handleLogoClick}
        className="cursor-pointer"
        aria-label="Swith Logo"
        priority
      />
      <div className="flex space-x-4">{children}</div>
    </header>
  );
};

export default Header;
