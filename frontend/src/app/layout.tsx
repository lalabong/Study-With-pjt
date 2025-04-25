import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

import StoreHydrationProvider from '@/components/providers/StoreHydrationProvider';
import { QueryProvider } from '@/lib/react-query/QueryProvider';

const dotSans = localFont({
  src: '../../public/fonts/42dotSans-Regular.woff2',
  display: 'block',
});

export const metadata: Metadata = {
  title: 'Study-With',
  description: 'study-with project',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={dotSans.className}>
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
