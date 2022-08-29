import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Login.scss";
import database from "../../database/database.json";
import axios from "../../database/mockApi";
import { Begintest } from "../../redux/reducers/userReducer";
import logo from "../../image/logo.jpg";
import { validateInput } from "../../Validator/validator";

const Login = () => {
  const history = useHistory();
  const state = useSelector((rootReducer) => rootReducer.userReducer);
  const [error, setError] = useState({
    lastname: { isValidInput: null, errorMessage: "" },
    firstname: { isValidInput: null, errorMessage: "" },
    contact: { isValidInput: null, errorMessage: "" },
  });
  const userValue = useRef({
    candidate: {
      time_start: 0,
      firstname: "",
      lastname: "",
      contact: "",
    },
  });
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        error.lastname.isValidInput &&
        error.firstname.isValidInput &&
        error.contact.isValidInput
      ) {
        const result = await axios.post("/api/v1/?id=1", userValue);
        console.log("payload1", userValue);
        dispatch(Begintest({ ...result.data, testData: userValue.current }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleValidInput = (checkingValue, type) => {
    let { isValidInput, errorMessage } = validateInput(checkingValue, type);
    setError({
      ...error,
      [type]: {
        errorMessage: errorMessage,
        isValidInput: isValidInput,
      },
    });
  };
  const handleBlur = ({ target }) => {
    let { value, name } = target;

    handleValidInput(value, name);
  };

  const handleChange = ({ target }) => {
    let { value, name } = target;
    userValue.current.candidate[name] = value;
  };

  useEffect(() => {
    if (state?.success === true) {
      history.push("/info");
    } else {
      let randomTest =
        database[Math.floor(Math.random() * database.length)].global;
      userValue.current = { ...userValue.current, global: randomTest };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.success]);
  return (
    <div className="container-login">
      <div className="login-header">
        <img className="login-logo" src={logo} alt="..." />
        <div className="login-header">
          <h1>Wellcome!</h1>
        </div>
      </div>
      <div className="login-content">
        <p className="login-message">Good luck with your test results! 😉</p>
        <form onSubmit={handleSubmit} className="form-group">
          <div className="name">
            <label>Last Name</label>
            <input
              autoComplete="off"
              name="lastname"
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
            />
            {error.lastname.errorMessage ? (
              <span className="error-message">
                {error.lastname.errorMessage}
              </span>
            ) : null}
          </div>

          <div className="first-name">
            <label>First Name</label>
            <input
              autoComplete="off"
              name="firstname"
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
            />
            {error.firstname.errorMessage ? (
              <span className="error-message">
                {error.firstname.errorMessage}
              </span>
            ) : null}
          </div>

          <div className="email">
            <label>Email Address</label>
            <input
              autoComplete="off"
              name="contact"
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
            />
            {error.contact.errorMessage ? (
              <span className="error-message">
                {error.contact.errorMessage}{" "}
              </span>
            ) : null}
          </div>

          <button type="submit">Get ready...?</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
