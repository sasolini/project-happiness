import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import CustomButton from "../../components/Custom-button/Custom-button";
import InputField from "../../components/Input-field/Input-field";

import S from "./RegAndLoginPage.module.scss";

const RegAndLoginPage = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const getAxiosUrl = () => {
    if (type === "register") {
      return "http://127.0.0.1:9000/users";
    } else if (type === "login") {
      return "http://127.0.0.1:9000/users/login";
    }
  };

  const getRegOrLoginBtn = () => {
    if (type === "register") {
      return (
        <CustomButton
          type="submit"
          styles={{ minWidth: "25rem", marginBottom: "0.75rem" }}
        >
          Register
        </CustomButton>
      );
    } else if (type === "login") {
      return (
        <CustomButton
          type="submit"
          styles={{ minWidth: "25rem", marginBottom: "0.75rem" }}
          inverted
        >
          Log in
        </CustomButton>
      );
    }
  };

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

    axios
      .post(getAxiosUrl(), {
        email,
        password,
      })
      .then(
        (response) => {
          console.log(response.data);
          if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          history.push("/single-day");
        },
        (error) => {
          alert("Email and password do not match!");
        }
      );
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
        {getRegOrLoginBtn()}
      </form>
    </main>
  );
};

export default RegAndLoginPage;
