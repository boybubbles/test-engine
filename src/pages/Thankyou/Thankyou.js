import React from "react";
import { useSelector } from "react-redux";
const Thankyou = () => {
  const firstname = JSON.parse(localStorage.getItem("user_info")).candidate
    .firstname;
  const { testContent } = useSelector((rootReducer) => rootReducer.userReducer);
  //send data to server

  const handleChange = ({ target }) => {
    let { value } = target;
  };
  return (
    <div className="container">
      <h1>Thankyou, {firstname}</h1>
      <h3>{testContent.messages.thankyou}</h3>
      <div>
        <textarea
          cols="30"
          rows="10"
          placeholder={testContent.messages.feedback}
          onChange={handleChange}
        ></textarea>
      </div>
      <button>Submit</button>
    </div>
  );
};

export default Thankyou;
