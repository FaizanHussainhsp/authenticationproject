import React from "react";
import { Form } from "../Component/form/Form";

export const SignUp = () => {
  return (
    <div>
      <Form
        email="email"
        password="password"
        btntext="signup"
        requestType="signup"
      />
    </div>
  );
};
