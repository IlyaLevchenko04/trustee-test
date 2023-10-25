import { dateFormat } from '../helpers/dateFormat';

export const EventCard = ({
  id,
  title,
  allDay,
  timeStart,
  timeEnd,
  handleDeleteEvent,
}) => {
  return (
    <li className="events-item">
      <h3 className="events-item-header">{title || 'Event'}</h3>
      {allDay ? (
        <p>All day event</p>
      ) : (
        <>
          <p>Start Time: {dateFormat(timeStart)}</p>
          <p>End Time: {dateFormat(timeEnd)}</p>
        </>
      )}
      <button className="close-btn" onClick={() => handleDeleteEvent(id)}>
        X
      </button>
    </li>
  );
};
