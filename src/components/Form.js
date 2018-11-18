import React from "react";

const Form = props => {
  return (
    <form onSubmit={props.checkAndSave}>
      <div className="form-group">
        <input
          className="input"
          type="text"
          placeholder="Enter name"
          name="name"
        />
      </div>
    </form>
  );
};

export default Form;
