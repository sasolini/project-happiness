import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import authHeader from "./services/auth-header";
import { getUsersProfileAsync } from "./AppAPI";
import { UserContext } from "./context/userContext";
import SideDrawer from "./components/Side-drawer/Side-drawer";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./Pages/HomePage/HomePage";
import RegAndLoginPage from "./Pages/RegAndLoginPage/RegAndLoginPage";
import SingleDayPage from "./Pages/SingleDayPage/SingleDayPage";

import S from "./App.module.scss";

const App = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (authHeader()) {
      getUsersProfileAsync().then((res) => {
        if (!res) logoutHandler();
      });
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
                {isLoggedIn ? (
                  <Redirect to="/single-day" />
                ) : (
                  <RegAndLoginPage isRegister={true} />
                )}
              </Route>
              <Route path="/login">
                {isLoggedIn ? (
                  <Redirect to="/single-day" />
                ) : (
                  <RegAndLoginPage isRegister={false} />
                )}
              </Route>
              <Route path="/single-day">
                {!isLoggedIn ? <Redirect to="/" /> : <SingleDayPage />}
              </Route>
              <Route path="/">
                {isLoggedIn ? <Redirect to="/single-day" /> : <HomePage />}
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
