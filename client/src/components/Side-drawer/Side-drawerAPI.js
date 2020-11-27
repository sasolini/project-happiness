import axios from "axios";
import authHeader from "../../services/auth-header";

export const logOutAsync = async (option) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/${option.toLowerCase()}`,

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
