import React from "react";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./Pages/HomePage/HomePage";
import SingleDayPage from "./Pages/SingleDayPage/SingleDayPage";

import S from "./App.module.scss";

function App() {
  return (
    <div className={S.app}>
      <div className={S.container}>
        <Header />
        {/* <HomePage /> */}
        <SingleDayPage />
        <Footer />
      </div>
    </div>
  );
}

export default App;
