import React, { useEffect, useState } from "react";
import CountDown from "../../component/CountDown";
import "./QuestionForm.scss";
import database from "../../database/database.json";
const QuestionForm = ({ RandomQuestions }) => {
  const { questions } = database;
  const [index, setIndex] = useState(0);
  const { question, multichoice } = RandomQuestions[index];
  console.log(RandomQuestions);
  const [history, setHistory] = useState(questions);
  const onAnswer = ({ target }) => {
    const instance = {
      id: 0,
      timeout: 30, // timeout is seconds
      question: "What is your name?",
      multichoice: false,
      topic: "Technical",
      answers: ["Florian", "Sven"],
      clicks: 3,
      history: [
        {
          id: 0,
          pos: 0,
          timestamp: 4963409364, // utc timestamp
        },
        {
          id: 1,
          pos: 1,
          timestamp: 4963409364, // utc timestamp
        },
        {
          id: 2,
          pos: 0,
          timestamp: 4963409364, // utc timestamp
        },
        {
          id: 3,
          pos: 1,
          timestamp: 4963409364, // utc timestamp
        },
      ],

      results: [
        {
          answer: "Florian",
          position: 1,
          result: true,
        },
        {
          answer: "Sven",
          position: 0,
          result: false,
        },
      ],
      completed: true, // has he chosen at least one
    };
  };
  useEffect(() => {}, [index]);
  return (
    <div>
      <CountDown
        RandomQuestions={RandomQuestions}
        index={index}
        setIndex={setIndex}
      />
      <h1>{question}</h1>
      {RandomQuestions[index].answers.map((item, index) => (
        <div key={index}>
          {item}
          <input
            onChange={onAnswer}
            key={item}
            type={multichoice ? "checkbox" : "radio"}
            name="item"
          />
        </div>
      ))}
    </div>
  );
};

export default QuestionForm;
