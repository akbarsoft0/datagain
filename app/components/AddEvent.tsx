"use client";
import { addEvent, updateEvent } from "@store/eventCalendarSlice";
import { Event } from "@type";
import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

type AddEventProps = {
  day: Date | null;
  handleClose: () => void; 
};

const AddEvent: React.FC<AddEventProps> = ({ day, handleClose }) => {
  const [selectedEvent, setSelectedEvent] = useState<Partial<Event>>({});
  const [isReminder, setIsReminder] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    time: "",
    reminder: false,
    date: day,
  });

  const events = useSelector(({ eventData }: { eventData: Event[] }) =>
    eventData.map((event) => ({
      ...event,
      date: new Date(event.date),
    }))
  );

  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleReminderToggle = () => {
    setIsReminder((prev) => !prev);
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      reminder: !isReminder,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const eventToSave: Event = {
      ...newEvent,
      date: new Date(newEvent.date ?? day ?? new Date()).toISOString(),
      id: selectedEvent.id || events.length + 1,
    };

    if (selectedEvent.id) {
      dispatch(updateEvent(eventToSave));
    } else {
      dispatch(addEvent(eventToSave));
    }

    // Close the modal after saving the event
    handleClose();

    // Reset the form fields
    setSelectedEvent({});
    setNewEvent({
      title: "",
      description: "",
      time: "",
      reminder: false,
      date: day,
    });
    setIsReminder(false);
  };

  return (
    <>
      <form className="capitalize grid gap-2" onSubmit={handleFormSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter title"
          className="rounded p-2 border-2 outline-cyan-300 border-cyan-300"
          required
          value={newEvent.title}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          className="rounded p-2 border-2 outline-cyan-300 border-cyan-300"
          name="description"
          id="description"
          placeholder="Enter description"
          value={newEvent.description}
          onChange={handleChange}
        ></textarea>
        <div className="flex justify-between">
          <label htmlFor="date" className="flex-1">
            Date
          </label>
          <input type="text" value={day ? day.toDateString() : ""} disabled />
        </div>
        <div className="flex justify-between">
          <label htmlFor="time" className="flex-1">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            placeholder="Enter time"
            value={newEvent.time}
            onChange={handleChange}
            className="rounded p-2 border-2 outline-cyan-300 border-cyan-300"
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="reminder" className="flex-1">
            Add Reminder
          </label>
          <button
            type="button"
            className={`p-2 rounded-full ${
              isReminder
                ? "bg-red-100 text-red-500"
                : "bg-gray-100 text-gray-500"
            }`}
            id="reminder"
            onClick={handleReminderToggle}
          >
            <FaBell />
          </button>
        </div>
        <button
          type="submit"
          className="mt-4 bg-cyan-600 text-white rounded p-2"
        >
          Save Event
        </button>
      </form>
    </>
  );
};

export default AddEvent;
