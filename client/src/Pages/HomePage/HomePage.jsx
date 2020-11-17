import React from "react";
import { Link } from "react-router-dom";

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
      <Link to="/register">
        <CustomButton
          styles={{
            minWidth: "25rem",
          }}
        >
          Register
        </CustomButton>
      </Link>
      <Link to="/login">
        <CustomButton
          styles={{
            minWidth: "25rem",
          }}
          inverted
        >
          Log in
        </CustomButton>
      </Link>
    </div>
  </main>
);

export default Header;
