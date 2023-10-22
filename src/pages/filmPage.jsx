import { Navigate, useParams } from 'react-router';
import { broadcastingFilms, description } from '../constants';
import { dateFormat } from '../helpers/dateFormat';

export const FilmPage = () => {
  const { id } = useParams();

  try {
    const { title, posterURL, age, sessions, duration } =
      broadcastingFilms.find(({ id: movieId }) => id === movieId);

    const parsedSessions = sessions.map(time => dateFormat(time));

    return (
      <div className="film-wrapper">
        <img src={posterURL} alt="Film poster" className="film-poster" />
        <div className="film-information-wrapper">
          <ul className="film-info-list">
            <li className="film-info-item">
              <p className="film-info-text">
                Title: <span className="styled-span-wrapper">{title}</span>
              </p>
            </li>
            <li className="film-info-item">
              <p className="film-info-text">
                Description:{' '}
                <span className="styled-span-wrapper">{description}</span>
              </p>
            </li>
            <li className="film-info-item">
              <p className="film-info-text">
                Duration:{' '}
                <span className="styled-span-wrapper">{duration} minutes</span>
              </p>
            </li>
            <li className="film-info-item">
              <p className="film-info-text">
                Age: <span className="age-span">{age}</span>
              </p>
            </li>
            <li className="film-info-item">
              <p className="film-info-text">
                Sessions:{' '}
                <span className="styled-span-wrapper">
                  {parsedSessions.join(' | ')}
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  } catch (error) {
    return <Navigate to={'/'} />;
  }
};
