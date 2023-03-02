import React from "react";
import classes from "./button.module.css";

export const Button = (props) => {
  return (
    <button className={classes.btn} type={props.type ? props.type : "button"}>
      {props.children}
    </button>
  );
};
