import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const CountDown = ({ RandomQuestions, onAnswer }) => {
  const { currentIndex } = useSelector(
    (rootReducer) => rootReducer.userReducer
  );
  const [countdown, setCountDown] = useState(
    RandomQuestions[currentIndex].timeout
  );
  const history = useHistory();
  const onTimesUp = () => {
    if (currentIndex < RandomQuestions.length - 1) {
      onAnswer();
      setCountDown(RandomQuestions[currentIndex + 1].timeout);
    }
  };
  const onOver = () => {
    onAnswer();
    history.replace("/thankyou");
  };
  useEffect(() => {
    console.log("currentIndex", currentIndex);
    if (countdown >= 0) {
      const timerID = setInterval(() => {
        setCountDown((prevState) => prevState - 1);
      }, 1000);
      return () => {
        clearInterval(timerID);
      };
    } else {
      if (currentIndex < RandomQuestions.length - 1) {
        onTimesUp();
      } else {
        onOver();
      }
    }
  }, [countdown]);
  return (
    <div className="countdown-container">
      <div>Time Left: </div>
      <div className="countdown">{countdown}</div>
      <div className="flex-growth"></div>
      <button
        onClick={() => {
          if (currentIndex < RandomQuestions.length - 1) {
            onAnswer();
            setCountDown(RandomQuestions[currentIndex + 1].timeout);
          } else {
            onAnswer();
            onOver();
          }
        }}
      >
        {currentIndex < RandomQuestions.length - 1
          ? "Next"
          : "Last Question, submit results next page"}
      </button>
    </div>
  );
};
export default CountDown;
