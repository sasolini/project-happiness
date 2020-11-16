import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as EmptyStar } from "./assets/star-empty.svg";
import { ReactComponent as FullStar } from "./assets/star-gold.svg";

import S from "./Stars.module.scss";

const Stars = ({ rating }) => {
  const fullStars = rating[0];
  const emptyStars = rating[1] - fullStars;
  const stars = [];

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<EmptyStar key={`es${i}`} className={S.star} />);
  }

  if (fullStars > 0) {
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FullStar key={`fs${i}`} className={S.star} />);
    }
  }

  return <div className={S.wrapper}>{stars}</div>;
};

Stars.propTypes = {
  rating: PropTypes.array.isRequired,
};

export default Stars;
