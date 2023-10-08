import React from 'react';

interface MeetingObj {
  date: string;
  time: string;
}

interface MovieScheduleObj {
  date: string;
  time: string;
  name: string;
}

export const Helper: React.FC = () => {
  function calculateMovieTime(
    meetings: MeetingObj[],
    movieSchedule: MovieScheduleObj[]
  ) {
    const meetingsTimestamps = meetings.map(meeting =>
      Date.parse(`${meeting.date}T${meeting.time}`)
    );
    const movieScheduleTimestamps = movieSchedule.map(movie => ({
      timestamp: Date.parse(`${movie.date}T${movie.time}`),
      name: movie.name,
    }));

    meetingsTimestamps.sort((a, b) => a - b);
    movieScheduleTimestamps.sort((a, b) => a.timestamp - b.timestamp);

    for (const movie of movieScheduleTimestamps) {
      let isAvailable = true;

      for (const meetingTime of meetingsTimestamps) {
        if (Math.abs(movie.timestamp - meetingTime) < 2 * 60 * 60 * 1000) {
          isAvailable = false;
          break;
        }
      }

      if (isAvailable) {
        return {
          time: new Date(movie.timestamp),
          name: movie.name,
        };
      }
    }

    return 'Нажаль у вас немає вільного часу';
  }

  const meetings = [
    { date: '2023-10-08', time: '10:00' },
    { date: '2023-10-08', time: '14:30' },
    { date: '2023-10-08', time: '12:30' },
  ];

  const movieSchedule = [
    { date: '2023-10-08', time: '12:00', name: 'Spider-man' },
    { date: '2023-10-08', time: '15:00', name: 'Shrek' },
    { date: '2023-10-08', time: '08:00', name: 'Shrek' },
  ];

  const optimalTime = calculateMovieTime(meetings, movieSchedule);
  console.log(optimalTime);

  return <></>;
};
