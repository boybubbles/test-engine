import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import http from "../../database/mockApi";
import { Button, Result } from "antd";
import { FeedBack } from "../../redux/reducers/userReducer";
import "./Thankyou.scss";
const Thankyou = () => {
  const { result, testContent } = useSelector(
    (rootReducer) => rootReducer.userReducer
  );
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
    http.post("api/v1/?id=2", result).then((response) => {
      dispatch(FeedBack({ ...response.data, feedback: feedback }));
    });
  };

  return (
    <div className="container">
      {result.candidate.feedback ? (
        <Result
          status="success"
          title="Your result and feedback has been submitted successfully"
          subTitle="We will send you an email within a few days"
          extra={[
            <Button type="primary" key="console">
              Go Console
            </Button>,
            <Button key="buy">Buy Again</Button>,
          ]}
        />
      ) : (
        <>
          <h1>Thankyou, {candidate.lastname}</h1>
          <h3>{messages.thankyou}</h3>
          <div>
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
