import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const CountDown = ({ RandomQuestions, index, setIndex }) => {
  let [countdown, setCountDown] = useState(RandomQuestions[index].timeout);
  const history = useHistory();
  const onTimesUp = () => {
    if (index < RandomQuestions.length - 1) {
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
        onOver();
      } else {
        onTimesUp();
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
          } else {
            onOver();
          }
        }}
      >
        Next
      </button>
    </div>
  );
};
export default CountDown;
