import { createSlice } from "@reduxjs/toolkit";
import database from "../../database/database.json";
const initialState = {
  isDone: false,
  currentIndex: 0,
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
      const ramdomize = (array) => {
        let currentIndex = array.length;
        let randomIndex;

        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          //swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
          ];
        }

        return array;
      };
      let index = database.findIndex(
        (item) => item.global.test_id === action.payload.testData.global.test_id
      );
      state.testContent = database[index];
      state.testContent.questions = ramdomize(database[index].questions);
    },
    Answer: (state, action) => {
      state.result.questions.push(action.payload);
      state.result.questions[state.currentIndex] = {
        ...state.result.questions[state.currentIndex],
        clicks: state.result.questions[state.currentIndex].history.length,
      };
      console.log(typeof action.payload.results);

      state.currentIndex += 1;
    },
    FeedBack: (state, action) => {
      state.result.candidate.feedback = action.payload;
      state.result.candidate.send_feedback = true;
      state.result.stats.time_end = Date.now();
      state.isDone = true;
    },
    Start: (state, action) => {
      state.currentIndex = 0;
    },
    Reset: (state, action) => {
      state = {
        isDone: false,
        currentIndex: 0,
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
      localStorage.clear();
    },
  },
});

export const { Begintest, Answer, FeedBack, Start, Reset } =
  userReducer.actions;

export default userReducer.reducer;
