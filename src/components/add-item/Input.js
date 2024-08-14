import React from 'react';

export function Input(props) {
  return props.inputType === 'hidden' ? (
    <div className="hide">
      <label htmlFor={props.value}></label>
      <input type={props.inputType} value={props.value} />
    </div>
  ) : (
    <div className="flex flex-column">
      <label htmlFor={props.value} className="center">
        {props.field}:
      </label>
      <input
        className="center"
        type={props.inputType}
        value={props.value}
        onChange={props.onChange}
        required={true}
      />
    </div>
  );
}
