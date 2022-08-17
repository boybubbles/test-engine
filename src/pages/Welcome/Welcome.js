import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Reset } from "../../redux/reducers/userReducer";
import "../Welcome/Welcome.scss";
import logo from "../../image/logo.jpg";
const Welcome = () => {
  const { testContent, status } = useSelector(
    (rootReducer) => rootReducer.userReducer
  );
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
  useEffect(() => {
    if (!status) {
      history.push("/");
    }
  }, []);
  return (
    <div className="container-wellcome">
      <div className="wellcome-logo">
        <img src={logo} />
      </div>
      <div className="content">
        <h1 className="wellcome-title">Important Info</h1>
        <h3 className="wellcome-title">{testContent.messages.information}</h3>
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
          <div>with {testContent.questions.length} questions for this test</div>
        </div>
        <div className="note">
          <h4 style={{ color: "red", fontWeight: "bold" }}>
            *Note: Do not reload during the test
          </h4>
          <h4>Start your test now</h4>
        </div>

        <button
          onClick={async () => {
            dispatch(Reset());
            history.push("/testing");
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Welcome;
