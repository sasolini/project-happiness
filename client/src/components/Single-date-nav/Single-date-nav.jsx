import React, { useState, useEffect } from "react";

import { ReactComponent as LeftArrow } from "./assets/left-arrow.svg";
import { ReactComponent as RightArrow } from "./assets/right-arrow.svg";

import S from "./Single-date-nav.module.scss";

const formatDate = (date) => {
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    day: "numeric",
    month: "long",
  };
  return date.toLocaleDateString("en-UK", dateOptions);
};

const SingleDateNav = () => {
  const [currentDay, setCurrentDay] = useState(new Date());

  const clickEventHandler = (direction) => {
    const newDay = currentDay;
    newDay.setDate(currentDay.getDate() + direction);
    setCurrentDay(newDay);
  };

  return (
    <div className={S.singleDateNav}>
      <div onClick={() => clickEventHandler(-1)} className={S.arrow}>
        <LeftArrow />
      </div>
      {/* <p className={S.date}>{Date(currentDay)}</p> */}
      <p className={S.date}>{currentDay.toDateString()}</p>
      <div onClick={() => clickEventHandler(1)} className={S.arrow}>
        <RightArrow />
      </div>
    </div>
  );
};

export default SingleDateNav;
