import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./Pages/HomePage/HomePage";
import RegAndLoginPage from "./Pages/RegAndLoginPage/RegAndLoginPage";
import SingleDayPage from "./Pages/SingleDayPage/SingleDayPage";

import S from "./App.module.scss";

function App() {
  return (
    <Router>
      <div className={S.app}>
        <div className={S.container}>
          <Header />
          <Switch>
            <Route path="/single-day">
              <SingleDayPage />
            </Route>
            <Route path="/login">
              <RegAndLoginPage type="login" />
            </Route>
            <Route path="/register">
              <RegAndLoginPage type="register" />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
