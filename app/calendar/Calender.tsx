"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isToday,
  startOfMonth,
} from "date-fns";
import { FaBell } from "react-icons/fa";
import { Event } from "@type";
import EventModal from "@app/components/EventModal";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const handleClick = (day: any) => {
    setSelectedDay(day);
    handleOpen();
  };

  const events = useSelector(({ eventData }: { eventData: Event[] }) =>
    eventData.map((event) => ({
      ...event,
      date: new Date(event.date), 
    }))
  );

  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startingDayIndex = getDay(firstDayOfMonth);

  return (
    <div className="border border-gray-300 p-4 rounded-md m-4 capitalize">
      <div className="container mx-auto p-4 mb-6 text-center">
        <h2 className="text-2xl font-bold text-cyan-600">
          {format(currentDate, "MMMM yyyy")}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="font-semibold bg-cyan-500 text-white p-2 text-center"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="border rounded-md p-2 bg-gray-200"
          />
        ))}
        {daysInMonth.map((day, index) => {
          const dayEvents = events.filter((event) =>
            isSameDay(event.date, day)
          );

          return (
            <div
              key={index}
              className={`min-h-24 border rounded-md flex flex-col items-center justify-center p-1 cursor-pointer ${
                isToday(day) ? "bg-cyan-400 text-white" : "hover:bg-cyan-100"
              }`}
              onClick={() => handleClick(day)}
            >
              <span className="text-lg font-bold">{format(day, "d")}</span>
              {dayEvents.map((event) => (
                <div
                  className={`px-2 my-1 relative rounded-md text-gray-800 text-center w-full ${
                    event.reminder ? "bg-red-400" : "bg-cyan-300"
                  }`}
                  key={event.id}
                >
                  {event.reminder && (
                    <span className="bg-white text-red-500 p-1 rounded-full absolute -top-3 -right-3 shadow">
                      <FaBell />
                    </span>
                  )}
                  <div className="overflow-hidden text-ellipsis">
                    <span className="font-semibold text-sm text-nowrap">
                      {event.title}
                    </span>
                  </div>
                  <p className="text-sm">{format(event.date, "h:mm a")}</p>
                </div>
              ))}
            </div>
          );
        })}
        <EventModal
          open={open}
          // handleOpen={handleOpen}
          handleClose={handleClose}
          selectedDay={selectedDay}
        />
      </div>
    </div>
  );
};

export default Calendar;
