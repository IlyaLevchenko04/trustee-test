import { nanoid } from 'nanoid';
import { dateFormat } from '../helpers/dateFormat';
import { Link } from 'react-router-dom';

export const FilmItem = ({ filmsArr, isModal = false }) => {
  return filmsArr.map(({ id, posterURL, title, age, sessions }) => (
    <li key={id} id={id} className="broadcasting-item">
      <Link to={`/films/${id}`}>
        <img
          src={posterURL}
          alt={title}
          width={'260px'}
          className="broadcasting-img"
        />
        <div className="info-list-container">
          <h3 className="broadcasting-item-header">
            {`${title}  `}
            <span className="age-span">{age}</span>
          </h3>
          <ul className="broadcasting-sessions-list">
            {filmsArr.length > 0 &&
              sessions.map(s => (
                <li key={nanoid()}>{dateFormat(isModal ? s.timeStart : s)}</li>
              ))}
          </ul>
        </div>
      </Link>
    </li>
  ));
};
