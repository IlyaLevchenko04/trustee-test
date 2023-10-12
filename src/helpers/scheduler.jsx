import { broadcastingFilms, events } from '../constants';

const sessions = broadcastingFilms
  .map(({ id, sessions }) => sessions.map(s => ({ id, time: s })))
  .flat(1);

function convertTimeToCurrentDate(inputTime, addedHours) {
  const now = new Date();
  const [hours, minutes] = inputTime.split(':').map(Number);

  const timezoneOffset = now.getTimezoneOffset();
  now.setHours(
    (addedHours ? addedHours + hours : hours) - Math.floor(timezoneOffset / 60)
  );
  now.setMinutes(minutes + (timezoneOffset % 60));
  now.setSeconds(0);

  return now;
}

export const shedulerHandler = () => {
  console.log(sessions);
  events.forEach(e => {
    sessions.forEach(s => {
      console.log(
        s.time,
        e.timeEnd,
        convertTimeToCurrentDate(s.time) >= convertTimeToCurrentDate(e.timeEnd)
      );
      console.log(
        s.time,
        e.timeStart,
        convertTimeToCurrentDate(s.time) <=
          convertTimeToCurrentDate(e.timeStart)
      );
      console.log(
        convertTimeToCurrentDate(s.time),
        convertTimeToCurrentDate(s.time, 2)
      );
    });
    console.log(
      convertTimeToCurrentDate(e.timeStart),
      convertTimeToCurrentDate(e.timeEnd)
    );
  });
};
