import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Login.scss";
import database from "../../database/database.json";
import axios from "../../database/mockApi";
import { Begintest } from "../../redux/reducers/userReducer";
const Login = () => {
  console.log("login-render");
  const history = useHistory();
  const state = useSelector((rootReducer) => rootReducer.userReducer);

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

      console.log("dispatchUserValue");
      const result = await axios.post("/api/v1/?id=1", userValue);
      dispatch(Begintest({ ...result.data, testData: userValue.current }));
    } catch (error) {
      console.log(error);
    }
  };
  console.log("userValue", userValue.current);
  const handleChange = ({ target }) => {
    let { value, name } = target;
    userValue.current.candidate[name] = value;

    console.log(
      "userValue.current out side useEffect",
      userValue.current.candidate
    );
  };

  useEffect(() => {
    if (state?.success === true) {
      console.log("successDispatch");
      history.push("/info");
    } else {
      let randomTest =
        database[Math.floor(Math.random() * database.length)].global;
      userValue.current = { ...userValue.current, global: randomTest };
      console.log("userValue.current", userValue.current);
    }
  }, [state?.success]);
  return (
    <div className="container">
      <h1>Wellcome!</h1>
      <p>Good luck with your test results! :v</p>
      <h3>Dision tech</h3>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="name">
          <label>Last Name</label>
          <input name="lastname" onChange={handleChange} type="text" />
        </div>
        <div className="first-name">
          <label>First Name</label>
          <input name="firstname" onChange={handleChange} type="text" />
        </div>
        <div className="email">
          <label>Email Address</label>
          <input name="contact" onChange={handleChange} type="email" />
        </div>
        <button type="submit">Start the Test</button>
      </form>
    </div>
  );
};

export default Login;
