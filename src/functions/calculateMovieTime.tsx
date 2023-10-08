interface MeetingObj {
  date: string;
  time: string;
}

interface MovieScheduleObj {
  date: string;
  time: string;
  name: string;
}

export function calculateMovieTime(
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
