import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from '@/hooks/useAuth';
import { handleError } from '@/utils/message';
import { theme } from '@/styles/theme';
import GlobalStyle from '@/styles/globals';

import '@/styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: handleError,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Register Web</title>
    </Head>

    <ThemeProvider theme={theme}>
      <ToastContainer style={{ zIndex: 9999 }} />
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </>
);

export default App;
