import axios from "axios";
import authHeader from "../../services/auth-header";

export const logOutAsync = async (option) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:9000/users/${option.toLowerCase()}`,

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
