import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    Begintest: (state, action) => (state = action.payload),
  },
});

export const { Begintest } = userReducer.actions;

export default userReducer.reducer;
