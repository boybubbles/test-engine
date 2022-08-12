import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BeginAction } from "../../redux/actions/userAction";
import "./Login.scss";

const Login = () => {
  const history = useHistory();
  const state = useSelector((rootReducer) => rootReducer.userReducer);
  const [userValue, setUserValue] = useState({
    global: {
      test_id: 1,
      name: "test name 1",
      timeout: 3000,
      randomize: true,
    },
    candidate: {
      time_start: Date.now(),
      firstname: "Sven",
      lastname: "Gusek",
      contact: "sven.gusek@dision.tech",
    },
  });
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(BeginAction(userValue));
  };
  const handleChange = ({ target }) => {
    let { value, name } = target;
    setUserValue((userValue) => {
      userValue.candidate[name] = value;
      return { ...userValue };
    });
    console.log(userValue);
  };
  useEffect(() => {
    if (state?.success === true) {
      history.push("/info");
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
