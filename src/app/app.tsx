// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tailwindStyles from './tailwind.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, type createRouter } from '@tanstack/react-router';
import 'preline/preline';
import { IStaticMethods } from 'preline/preline';
import { CustomToaster } from './CustomToaster';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retryDelay: (attempt) =>
        Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    },
  },
});

type AppProps = { router: ReturnType<typeof createRouter> };

const App = ({ router }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`app relative z-10 h-[100svh]`}>
        <RouterProvider router={router} />
        <CustomToaster />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
