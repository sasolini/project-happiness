import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import authHeader from "./services/auth-header";
import { UserContext } from "./context/userContext";
import SideDrawer from "./components/Side-drawer/Side-drawer";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./Pages/HomePage/HomePage";
import RegAndLoginPage from "./Pages/RegAndLoginPage/RegAndLoginPage";
import SingleDayPage from "./Pages/SingleDayPage/SingleDayPage";

import S from "./App.module.scss";

const App = () => {
  const [authToken, setAuthToken] = useState(authHeader().Authorization);
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setAuthToken(null);
  };

  return (
    <Router>
      <UserContext.Provider value={{ authToken, setAuthToken }}>
        <div className={S.app}>
          {showSideDrawer && (
            <SideDrawer
              close={() => setShowSideDrawer(false)}
              logout={logoutHandler}
            />
          )}
          <div className={S.container}>
            <Header openMenu={() => setShowSideDrawer(true)} />
            <Switch>
              <Route path="/register">
                {authToken ? (
                  <Redirect to="/single-day" />
                ) : (
                  <RegAndLoginPage type="register" />
                )}
              </Route>
              <Route path="/login">
                {authToken ? (
                  <Redirect to="/single-day" />
                ) : (
                  <RegAndLoginPage type="login" />
                )}
              </Route>
              <Route path="/single-day">
                {!authToken ? <Redirect to="/" /> : <SingleDayPage />}
              </Route>
              <Route path="/">
                {authToken ? <Redirect to="/single-day" /> : <HomePage />}
              </Route>
            </Switch>
            <Footer />
          </div>
        </div>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
