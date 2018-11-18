import React from "react";

const Form = props => {
  return (
    <form onSubmit={props.submitFunction}>
      <div className="form-group">
        <input
          className="input"
          type="text"
          placeholder={props.msg}
          name="name"
        />
      </div>
    </form>
  );
};

export default Form;
