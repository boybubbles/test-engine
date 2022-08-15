import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import CountDown from "../../component/CountDown";
import { Answer } from "../../redux/reducers/userReducer";
import { useSelector } from "react-redux";
import "./QuestionForm.scss";

const QuestionForm = () => {
  const { testContent } = useSelector((rootReducer) => rootReducer.userReducer);

  const { currentIndex } = useSelector(
    (rootReducer) => rootReducer.userReducer
  );
  const dispatch = useDispatch();
  const instance = useRef();
  const updateHistoryAndValue = ({ target }) => {
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
  };
  const onAnswer = async (e) => {
    dispatch(Answer(instance.current));
  };
  useEffect(() => {
    instance.current = {
      id: testContent.questions[currentIndex].id,
      timeout: testContent.questions[currentIndex].timeout, // timeout is seconds
      question: testContent.questions[currentIndex].question,
      multichoice: testContent.questions[currentIndex].multichoice,
      topic: testContent.questions[currentIndex].topic,
      answers: testContent.questions[currentIndex].answers,
      history: [],
      results: [
        testContent.questions[currentIndex].answers.map((item, index) => ({
          answer: item,
          position: index,
          result: false,
        })),
      ],
      completed: false, // has he chosen at least one
    };
    console.log("questionform currentIndex:", currentIndex);
    return () => {
      console.log("-------------questionform prevIndex:--------------", currentIndex);
    };
  }, [currentIndex]);
  return (
    <div className="questionForm-container">
      <CountDown RandomQuestions={testContent.questions} onAnswer={onAnswer} />
      <h1>{testContent.questions[currentIndex].question}</h1>
      <div className="answer-container">
        {testContent.questions[currentIndex].answers.map((item, index) => (
          <div key={index}>
            {item}
            <input
              onClick={updateHistoryAndValue}
              key={item + Math.floor(Math.random() * 5)}
              type={
                testContent.questions[currentIndex].multichoice === true
                  ? "checkbox"
                  : "radio"
              }
              name={
                testContent.questions[currentIndex].multichoice === true
                  ? item
                  : "radio"
              }
              value={item}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionForm;
