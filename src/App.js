import React from 'react';
import { Homepage } from './pages/homepage';
import { Routes, Route } from 'react-router-dom';
import { Header } from './sections/header';
import { MovieHelper } from './pages/movieHelper';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Homepage />} />
        <Route path="/helper" element={<MovieHelper />} />
      </Route>
    </Routes>
  );
};
