import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import CountDown from "../../component/CountDown";
import { Answer } from "../../redux/reducers/userReducer";
import "./QuestionForm.scss";
const QuestionForm = ({ RandomQuestions }) => {
  const [index, setIndex] = useState(0);
  const { question, multichoice } = RandomQuestions[index];
  const [AnswerHistory, setHistory] = useState([]);
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const updateHistoryAndValue = ({ target }) => {
    let { value } = target;
    setValue(value);
    setHistory(
      AnswerHistory.push({
        id: null,
        pos: null,
        timestamp: null, // utc timestamp
      })
    );
    // set history
  };
  const onAnswer = (e) => {
    let history = {};
    //dispatch(Answer({})) to store
  };

  return (
    <>
      <div>
        <h1>
          Câu hỏi hiện tại {index + 1}/{RandomQuestions.length}
        </h1>
        <CountDown
          RandomQuestions={RandomQuestions}
          index={index}
          setIndex={setIndex}
          onAnswer={onAnswer}
        />
        <h1>{question}</h1>
      </div>
      {RandomQuestions[index].answers.map((item, index) => (
        <div key={index}>
          {item}
          <input
            onClick={updateHistoryAndValue}
            key={item + Math.floor(Math.random() * 5)}
            type={multichoice ? "checkbox" : "radio"}
            name={multichoice ? item : "radio"}
            value={item}
          />
        </div>
      ))}
    </>
  );
};

export default QuestionForm;
