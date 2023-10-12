export const BroadcastingItem = ({ filmsArr }) => {
  return filmsArr.map(({ id, posterURL, title, age, sessions }) => (
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
        <span className="broadcasting-sessions-list">
          {sessions.join(' | ')}
        </span>
      </div>
    </li>
  ));
};
