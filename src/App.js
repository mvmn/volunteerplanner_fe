import './App.css';

import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './screens/Main';
import theme from './styles/theme';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className='App'>
          <BrowserRouter>
            <CssBaseline />
            <Header />
            <Main />
            <Footer />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
