import React from "react";

import { ReactComponent as LeftArrow } from "./assets/left-arrow.svg";
import { ReactComponent as RightArrow } from "./assets/right-arrow.svg";

import S from "./Single-date-nav.module.scss";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  day: "numeric",
  month: "short",
};

const SingleDateNav = ({ currentDate, clicked }) => {
  return (
    <div className={S.singleDateNav}>
      <div onClick={() => clicked(-1)} className={S.arrow}>
        <LeftArrow />
      </div>
      <p className={S.date}>
        {currentDate.toLocaleDateString("en-GB", dateOptions)}
      </p>
      <div onClick={() => clicked(1)} className={S.arrow}>
        <RightArrow />
      </div>
    </div>
  );
};

export default SingleDateNav;
