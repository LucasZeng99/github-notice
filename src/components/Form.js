import React from "react";

const Form = props => {
  return (
    <form className="form" onSubmit={props.submitFunction}>
      <div className="form-group">
        <input
          className="input"
          type="text"
          placeholder={props.msg}
          name="name"
          onMouseEnter={props.outInput}
          onMouseLeave={props.onInput}
          autoFocus={true}
        />
      </div>
    </form>
  );
};

export default Form;
