import React from "react";
import { Form } from "../Component/form/Form";

export const SignIn = () => {
  return (
    <div>
      <Form
        email="email"
        password="password"
        btntext="signin"
        requestType="signin"
      />
    </div>
  );
};
