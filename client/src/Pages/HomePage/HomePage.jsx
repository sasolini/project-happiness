import React from "react";

import CustomButton from "../../components/Custom-button/Custom-button";

import { ReactComponent as Logo } from "./assets/smiling-emoticon-square-face.svg";

import S from "./HomePage.module.scss";

const Header = () => (
  <main className={S.container}>
    <div className={S.logoWrapper}>
      <Logo className={S.logo} />
    </div>
    <h1 className={S.title}>
      Project <span>Happiness</span>
    </h1>
    <div>
      <CustomButton
        styles={{ minWidth: "25rem", marginBottom: "var(--size-xxs)" }}
      >
        Register
      </CustomButton>
      <CustomButton
        styles={{ minWidth: "25rem", marginBottom: "0.75rem" }}
        inverted
      >
        Log in
      </CustomButton>
    </div>
  </main>
);

export default Header;
