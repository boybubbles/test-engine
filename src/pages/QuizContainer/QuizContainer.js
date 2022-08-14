import React, { useEffect } from "react";
import "./QuizContainer.scss";
import QuestionForm from "./QuestionForm";
import { useSelector } from "react-redux";

const QuizContainer = () => {
  console.log("--------------------------QuizContainer----------------------");
  const { testContent } = useSelector((rootReducer) => rootReducer.userReducer);
  const ramdomize = (array) => {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      //swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };
  const questionsArray = [...testContent.questions];

  const RandomQuestions = ramdomize(questionsArray);
  return (
    <div className="container">
      <h1>Question</h1>
      <h1>
        Time left
        <div>
          <QuestionForm RandomQuestions={RandomQuestions} />
        </div>
      </h1>
    </div>
  );
};

export default QuizContainer;
