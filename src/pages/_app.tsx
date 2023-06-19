import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { QueryClient } from '@tanstack/query-core';
import { Analytics } from '@vercel/analytics/react';
import { QueryClientProvider } from '@tanstack/react-query';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <Analytics />
      <Toaster position="bottom-center" />
    </>
  );
}
