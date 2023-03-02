import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../Component/button/Button";
import { Input } from "../Component/input/Input";
import { AuthProvider, Web_Api_Token } from "../store/auth-context";
import classess from "./Profile.module.css";

export const Profile = () => {
  const history = useHistory();
  const AuthCtx = useContext(AuthProvider);
  const token = AuthCtx.token;

  const profilInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(profilInputRef.current.current.value);

    const sendRequest = async () => {
      try {
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${Web_Api_Token}`,
          {
            method: "POST",
            body: JSON.stringify({
              idToken: token,
              password: profilInputRef.current.current.value,
              returnSecureToken: true,
            }),
          }
        );
        if (res.ok) {
          alert("password rest");
          history.replace("/userdetail");
        }
      } catch (error) {
        console.log(error);
      }
    };

    sendRequest();
  };
  return (
    <div className={classess.profile}>
      <form onSubmit={submitHandler}>
        <Input type="password" placeholder="password" ref={profilInputRef} />
        <Button type="submit">Change Password</Button>
      </form>
    </div>
  );
};
