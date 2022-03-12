import './App.css';

import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './screens/Main';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <CssBaseline />
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
