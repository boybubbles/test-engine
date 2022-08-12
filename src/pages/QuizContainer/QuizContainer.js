import React, { createContext, useEffect, useState } from "react";
import "./QuizContainer.scss";
import database from "../../database/database.json";
import QuestionForm from "./QuestionForm";

const QuizContainer = () => {
  let { questions } = database;
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
  console.log("QuizContainer-render");
  const RandomQuestions = ramdomize(questions);
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
