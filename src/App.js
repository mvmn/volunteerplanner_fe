import './App.css';

import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useDispatch } from 'react-redux';

import { getCurrentUser, setLoggedOut } from '../src/actions/user';
import { getConfig } from './actions/config';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ACCESS_TOKEN } from './constants/uiConfig';
import { Main } from './screens/Main';
import theme from './styles/theme';

const queryClient = new QueryClient();

function App({ children }) {
  // Test saga start
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConfig());
  }, [dispatch]);

  useEffect(() => {
    if (sessionStorage.getItem(ACCESS_TOKEN)) {
      dispatch(getCurrentUser());
    } else {
      dispatch(setLoggedOut());
    }
  }, [dispatch]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <div className='App'>
            <CssBaseline />
            <Header />
            <Main>{children}</Main>
            <Footer />
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
