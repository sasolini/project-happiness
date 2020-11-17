import React from "react";
import { Link } from "react-router-dom";

import CustomButton from "../../components/Custom-button/Custom-button";
import InputField from "../../components/Input-field/Input-field";

import S from "./RegAndLoginPage.module.scss";

const RegAndLoginPage = ({ type }) => {
  const getRegOrLoginBtn = () => {
    if (type === "register") {
      return (
        <Link to="/single-day">
          <CustomButton styles={{ minWidth: "25rem", marginBottom: "0.75rem" }}>
            Register
          </CustomButton>
        </Link>
      );
    } else if (type === "login") {
      return (
        <Link to="/single-day">
          <CustomButton
            styles={{ minWidth: "25rem", marginBottom: "0.75rem" }}
            inverted
          >
            Log in
          </CustomButton>
        </Link>
      );
    }
  };

  return (
    <main className={S.container}>
      <div className={S.quote}>
        <h2>“Humans see what they want to see.”</h2>
        <span>― Rick Riordan, The Lightning Thief</span>
      </div>
      <div>
        <InputField
          fieldType="input"
          label="Email"
          type="email"
          name="mail"
          placeholder="email@email.com"
        />
        <InputField
          fieldType="input"
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
        />
        {getRegOrLoginBtn()}
      </div>
    </main>
  );
};

export default RegAndLoginPage;
