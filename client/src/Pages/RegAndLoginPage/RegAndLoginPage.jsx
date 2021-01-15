import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import { UserContext } from "../../context/userContext";
import CustomButton from "../../components/Custom-button/Custom-button";
import InputField from "../../components/Input-field/Input-field";
import { sendRegOrLoginAsync } from "./RegAndLoginAPI";

import S from "./RegAndLoginPage.module.scss";

const RegAndLoginPage = ({ isRegister }) => {
  const { setIsLoggedIn } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    switch (e.target.name) {
      case "mail":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendRegOrLoginAsync(isRegister, email, password).then((res) => {
      setIsLoggedIn(res);
    });
  };

  return (
    <main className={S.container}>
      <div className={S.quote}>
        <h2>“Humans see what they want to see.”</h2>
        <span>― Rick Riordan, The Lightning Thief</span>
      </div>
      <form onSubmit={handleSubmit}>
        <InputField
          fieldType="input"
          label="Email"
          type="email"
          name="mail"
          placeholder="email@email.com"
          value={email}
          changed={handleChange}
        />
        <InputField
          fieldType="input"
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          changed={handleChange}
        />
        <CustomButton
          type="submit"
          styles={{ minWidth: "25rem", marginBottom: "0.75rem" }}
          inverted={isRegister ? false : true}
        >
          {isRegister ? "Register" : "Login"}
        </CustomButton>
      </form>
    </main>
  );
};

RegAndLoginPage.propTypes = {
  isRegister: PropTypes.bool.isRequired,
};

export default RegAndLoginPage;
