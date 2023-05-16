import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import CategoryProvider from '@/providers/category.provider';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CategoryProvider>
          <Component {...pageProps} />
        </CategoryProvider>
      </QueryClientProvider>
      <Analytics />
    </>
  );
}
