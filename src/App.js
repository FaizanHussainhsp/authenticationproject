import React, { useContext } from "react";
import "./App.css";
import { SignIn } from "./Screen/SignIn";
import { SignUp } from "./Screen/SignUp";
import { Profile } from "./Screen/Profile";
import { Navbar } from "./Component/Navbar/Navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import { NotFound } from "./Screen/NotFound";
import { Wrapper } from "./Screen/Wrapper/Wrapper";
import { AuthProvider } from "./store/auth-context";
import { UserDetail } from "./Screen/UserDetail";

function App() {
  const AuthCtx = useContext(AuthProvider);
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Wrapper>
            <SignIn />
          </Wrapper>
        </Route>

        <Route path="/signin">
          {!AuthCtx.islogin && (
            <Wrapper>
              <SignIn />
            </Wrapper>
          )}
        </Route>

        <Route path="/userdetail">
          {AuthCtx.islogin && <UserDetail />}
          {!AuthCtx.islogin && <Redirect to="/signin" />}
        </Route>
        <Route path="/signup">
          {!AuthCtx.islogin && (
            <Wrapper>
              <SignUp />
            </Wrapper>
          )}
        </Route>
        <Route path="/profile">
          {AuthCtx.islogin && (
            <Wrapper>
              <Profile />
            </Wrapper>
          )}
          {!AuthCtx.islogin && <Redirect to="signin" />}
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
