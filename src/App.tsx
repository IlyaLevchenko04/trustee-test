import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header/header';
import './styles/styles.css';
import { Homepage } from './components/homepage/homepage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Homepage />} />
        <Route path="/helper" element={<h1>Helper</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
