import { nanoid } from 'nanoid';

export const broadcastingFilms = [
  {
    title: 'Щенячий патруль',
    id: nanoid(),
    posterURL:
      'https://smartcinema.ua//media/img/schenjachij-patrul-megakno/poster.jpeg',
    age: '0+',
    sessions: ['14:00', '15:00', '17:30', '19:00'],
  },
  {
    title: 'Велика прогулянка',
    id: nanoid(),
    posterURL:
      'https://smartcinema.ua//media/img/velika-proguljanka/poster_uqLLV1E.jpg',
    age: '0+',
    sessions: ['12:00', '16:00', '16:30', '20:00'],
  },
  {
    title: 'Творець',
    id: nanoid(),
    posterURL: 'https://smartcinema.ua//media/img/tvorets/poster_ZjoR3Tq.jpg',
    age: '16+',
    sessions: ['10:00', '11:00', '18:30', '21:00'],
  },
];

export const events = [
  {
    id: nanoid(),
    title: 'Event 1',
    timeStart: '08:00',
    timeEnd: '10:00',
  },
  {
    id: nanoid(),
    title: 'Event 2',
    timeStart: '14:00',
    timeEnd: '15:00',
  },
  {
    id: nanoid(),
    title: 'Event 3',
    timeStart: '16:30',
    timeEnd: '17:00',
  },
];