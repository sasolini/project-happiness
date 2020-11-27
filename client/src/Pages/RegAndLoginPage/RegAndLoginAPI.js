import axios from "axios";
import PropTypes from "prop-types";

export const sendRegOrLoginAsync = async (isRegister, email, password) => {
  let requestType = "";
  isRegister ? (requestType = "users") : (requestType = "users/login");

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}${requestType}`,
      {
        email,
        password,
      }
    );

    if (res.data.token) {
      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data.token;
    }
  } catch (error) {
    alert("Email and password do not match!");
  }
};

sendRegOrLoginAsync.propTypes = {
  isRegister: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
