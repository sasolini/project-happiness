import React, { useContext, useEffect, useState } from "react";

import { getDbDataAsync } from "./SingleDayPage/SingleDayAPI";
import { UserContext } from "../context/userContext";

const TestPage = () => {
  const user = useContext(UserContext);

  const [currentDate, setCurrentDate] = useState(
    new Date(new Date().toDateString())
  );
  const [dbData, setDbData] = useState({});

  useEffect(() => {
    getDbDataAsync(currentDate).then((data) => console.log(data));
  }, []);

  return (
    <>
      {/* <p>{dbData}</p> */}
      {/* <button onClick={user.applyToken("has token")}>
        Switch Language (Current: {user.authToken})
      </button> */}
    </>
  );
};

export default TestPage;
