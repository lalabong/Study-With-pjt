import localFont from 'next/font/local';

import type { Metadata } from 'next';

import '@app/globals.css';

import DynamicToast from '@components/common/DynamicToast';

import { QueryProvider } from '@lib/react-query/QueryProvider';
import StoreHydrationProvider from '@lib/react-query/StoreHydrationProvider';

const dotSans = localFont({
  src: '../../public/fonts/42dotSans-Regular.woff2',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: 'SWith | 공부 및 협업을 위한 플랫폼',
  description: '일정을 관리하며 다른 사람들과 함께 효율적으로 공부 및 협업할 수 있는 플랫폼입니다.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .text-shadow-lg{text-shadow:0 10px 15px rgba(0,0,0,.3),0 4px 6px rgba(0,0,0,.1)}
              .break-keep{word-break:keep-all}
              .no-scrollbar::-webkit-scrollbar{display:none}
              .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
            `,
          }}
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/42dotSans-Regular.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="image"
          href="/images/landing-img1.webp"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/landing-img1-mobile.webp"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
        <link rel="dns-prefetch" href="http://localhost:4000" />
      </head>
      <body className={`${dotSans.className} no-scrollbar`}>
        <QueryProvider>
          <StoreHydrationProvider>
            {children}
            <DynamicToast />
          </StoreHydrationProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
