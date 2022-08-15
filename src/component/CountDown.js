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
    
    history.push("/thankyou");
  };
  useEffect(() => {
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
    console.log("CountDown prevIndex", currentIndex);
    return () => {
      console.log("----------CountDown prevIndex--------------", currentIndex);
    };
  }, [countdown]);
  return (
    <div className="countdown-container">
      <h3>Time Left: </h3>
      <h1 className="countdown">{countdown}</h1>
      <div className="flex-growth"></div>
      <button
        onClick={() => {
          if (currentIndex < RandomQuestions.length - 1) {
            setCountDown(RandomQuestions[currentIndex].timeout);
            onAnswer();
          } else {
            onOver();
          }
        }}
      >
        {currentIndex < RandomQuestions.length - 1
          ? "Next"
          : "It's over! Congratulation, Click to submit your test"}
      </button>
    </div>
  );
};
export default CountDown;
