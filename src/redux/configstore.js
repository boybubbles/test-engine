/** @format */

import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./reducers/questionReducer";
import userReducer from "./reducers/userReducer";
export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    questionReducer: questionReducer,
  },
});
