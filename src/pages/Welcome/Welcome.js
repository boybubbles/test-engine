import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Start } from "../../redux/reducers/userReducer";
import "../Welcome/Welcome.scss";
const Welcome = () => {
  const { testContent } = useSelector((rootReducer) => rootReducer.userReducer);
  const secondsToHms = (params) => {
    let sec = Number(params);
    let m = Math.floor((sec % 3600) / 60);
    let s = Math.floor((sec % 3600) % 60);
    let mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return mDisplay + sDisplay;
  };
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  return (
    <div className="container">
      <h1>Important Info</h1>
      <h3>{testContent.messages.information}</h3>
      <div className="messages">
        <div>You will have</div>
        <div className="time">
          {secondsToHms(
            testContent.questions.reduce(
              (total, item) => total + item.timeout,
              0
            )
          )}
        </div>
        <div>with {testContent.questions.length} questions</div>
      </div>
      <h4>Start your test now</h4>
      <button
        onClick={async () => {
          dispatch(Start(0));
          history.push("/testing");
        }}
      >
        Start
      </button>
    </div>
  );
};

export default Welcome;
