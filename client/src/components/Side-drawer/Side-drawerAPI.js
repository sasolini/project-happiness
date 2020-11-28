import axios from "axios";
import authHeader from "../../services/auth-header";

export const logOutAsync = async (option) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}users/${option.toLowerCase()}`,

      {},
      {
        headers: authHeader(),
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const deleteUserAsync = async () => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}users/me`,
      {
        headers: authHeader(),
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
