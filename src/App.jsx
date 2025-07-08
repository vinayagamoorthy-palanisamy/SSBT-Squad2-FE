import React from 'react';
import logo from './logo.svg';
import './App.css';
import "./assets/styles/global.scss";
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import CustomModal from './components/CustomModal';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    <CustomModal />
</ThemeProvider>
  );
}

export default App;
