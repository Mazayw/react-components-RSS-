// import logo from './logo.svg';
import MainPage from './components/main-page/index';
import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from './components/not-found/index';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;