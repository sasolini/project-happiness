import axios from "axios";
import authHeader from "./services/auth-header";

export const getUsersProfileAsync = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}users/me`, {
      headers: authHeader(),
    });
    if (res) {
      return res;
    } else {
      return null;
    }
  } catch (e) {
    // console.log("ERR: ", e);
  }
};
