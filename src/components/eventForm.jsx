import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { sendToast } from '../helpers/toastify';
import {
  convertTimeToCurrentDate,
  shedulerHandler,
} from '../helpers/scheduler';
import { accessToken, broadcastingFilms, expiresIn } from '../constants';
import { dateFormat } from '../helpers/dateFormat';
import { Modal } from './modal';
import { GoogleCalendar } from './googleCalendar';
import { EventCard } from './eventCard';

export const EventForm = () => {
  const gapi = window.gapi;
  const { handleSubmit, control, reset, formState, getValues } = useForm();
  const { errors } = formState;
  const [events, setEvents] = useState([]);
  const [isModal, setModal] = useState(false);
  const [movies, setMovies] = useState({});
  const [emails, setEmails] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(accessToken && expiresIn);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  function setGoogleEvents(e) {
    return setEvents(() => [...events, ...e]);
  }

  useEffect(() => {
    const localEvents = localStorage.getItem('events') || false;
    if (localEvents) {
      const parsedEvents = JSON.parse(localEvents);
      setEvents(
        [...parsedEvents].map(e => ({
          ...e,
          timeEnd: new Date(e.timeEnd),
          timeStart: new Date(e.timeStart),
        }))
      );
    } else {
      setEvents([]);
    }
  }, []);

  const handleDeleteEvent = eventId => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
  };

  const onSubmit = ({
    timeEnd,
    timeStart,
    summary,
    description,
    location,
    attendeeEmail,
  }) => {
    if (!isValidTimeFormat(timeStart) || !isValidTimeFormat(timeEnd)) {
      reset();
      return sendToast('Invalid time format. Please use HH:mm.');
    }

    if (!isEndTimeAfterStartTime(timeStart, timeEnd)) {
      reset();
      return sendToast('End Time should be after Start Time.');
    }

    const newEvent = {
      id: nanoid(),
      timeStart: convertTimeToCurrentDate(timeStart),
      timeEnd: convertTimeToCurrentDate(timeEnd),
      title: summary,
      description,
      location,
      emails,
    };

    setEvents([...new Set([...events, newEvent])]);

    if (isSignedIn) {
      console.log('ISO', newEvent.timeStart.toISOStringWithTimezone());
      var event = {
        kind: 'calendar#event',
        summary: newEvent.title,
        location: newEvent.location,
        description: newEvent.description,
        start: {
          // dateTime: newEvent.timeStart.toISOStringWithTimezone().split('+')[0],
          dateTime: newEvent.timeStart.toISOStringWithTimezone().split('+')[0],
          timeZone: 'UTC',
        },
        end: {
          dateTime: newEvent.timeEnd.toISOStringWithTimezone().split('+')[0],
          timeZone: 'UTC',
        },
        recurrence: ['RRULE:FREQ=DAILY;COUNT=1'],
        attendees: newEvent.emails.map(email => ({
          email,
          responseStatus: 'needsAction',
        })),
        reminders: {
          useDefault: true,
        },
        guestsCanSeeOtherGuests: true,
      };
      var request = gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        sendUpdates: 'all',
      });
      request.execute(
        event => {
          console.log(event);
          window.open(event.htmlLink);
        },
        error => {
          console.error(error);
        }
      );
      reset();
      setEmails([]);
      return;
    }
    setEmails([]);
    reset();
  };

  const isValidTimeFormat = time => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  };

  const isEndTimeAfterStartTime = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(':');
    const [endHour, endMinute] = endTime.split(':');
    const start = new Date(0, 0, 0, startHour, startMinute);
    const end = new Date(0, 0, 0, endHour, endMinute);
    return start < end;
  };

  const onCalculate = () => {
    const availableFilms = shedulerHandler(events, broadcastingFilms);

    setMovies({ ...availableFilms });

    openModal();
  };

  const deleteAtendeeEmail = e => {
    const textContent = e.target.closest('span').textContent.split(' ');

    const updatedEmails = emails.filter(email => email !== textContent[0]);

    setEmails([...updatedEmails]);
  };

  return (
    <div className="eventForm-container">
      <form onSubmit={handleSubmit(onSubmit)} className="event-form">
        <div
          style={{
            marginBottom: '4px',
          }}
        >
          <label className="event-form-label" htmlFor="summary">
            Summary
          </label>
          <Controller
            defaultValue={''}
            name="summary"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`event-input ${
                  errors.summary ? 'border-red-500' : ''
                }`}
                type="text"
                placeholder="Go out with friends"
                required
              />
            )}
          />
        </div>
        <div
          style={{
            marginBottom: '4px',
          }}
        >
          <label className="event-form-label" htmlFor="description">
            Description
          </label>
          <Controller
            defaultValue={''}
            name="description"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`event-input ${
                  errors.description ? 'border-red-500' : ''
                }`}
                type="text"
                placeholder="Description"
                required
              />
            )}
          />
        </div>

        <div
          style={{
            marginBottom: '4px',
          }}
        >
          <label className="event-form-label" htmlFor="location">
            Location
          </label>
          <Controller
            defaultValue={''}
            name="location"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`event-input ${
                  errors.location ? 'border-red-500' : ''
                }`}
                type="text"
                placeholder="Location"
                required
              />
            )}
          />
        </div>

        <div
          style={{
            marginBottom: '4px',
          }}
        >
          <label className="event-form-label" htmlFor="attendeeEmail">
            Attendee Email
          </label>
          <Controller
            defaultValue={''}
            name="attendeeEmail"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`event-input ${
                  errors.attendeeEmail ? 'border-red-500' : ''
                }`}
                type="email"
                placeholder="example@gmail.com"
              />
            )}
          />
          {emails.map(email => (
            <div key={nanoid()} id={nanoid()} className="atendee-emails-list">
              <span key={nanoid()} className="atendee-email">
                {email}{' '}
                <button
                  className="atendee-delete"
                  type="button"
                  onClick={e => {
                    deleteAtendeeEmail(e);
                  }}
                >
                  X
                </button>
              </span>
            </div>
          ))}
          <button
            type="button"
            className="submit-btn"
            onClick={e => {
              e.preventDefault();

              const { attendeeEmail } = getValues();

              console.log(attendeeEmail);

              attendeeEmail &&
                setEmails([...new Set([...emails, attendeeEmail])]);
            }}
          >
            Add attendee email
          </button>
        </div>

        <div
          style={{
            marginBottom: '4px',
          }}
        >
          <label className="event-form-label" htmlFor="timeStart">
            Start Time
          </label>
          <Controller
            defaultValue={''}
            name="timeStart"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`event-input ${
                  errors.title ? 'border-red-500' : ''
                }`}
                type="text"
                placeholder="08:00"
                required
              />
            )}
          />
        </div>
        <div
          style={{
            marginBottom: '6px',
          }}
        >
          <label className="event-form-label" htmlFor="timeEnd">
            End Time
          </label>
          <Controller
            defaultValue={''}
            name="timeEnd"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`event-input ${
                  errors.title ? 'border-red-500' : ''
                }`}
                type="text"
                placeholder="10:00"
                required
              />
            )}
          />
        </div>
        <div className="button-container">
          <button className="submit-btn" type="submit">
            Create Event
          </button>
        </div>
      </form>
      <ul className="events-list">
        {events.map(event => (
          <EventCard
            key={event.id}
            handleDeleteEvent={handleDeleteEvent}
            title={event.title}
            allDay={event.allDay}
            timeStart={event.timeStart}
            timeEnd={event.timeEnd}
            id={event.id}
          />
        ))}
      </ul>
      <GoogleCalendar
        setEvents={setGoogleEvents}
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
        events={events}
      />
      {events.length > 0 && (
        <div className="convert-container">
          <button className="convert-btn" onClick={onCalculate}>
            Calculate
          </button>
        </div>
      )}
      {isModal && <Modal onClose={closeModal} sessionsAv={movies} />}
    </div>
  );
};
