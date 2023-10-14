import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { nanoid } from "nanoid";
import { sendToast } from "../helpers/toastify";
import {
  convertTimeToCurrentDate,
  shedulerHandler,
} from "../helpers/scheduler";
import { broadcastingFilms } from "../constants";
import { dateFormat } from "../helpers/dateFormat";
import { Modal } from "./modal";

export const EventForm = () => {
  const { handleSubmit, control, reset, formState } = useForm();
  const { errors } = formState;
  const [events, setEvents] = useState([]);
  const [isModal, setModal] = useState(false);
  const [movies, setMovies] = useState({});

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  useEffect(() => {
    const localEvents = localStorage.getItem("events") || false;
    if (localEvents) {
      const parsedEvents = JSON.parse(localEvents);
      setEvents(
        [...parsedEvents].map((e) => ({
          ...e,
          timeEnd: new Date(e.timeEnd),
          timeStart: new Date(e.timeStart),
        }))
      );
    } else {
      setEvents([]);
    }
  }, []);

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const onSubmit = ({ timeEnd, timeStart, title }) => {
    if (!isValidTimeFormat(timeStart) || !isValidTimeFormat(timeEnd)) {
      reset();
      return sendToast("Invalid time format. Please use HH:mm.");
    }

    if (!isEndTimeAfterStartTime(timeStart, timeEnd)) {
      reset();
      return sendToast("End Time should be after Start Time.");
    }

    const newEvent = {
      id: nanoid(),
      timeStart: convertTimeToCurrentDate(timeStart),
      timeEnd: convertTimeToCurrentDate(timeEnd),
      title,
    };
    setEvents([...events, newEvent]);
    const stringEvents = JSON.stringify([...events, newEvent]);
    localStorage.setItem("events", stringEvents);
    reset();
  };

  const isValidTimeFormat = (time) => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  };

  const isEndTimeAfterStartTime = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(":");
    const [endHour, endMinute] = endTime.split(":");
    const start = new Date(0, 0, 0, startHour, startMinute);
    const end = new Date(0, 0, 0, endHour, endMinute);
    return start < end;
  };

  const onCalculate = () => {
    const availableFilms = shedulerHandler(events, broadcastingFilms);

    setMovies({ ...availableFilms });

    openModal();
  };

  return (
    <div className="w-1/3 mx-auto mt-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <Controller
            defaultValue={""}
            name="title"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-250 ease-in-out transform hover:scale-105 ${
                  errors.title ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="Go out with friends"
                required
              />
            )}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="timeStart"
          >
            Start Time
          </label>
          <Controller
            defaultValue={""}
            name="timeStart"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-250 ease-in-out transform hover:scale-105 ${
                  errors.title ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="08:00"
                required
              />
            )}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="timeEnd"
          >
            End Time
          </label>
          <Controller
            defaultValue={""}
            name="timeEnd"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-250 ease-in-out transform hover:scale-105 ${
                  errors.title ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="10:00"
                required
              />
            )}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-250 ease-in-out transform"
            type="submit"
          >
            Create Event
          </button>
        </div>
      </form>
      <ul className="mt-4 grid grid-cols-2 gap-4 mb-4">
        {events.map(({ id, timeStart, timeEnd, title }) => (
          <li
            key={id}
            className="bg-#11151b border border-gray-300 shadow-md rounded mb-2 p-4 relative"
          >
            <h3 className="text-lg font-semibold">{title}</h3>
            <p>Start Time: {dateFormat(timeStart)}</p>
            <p>End Time: {dateFormat(timeEnd)}</p>
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => handleDeleteEvent(id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>

      {events.length > 0 && (
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-250 ease-in-out transform "
            onClick={onCalculate}
          >
            Calculate
          </button>
        </div>
      )}
      {isModal && <Modal onClose={closeModal} sessionsAv={movies} />}
    </div>
  );
};
