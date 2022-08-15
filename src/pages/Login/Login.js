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
    lastname: { isValidInput: true, errorMessage: "" },
    firstname: { isValidInput: true, errorMessage: "" },
    contact: { isValidInput: true, errorMessage: "" },
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
  }, [state?.success]);
  return (
    <div className="container">
      <h1>Wellcome!</h1>
      <p>Good luck with your test results! :v</p>
      <img src={logo} alt="..." />
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
        </div>

        {error.lastname.errorMessage ? (
          <span>{error.lastname.errorMessage}</span>
        ) : null}

        <div className="first-name">
          <label>First Name</label>
          <input
            autoComplete="off"
            name="firstname"
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
          />
        </div>

        {error.firstname.errorMessage ? (
          <span>{error.firstname.errorMessage} </span>
        ) : null}

        <div className="email">
          <label>Email Address</label>
          <input
            autoComplete="off"
            name="contact"
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
          />
        </div>
        {error.contact.errorMessage ? (
          <span>{error.contact.errorMessage} </span>
        ) : null}
        <button type="submit">Start the Test</button>
      </form>
    </div>
  );
};

export default Login;
