import { UserData } from "@app/table/UserData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@type";


const initialState: User[] = [];

const dataTableSlice = createSlice({
  name: "users",
  initialState:UserData,
  reducers: {
    deleteUser: (state, action: PayloadAction<number>) => 
      state.filter(user => user.id !== action.payload),
    
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.findIndex(user => user.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },

    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
  },
});

export const { deleteUser, updateUser, addUser } = dataTableSlice.actions;
export default dataTableSlice.reducer;
