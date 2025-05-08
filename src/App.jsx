import React from 'react';
// import logo from './logo.svg';
import './App.css';
import "./assets/styles/global.scss";
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
