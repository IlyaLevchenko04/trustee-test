import { broadcastingFilms } from '../constants';
import { ModalItem } from './modalItem';

export const Modal = ({ onClose, sessionsAv }) => {
  const sessionsIds = Object.keys(sessionsAv);

  const allMovies = [];

  sessionsIds.map(sessionId => {
    const film = broadcastingFilms.filter(({ id }) => id === sessionId);

    const newFilm = { ...film[0], sessions: sessionsAv[sessionId] };

    return allMovies.push(newFilm);
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white  p-12 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-gray-800 "
        >
          X
        </button>
        <h3 className="text-black font-bold">
          You can watch this films at this time:
        </h3>
        <ul className="flex overflow-hidden gap-4">
          {<ModalItem filmsArr={allMovies} />}
        </ul>
      </div>
    </div>
  );
};
