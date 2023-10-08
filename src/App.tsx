import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header/header';
import './styles/styles.css';
import { Homepage } from './components/homepage/homepage';
import { Helper } from './components/helper/helper';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Homepage />} />
        <Route path="/helper" element={<Helper />} />
      </Route>
    </Routes>
  );
};

export default App;
