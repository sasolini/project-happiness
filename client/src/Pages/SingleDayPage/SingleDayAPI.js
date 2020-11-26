import axios from "axios";
import authHeader from "../../services/auth-header";

export const getDbDataAsync = async (currentDate) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:9000/diaries?created=${currentDate.toISOString()}`,
      {
        headers: authHeader(),
      }
    );
    if (res.data[0]) {
      return res.data[0];
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
};

export const postDiaryToDbAsync = async (currentState) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:9000/diaries",

      currentState,
      {
        headers: authHeader(),
      }
    );

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const updateDiaryInDbAsync = async (diaryId, data) => {
  delete data.created;

  try {
    const response = await axios.patch(
      `http://127.0.0.1:9000/diaries/${diaryId}`,

      data,
      {
        headers: authHeader(),
      }
    );

    return response.data;
  } catch (e) {
    console.log(e);
  }
};
