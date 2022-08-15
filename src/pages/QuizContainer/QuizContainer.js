import React from "react";
import "./QuizContainer.scss";
import QuestionForm from "./QuestionForm";
import { useSelector } from "react-redux";
import { Progress } from "antd";

const QuizContainer = () => {
  const { testContent, currentIndex } = useSelector(
    (rootReducer) => rootReducer.userReducer
  );
  return (
    <div className="QuizContainer">
      <h1>{testContent.global.name}</h1>
      <div className="QuizContainer-inner">
        <div className="progress-bar">
          <Progress
            percent={(currentIndex * 100) / testContent.questions.length}
            showInfo={false}
            steps={testContent.questions.length}
          />
        </div>
        <QuestionForm />
      </div>
    </div>
  );
};

export default QuizContainer;
