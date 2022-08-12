import React from "react";
import database from "../../database/database.json";
const Thankyou = () => {
  let { messages } = database;
  const userData = JSON.parse(localStorage.getItem("user_info"));

  console.log(userData);
  //send data to server

  const handleChange = ({ target }) => {
    let { value } = target;
  };
  return (
    <div className="container">
      <h1>Thankyou, {userData.candidate.firstname}</h1>
      <h3>{messages.thankyou}</h3>
      <div>
        <textarea
          cols="30"
          rows="10"
          placeholder={messages.feedback}
          onChange={handleChange}
        ></textarea>
      </div>
      <button>Submit</button>
    </div>
  );
};

export default Thankyou;
