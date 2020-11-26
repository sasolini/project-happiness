import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as MenuBtn } from "./assets/menu.svg";
import { ReactComponent as SettingsBtn } from "./assets/settings-empty.svg";

import S from "./Header.module.scss";

const Header = ({ openMenu }) => (
  <header className={S.headerWrapper}>
    <div className={S.mainHeader}>
      <MenuBtn onClick={openMenu} className={S.menuBtn} />
      <h1 className={S.title}>Project Happiness</h1>
      <SettingsBtn className={S.menuBtn} />
    </div>
  </header>
);

Header.propTypes = {
  openMenu: PropTypes.func.isRequired,
};

export default Header;
