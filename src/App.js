import './App.css';

import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setLoggedIn } from '../src/actions/user';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ACCESS_TOKEN } from './constants/uiConfig';
import { Main } from './screens/Main';
import theme from './styles/theme';

function App({ children }) {
  // Test saga start
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem(ACCESS_TOKEN)) {
      dispatch(setLoggedIn());
    }
  }, [dispatch]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className='App'>
          <CssBaseline />
          <Header />
          <Main>{children}</Main>
          <Footer />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
