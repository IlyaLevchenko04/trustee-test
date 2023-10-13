const TIME_FORMAT = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};

const TIME_ZONE = 'en-US';

export const dateFormat = date =>
  date.toLocaleTimeString(TIME_ZONE, TIME_FORMAT);
