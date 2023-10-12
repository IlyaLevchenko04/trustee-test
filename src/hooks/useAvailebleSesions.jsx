import { useEffect, useState } from 'react';

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

export const useAvailableSessions = (events, sessions) => {
  const [availableSessions, setAvailableSessions] = useState([]);

  useEffect(() => {
    const calculateAvailableSessions = () => {
      const newAvailableSessions = events.map(event => {
        console.log('event');
        const eventStartTime = convertTimeToCurrentDate(event.startTime);
        const eventEndTime = convertTimeToCurrentDate(event.endTime);

        const filteredSessions = sessions.filter(session => {
          const sessionTime = convertTimeToCurrentDate(session.time);
          const sessionEndTime = convertTimeToCurrentDate(session.time, 2);

          return (
            sessionTime > eventEndTime,
            sessionEndTime <
              eventStartTime(
                sessionTime < eventStartTime && sessionEndTime < eventStartTime
              )
          );
        });

        return {
          eventId: event.id,
          availableSessions: filteredSessions,
        };
      });

      setAvailableSessions(newAvailableSessions);
    };

    calculateAvailableSessions();
  }, [events, sessions]);

  console.log(availableSessions);
  return availableSessions;
};
