import React from 'react';
import { Homepage } from './pages/homepage';
import { Routes, Route } from 'react-router-dom';
import { Header } from './sections/header';
import { MovieHelper } from './pages/movieHelper';
import { NotFound } from './pages/notFound';
import { FilmPage } from './pages/filmPage';

Date.prototype.toISOStringWithTimezone = function () {
  const tzOffset = -this.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return (
    this.getFullYear() +
    '-' +
    pad(this.getMonth() + 1) +
    '-' +
    pad(this.getDate()) +
    'T' +
    pad(this.getHours()) +
    ':' +
    pad(this.getMinutes()) +
    ':' +
    pad(this.getSeconds()) +
    diff +
    pad(tzOffset / 60) +
    ':' +
    pad(tzOffset % 60)
  );
};

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Homepage />} />
        <Route path="/helper" element={<MovieHelper />} />
        <Route path="/films/:id" element={<FilmPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
