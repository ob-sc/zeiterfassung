import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './styles/theme';
import App from './components/App';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);
