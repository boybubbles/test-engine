import React from "react";
import { useHistory } from "react-router-dom";
import database from "../../database/database.json";
const Welcome = () => {
  let { questions, messages } = database;
  const secondsToHms = (params) => {
    let sec = Number(params);
    let m = Math.floor((sec % 3600) / 60);
    let s = Math.floor((sec % 3600) % 60);
    let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return mDisplay + sDisplay;
  };
  const history = useHistory();
  return (
    <div className="container">
      <h1>Important Info</h1>
      <h3>{messages.information}</h3>
      <h4>
        You will have
        <div>
          {secondsToHms(
            questions.reduce((total, item) => total + item.timeout, 0)
          )}
        </div>
        with {questions.length} questions
      </h4>
      <h4>Start your test now</h4>
      <button
        onClick={() => {
          history.push("/test");
        }}
      >
        Start
      </button>
    </div>
  );
};

export default Welcome;
