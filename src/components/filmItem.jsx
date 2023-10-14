import { nanoid } from "nanoid";
import { dateFormat } from "../helpers/dateFormat";

export const FilmItem = ({ filmsArr, isModal = false }) =>
  filmsArr.map(({ id, posterURL, title, age, sessions }) => (
    <li
      key={id}
      id={id}
      className="broadcasting-item transition duration-250 ease-in-out transform hover:scale-105"
    >
      <img
        src={posterURL}
        alt={title}
        width={"260px"}
        className="broadcasting-img"
      />
      <div className="info-list-container">
        <h3 className="broadcasting-item-header">
          {`${title}  `}
          <span className="age-span">{age}</span>
        </h3>
        <ul className="broadcasting-sessions-list flex gap-4">
          {filmsArr.length > 0 &&
            sessions.map((s) => (
              <li key={nanoid()}>{dateFormat(isModal ? s.timeStart : s)}</li>
            ))}
        </ul>
      </div>
    </li>
  ));
