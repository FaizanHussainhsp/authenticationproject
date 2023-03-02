import React, { useRef, useContext } from "react";
import {
  AuthProvider,
  calculateValidationTime,
  Web_Api_Token,
} from "../../store/auth-context";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import classes from "./Form.module.css";
import { useHistory } from "react-router-dom";

let url;
export const Form = (props) => {
  const history = useHistory();
  const AuthCtx = useContext(AuthProvider);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const onFormSubmit = (event) => {
    event.preventDefault();

    const Valid =
      emailInputRef.current.current.value &&
      passwordInputRef.current.current.value;
    if (!Valid) return;

    if (props.requestType === "signup") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${Web_Api_Token}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${Web_Api_Token}`;
    }

    const Register = async () => {
      try {
        const rs = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: emailInputRef.current.current.value,
            password: passwordInputRef.current.current.value,
            returnSecureToken: true,
          }),
        });
        if (rs.ok) {
          const data = await rs.json();

          if (props.requestType === "signup") {
            history.replace("/signin");
          } else {
            const tokenValidationTime = data.expiresIn;
            const ExactTimeStampValidToken = new Date(
              new Date().getTime() + tokenValidationTime * 1000
            );

            history.replace("/profile");
            AuthCtx.logIn(data.idToken, ExactTimeStampValidToken.toISOString());
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    Register();
  };

  return (
    <form className={classes.form} onSubmit={onFormSubmit}>
      <Input type={props.email} placeholder="email" ref={emailInputRef} />
      <Input
        type={props.password}
        placeholder="password"
        ref={passwordInputRef}
      />
      <Button type="submit">{props.btntext}</Button>
    </form>
  );
};
