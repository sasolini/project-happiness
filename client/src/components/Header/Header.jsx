import React, { useContext } from "react";
import PropTypes from "prop-types";

import { UserContext } from "../../context/userContext";

import { ReactComponent as MenuBtn } from "./assets/menu.svg";
import { ReactComponent as SettingsBtn } from "./assets/settings-empty.svg";

import S from "./Header.module.scss";

const Header = ({ openMenu }) => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <header className={S.headerWrapper}>
      <div className={S.mainHeader}>
        {isLoggedIn && <MenuBtn onClick={openMenu} className={S.menuBtn} />}
        <h1 className={S.title}>Project Happiness</h1>
        {isLoggedIn && <SettingsBtn className={S.menuBtn} />}
      </div>
    </header>
  );
};

Header.propTypes = {
  openMenu: PropTypes.func.isRequired,
};

export default Header;
