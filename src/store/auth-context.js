import React, { useEffect, useState } from "react";

export const Web_Api_Token = "AIzaSyDI8_A_mR_VmX_CxrZ6C1gib41GIrHOzrE";

let logoutTimer;
export const AuthProvider = React.createContext({
  token: "",
  isLogin: false,
  login: (token) => {},
  logout: () => {},
});

export const calculateValidationTime = (expireationTime) => {
  const currentTime = new Date().getTime();
  const expiretime = new Date(expireationTime).getTime();
  const remainingtime = expiretime - currentTime;
  return remainingtime;
};

const validTime = () => {
  const token = localStorage.getItem("token");
  const StoredTime = localStorage.getItem("expirationTime");
  const remainingTime = calculateValidationTime(StoredTime);
  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  } else {
    return {
      token: token,
      remainingTime: remainingTime,
    };
  }
};

export const StoreWrapper = (props) => {
  const data = validTime();
  let initialState;
  if (data) {
    initialState = data.token;
  }

  //   const idtoken = localStorage.getItem("token");
  const [token, setToken] = useState(initialState);
  const islogin = !!token;

  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiretime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const loginHandler = (token, expiretime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expiretime);
    const remainingtime = calculateValidationTime(expiretime);
    logoutTimer = setTimeout(logOutHandler, remainingtime);
  };

  useEffect(() => {
    if (data) {
      console.log(data.remainingTime);
      setTimeout(logOutHandler, data.remainingTime);
    }
  }, [data]);

  let contextValue = {
    token,
    islogin,
    logIn: loginHandler,
    logOut: logOutHandler,
  };

  return (
    <AuthProvider.Provider value={contextValue}>
      {props.children}
    </AuthProvider.Provider>
  );
};
