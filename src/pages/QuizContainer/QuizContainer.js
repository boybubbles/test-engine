import React from "react";
import "./QuizContainer.scss";
import QuestionForm from "./QuestionForm";
import { useSelector } from "react-redux";
import { Progress } from "antd";
import logo from "../../image/logo.jpg";

const QuizContainer = () => {
  const { testContent, currentIndex } = useSelector(
    (rootReducer) => rootReducer.userReducer
  );
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
          <div className="QuizContainer-logo">
            <img src={logo} alt="..." />
          </div>
          <div className="QuizContainer-content">
            <div className="test-name">{`${testContent?.global.name} : ${testContent.questions[currentIndex]?.topic}`}</div>
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
        </div>
      )}
    </>
  );
};

export default QuizContainer;
