import React, { useEffect } from "react";
import "./QuizContainer.scss";
import QuestionForm from "./QuestionForm";
import { useSelector } from "react-redux";
import { Progress } from "antd";
import { useHistory } from "react-router-dom";

const QuizContainer = () => {
  const { testContent, currentIndex } = useSelector(
    (rootReducer) => rootReducer.userReducer
  );
  const history = useHistory();
  // useEffect(() => {
  //   const unblock = history.block((location) => {
  //     window.confirm("Your test will be lost");
  //   });
  //   return () => {
  //     unblock();
  //   };
  // }, [currentIndex]);
  return (
    <>
      {!testContent?.global && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <a href="/">Back to home page</a>
        </div>
      )}
      {testContent?.global && (
        <div className="QuizContainer">
          <h1>{`${testContent?.global.name} : ${testContent.questions[currentIndex].topic}`}</h1>
          <div className="QuizContainer-inner">
            <div className="progress-bar">
              <Progress
                percent={(currentIndex * 100) / testContent?.questions.length}
                showInfo={false}
                steps={testContent?.questions.length}
              />
            </div>
            <QuestionForm />
          </div>
        </div>
      )}
    </>
  );
};

export default QuizContainer;
