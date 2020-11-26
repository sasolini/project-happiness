import React, { useState, useContext } from "react";
import axios from "axios";

import { UserContext } from "../../context/userContext";
import CustomButton from "../../components/Custom-button/Custom-button";
import InputField from "../../components/Input-field/Input-field";

import S from "./RegAndLoginPage.module.scss";

const RegAndLoginPage = ({ type }) => {
  const { setAuthToken } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getAxiosUrl = () => {
    if (type === "register") {
      return "http://127.0.0.1:9000/users";
    } else if (type === "login") {
      return "http://127.0.0.1:9000/users/login";
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
    const sendPostData = async () => {
      try {
        const res = await axios.post(getAxiosUrl(), {
          email,
          password,
        });

        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
          setAuthToken(res.data.token);
        }
      } catch (error) {
        console.log("Email and password do not match!", error);
      }
    };

    sendPostData();
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
          inverted={type === "register" ? false : true}
        >
          {type === "register" ? "Register" : "Login"}
        </CustomButton>
      </form>
    </main>
  );
};

export default RegAndLoginPage;
