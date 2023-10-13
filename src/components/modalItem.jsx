import { nanoid } from 'nanoid';
import { dateFormat } from '../helpers/dateFormat.helper';

export const ModalItem = ({ filmsArr }) => {
  return filmsArr.map(({ id, posterURL, title, age, sessions }) => {
    return (
      <li
        key={id}
        id={id}
        className="broadcasting-item transition duration-250 ease-in-out transform hover:scale-105"
      >
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
          <ul className="broadcasting-sessions-list flex gap-4">
            {sessions.map(s => {
              return <li key={nanoid()}>{dateFormat(s.timeStart)}</li>;
            })}
          </ul>
        </div>
      </li>
    );
  });
};
