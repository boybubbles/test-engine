import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};
const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
});

export const {} = userReducer.actions;

export default userReducer.reducer;
