import React from "react";
import classes from "./Wrapper.module.css";
export const Wrapper = (props) => {
  return <div className={classes.wrapper}>{props.children}</div>;
};
