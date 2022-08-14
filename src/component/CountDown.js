import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const CountDown = ({ RandomQuestions, index, setIndex, onAnswer }) => {
  let [countdown, setCountDown] = useState(RandomQuestions[index].timeout);
  console.log("RandomQuestions[index].timeout", RandomQuestions[index].timeout);
  const history = useHistory();
  const onTimesUp = () => {
    if (index < RandomQuestions.length - 1) {
      onAnswer();
      setIndex((prevState) => prevState + 1);
      setCountDown(RandomQuestions[index].timeout);
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
      if (index < RandomQuestions.length - 1) {
        onTimesUp();
      } else {
        onOver();
      }
    }
  }, [countdown]);
  return (
    <div>
      <h1>{countdown}</h1>
      <button
        onClick={() => {
          if (index < RandomQuestions.length - 1) {
            setIndex((prevState) => prevState + 1);
            setCountDown(RandomQuestions[index].timeout);
            onAnswer();
          } else {
            onOver();
          }
        }}
      >
        {index < RandomQuestions.length - 1
          ? "Next"
          : "It's over! Congratulation, Click to submit your test"}
      </button>
    </div>
  );
};
export default CountDown;
