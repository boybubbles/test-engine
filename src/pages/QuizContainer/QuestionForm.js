import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import CountDown from "../../component/CountDown";
import { Answer } from "../../redux/reducers/userReducer";
import "./QuestionForm.scss";
const QuestionForm = ({ RandomQuestions }) => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const { question, timeout, multichoice, topic, answers, id } =
    RandomQuestions[index];
  const instance = useRef({
    id: id,
    timeout: timeout, // timeout is seconds
    question: question,
    multichoice: false,
    topic: topic,
    answers: answers,
    history: [],
    results: answers.map((item, index) => ({
      answer: item,
      position: index,
      result: false,
    })),
    completed: false, // has he chosen at least one
  });
  const updateHistoryAndValue = ({ target }) => {
    /// create a partern when update question
    let { value } = target;
    if (value) {
      instance.current.completed = true;
    }
    let indexAnswer = instance.current.answers.findIndex(
      (item) => item === value
    );
    instance.current.history.push({
      id: instance.current.history.length,
      pos: indexAnswer,
      timestamp: Date.now(),
    });
    console.log(instance.current);
  };
  const onAnswer = async (e) => {
    dispatch(Answer(instance.current));
  };
  useEffect(() => {
    instance.current = {
      id: id,
      timeout: timeout, // timeout is seconds
      question: question,
      multichoice: false,
      topic: topic,
      answers: answers,
      history: [],
      results: answers.map((item, index) => ({
        answer: item,
        position: index,
        result: false,
      })),
      completed: false, // has he chosen at least one
    };
  }, [index]);
  return (
    <>
      <div>
        <h1>
          Câu hỏi hiện tại {index + 1}/{RandomQuestions.length}
        </h1>
        <p>current time out {timeout}</p>
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
