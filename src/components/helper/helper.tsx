import React, { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { calculateMovieTime } from '../../functions/calculateMovieTime';

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

export const Helper: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [events, setEvent] = useState([]);

  const optimalTime = calculateMovieTime(meetings, movieSchedule);
  console.log(optimalTime);
  return (
    <>
      <h2>Calculate movie time</h2>
      <form
        onSubmit={handleSubmit(data => {
          console.log(data);
        })}
      >
        <label>
          Date of event:
          <input
            placeholder="2023-10-08"
            type={'text'}
            {...register('date', {
              required: 'This field is required',
            })}
          />
          <p style={{ padding: 0, margin: 0 }}>
            {errors.date?.message as string}
          </p>
        </label>

        <label>
          Time of event:
          <input
            placeholder="08:00"
            type={'text'}
            {...register('time', {
              required: 'This field is required',
            })}
          />
          <p style={{ padding: 0, margin: 0 }}>
            {errors.time?.message as string}
          </p>
        </label>
        <button type="submit">Calculate</button>
      </form>
    </>
  );
};
