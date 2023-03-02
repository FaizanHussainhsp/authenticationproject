import React, { useImperativeHandle, useRef } from "react";
import classes from "./Input.module.css";
export const Input = React.forwardRef((props, ref) => {
  const inputref = useRef();

  useImperativeHandle(ref, () => {
    return inputref;
  });

  return (
    <input
      className={classes.input}
      type={props.type ? props.type : "text"}
      placeholder={props.placeholder}
      ref={inputref}
    />
  );
});
