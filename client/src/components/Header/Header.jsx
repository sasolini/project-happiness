import React from "react";

import { ReactComponent as MenuBtn } from "./assets/menu.svg";
import { ReactComponent as SettingsBtn } from "./assets/settings-empty.svg";

import S from "./Header.module.scss";

const Header = () => (
  <header className={S.headerWrapper}>
    <div className={S.mainHeader}>
      <MenuBtn className={S.menuBtn} />
      <h1 className={S.title}>Project Happiness</h1>
      <SettingsBtn className={S.menuBtn} />
    </div>
  </header>
);

export default Header;
