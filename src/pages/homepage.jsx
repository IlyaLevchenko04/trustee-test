import React from 'react';
import { WelcomeContainer } from '../components/welcome';
import { BroadcastingItem } from '../components/broadcastingItem';
import { broadcastingFilms } from '../constants';

export const Homepage = () => {
  return (
    <>
      <WelcomeContainer />
      <div className="broadcasting-container">
        <h2 className="broadcasting-header text-center">Broadcasting</h2>
        <ul className="broadcasting-list">
          <BroadcastingItem filmsArr={broadcastingFilms} />
        </ul>
      </div>
    </>
  );
};
