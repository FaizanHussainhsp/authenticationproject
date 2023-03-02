import React, { useContext } from "react";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { AuthProvider } from "../../store/auth-context";

export const Navbar = () => {
  const AuthCtx = useContext(AuthProvider);
  return (
    <div className={classes.navbar}>
      <ul className={classes.navWrapper}>
        {!AuthCtx.islogin && (
          <li>
            <NavLink activeClassName={classes.navActive} to="/signup">
              signup
            </NavLink>
          </li>
        )}

        {!AuthCtx.islogin && (
          <li>
            <NavLink activeClassName={classes.navActive} to="/signin">
              signIn
            </NavLink>
          </li>
        )}

        {AuthCtx.islogin && (
          <li>
            <NavLink activeClassName={classes.navActive} to="/userdetail">
              Detail
            </NavLink>
          </li>
        )}

        {AuthCtx.islogin && (
          <li>
            <NavLink activeClassName={classes.navActive} to="/profile">
              Profile
            </NavLink>
          </li>
        )}
        {AuthCtx.islogin && (
          <li>
            <NavLink
              activeClassName={classes.navActive}
              to="/signin"
              onClick={() => AuthCtx.logOut()}
            >
              logout
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};
