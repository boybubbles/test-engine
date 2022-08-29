import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from "../../database/mockApi";
import { Result } from "antd";
import { FeedBack } from "../../redux/reducers/userReducer";
import "./Thankyou.scss";
import logo from "../../image/logo.jpg";
const Thankyou = () => {
  const { result, testContent, isDone } = useSelector(
    (rootReducer) => rootReducer.userReducer
  );
  if (isDone) {
    localStorage.setItem("result", JSON.stringify(result));
    http.post("/api/v1/?id=2", result);
    console.log(result);
  }
  const dispatch = useDispatch();
  //send data to server
  const [feedback, setFeedback] = useState();
  const { candidate } = result;
  const { messages } = testContent;

  const handleChange = ({ target }) => {
    let { value } = target;
    setFeedback(value);
  };
  const handleSubmit = () => {
    // submit to api
    dispatch(FeedBack(feedback));
  };

  return (
    <div className="container-thankyou">
      <div className="logo">
        <img src={logo} alt="..." />
      </div>
      {result.candidate.send_feedback ? (
        <Result
          status="success"
          title="Your result and feedback has been submitted successfully"
          subTitle="We will send you an email within a few days"
          extra={[
            <a href="/" key="doAgain">
              Back to Home Page
            </a>,
          ]}
        />
      ) : (
        <>
          <div className="thankyou">Thank you, {candidate.lastname}</div>
          <div className="thankyou">{messages.thankyou}</div>
          <div className="feedback-content">
            <textarea
              cols="30"
              rows="10"
              placeholder={messages.feedback}
              onChange={handleChange}
            ></textarea>
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
};

export default Thankyou;
