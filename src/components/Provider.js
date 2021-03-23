import { QueryClient, QueryClientProvider } from 'react-query';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from '../styles/theme';
import { ToastContextProvider } from '../context/ToastContext';

function Provider({ children }) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ToastContextProvider>{children}</ToastContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default Provider;
