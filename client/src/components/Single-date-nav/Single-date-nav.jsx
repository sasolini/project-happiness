import React from "react";
import PropTypes from "prop-types";

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
  const today = new Date(new Date().toDateString());
  const isPast = currentDate.getTime() < today.getTime();

  return (
    <div className={S.singleDateNav}>
      <div onClick={() => clicked(-1)} className={S.arrow}>
        <LeftArrow />
      </div>
      <p className={S.date}>
        {currentDate.toLocaleDateString("en-GB", dateOptions)}
      </p>

      <div
        onClick={() => clicked(1)}
        className={S.arrow}
        style={{ visibility: isPast ? "visible" : "hidden" }}
      >
        <RightArrow />
      </div>
    </div>
  );
};

SingleDateNav.propTypes = {
  currentDate: PropTypes.object.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default SingleDateNav;
