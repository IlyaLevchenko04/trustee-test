import { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { EventForm } from '../components/eventForm';

export const MovieHelper = () => {
  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const currentDate = new Date();

  return (
    <>
      <EventForm />
      {/* <Flatpickr
        data-enable-time
        value={selectedDate}
        onChange={date => setSelectedDate(date[0])}
        options={{ minDate: currentDate, time_24hr: true }}
      /> */}
    </>
  );
};
