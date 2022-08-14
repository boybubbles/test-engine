import { createSlice } from "@reduxjs/toolkit";
import database from "../../database/database.json";
const initialState = {
  success: false,
  status: "",
  testContent: {},
  result: {
    global: {
      test_id: null,
      name: null,
      timeout: null, // timeout is seconds
      randomize: null,
    },

    candidate: {
      time_start: null, // UTC timestamp
      firstname: null,
      lastname: null,
      contact: null,
      send_feedback: false,
      feedback: "",
    },

    stats: {
      time_start: null, // UTC timestamp
      time_end: null, // UTC timestamp
    },

    questions: [],
  },
};
const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    Begintest: (state, action) => {
      let index = database.findIndex(
        (item) => item.global.test_id === action.payload.testData.global.test_id
      );
      let dateNow = Date.now();
      for (let k in state.result) {
        if (k === "global") {
          for (let i in state.result.global) {
            state.result.global[i] = action.payload.testData.global[i];
          }
        } else if (k === "candidate") {
          for (let j in state.result.candidate) {
            if (j === "time_start") {
              state.result.candidate.time_start = dateNow;
            } else if (j === "feedback") {
              state.result.candidate[j] = "";
            } else if (j === "send_feedback") {
              state.result.candidate[j] = false;
            } else {
              state.result.candidate[j] = action.payload.testData.candidate[j];
            }
          }
        } else if (k === "stats") {
          state.result.stats.time_start = dateNow;
        }
      }
      state.success = action.payload.success;
      state.status = action.payload.status;
      state.testContent = database[index];
    },
    Answer: (state, action) => {
      // create a partern as the biven example
      // in the action we have:
      // - action.payload.AnswerHistory

      
      // let { answers, id, timeout, question, multichoice, topic } =
      //   action.payload.question;
      // if (action.payload?.value) {
      //   state.result.questions.push({
      //     id: id,
      //     timeout: timeout, // timeout is seconds
      //     question: question,
      //     multichoice: multichoice,
      //     topic: topic,
      //     answers: answers,
      //     clicks: 3,
      //     history: [],
      //     results: answers.map((item, index) => ({
      //       answer: item,
      //       position: index,
      //       result: action.payload.value === item ? true : false,
      //     })),
      //     completed: true, // has he chosen at least one
      //   });
      // }
    },
  },
});

export const { Begintest, Answe } = userReducer.actions;

export default userReducer.reducer;
