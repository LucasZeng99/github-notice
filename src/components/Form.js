import React from "react";

const Form = props => {
  return (
    <form className="form" onSubmit={props.checkAndSave}>
      <input type="text" placeholder="Enter name" name="name" />
      <button>Submit</button>
    </form>
  );
};

export default Form;
