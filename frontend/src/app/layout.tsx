import localFont from 'next/font/local';

import type { Metadata } from 'next';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@app/globals.css';

import { QueryProvider } from '@lib/react-query/QueryProvider';
import StoreHydrationProvider from '@lib/react-query/StoreHydrationProvider';

const dotSans = localFont({
  src: '../../public/fonts/42dotSans-Regular.woff2',
  display: 'block',
});

export const metadata: Metadata = {
  title: 'SWith | 공부 및 협업을 위한 플랫폼',
  description: '일정을 관리하며 다른 사람들과 함께 효율적으로 공부 및 협업할 수 있는 플랫폼입니다.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className={`${dotSans.className} no-scrollbar`}>
        <QueryProvider>
          <StoreHydrationProvider>
            {children}
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          </StoreHydrationProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
