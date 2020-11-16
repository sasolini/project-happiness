import React from "react";
import PropTypes from "prop-types";

import Stars from "../Stars/Stars";

import S from "./Section-wrapper.module.scss";

const SectionWrapper = ({ title, stars, children }) => (
  <section className={S.wrapper}>
    <div className={S.header}>
      <h3 className={S.title}>{title}</h3>
      <Stars rating={stars} />
    </div>
    {children}
  </section>
);

SectionWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default SectionWrapper;
