import React from 'react';
import { WelcomeContainer } from '../components/welcome';
import { broadcastingFilms } from '../constants';
import { FilmItem } from '../components/filmItem';

export const Homepage = () => (
  <>
    <WelcomeContainer />
    <div className="broadcasting-container">
      <h2 className="broadcasting-header">Broadcasting</h2>
      <ul className="broadcasting-list">
        <FilmItem filmsArr={broadcastingFilms} />
      </ul>
    </div>
  </>
);
