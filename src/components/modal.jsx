import { broadcastingFilms } from '../constants';
import { FilmItem } from './filmItem';

export const Modal = ({ onClose, sessionsAv }) => {
  const sessionsIds = Object.keys(sessionsAv);

  const allMovies = [];

  sessionsIds.map(sessionId => {
    const film = broadcastingFilms.filter(({ id }) => id === sessionId);

    const newFilm = { ...film[0], sessions: sessionsAv[sessionId] };

    return allMovies.push(newFilm);
  });
  return (
    <div className="modal-container">
      <div className="modal-backdrop"></div>
      <div className="modal">
        <button onClick={onClose} className="modal-close">
          X
        </button>
        <h3 className="text-black font-bold">
          You can watch this films at this time:
        </h3>
        <ul className="modal-list">
          {<FilmItem isModal filmsArr={allMovies} />}
        </ul>
      </div>
    </div>
  );
};
