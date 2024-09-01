import { EventData } from "@app/calendar/EventData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "@type";

const initialState: Event[] = EventData;

const eventCalendarSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    deleteEvent: (state, action: PayloadAction<number>) => 
      state.filter(user => user.id !== action.payload),
    
    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.findIndex(event => event.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },

    addEvent: (state, action: PayloadAction<Event>) => {
      state.push(action.payload);
    },
  },
});

export const { deleteEvent, updateEvent, addEvent } = eventCalendarSlice.actions;
export default eventCalendarSlice.reducer;
