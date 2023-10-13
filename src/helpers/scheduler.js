import addMinutes from 'date-fns/addMinutes';

export function convertTimeToCurrentDate(inputTime, addedHours) {
  const now = new Date();
  const [hours, minutes] = inputTime.split(':').map(Number);

  const targetTimezoneOffset = 0;

  now.setHours(
    (addedHours ? addedHours + hours : hours) -
      Math.floor(targetTimezoneOffset / 60)
  );
  now.setMinutes(minutes + (targetTimezoneOffset % 60));
  now.setSeconds(0);

  return now;
}

export function shedulerHandler(events, films) {
  const now = new Date();
  const sessionsArray = [];

  films.forEach(({ id, sessions, duration }) => {
    sessions.forEach(s => {
      const hours = duration % 60;
      now.setHours(hours);

      sessionsArray.push({
        id,
        timeStart: s,
        timeEnd: addMinutes(s, duration),
      });
    });
  });

  const result = {};

  sessionsArray
    .filter(s => {
      return events.every(e => {
        return (
          s.timeEnd < addMinutes(e.timeStart, -30) ||
          s.timeStart > addMinutes(e.timeEnd, 30)
        );
      });
    })
    .forEach(({ id, timeStart, timeEnd }) => {
      if (Object.keys(result).includes(id)) {
        result[id].push({ timeStart, timeEnd });
      } else {
        result[id] = [{ timeStart, timeEnd }];
      }
    });

  return result;
}
