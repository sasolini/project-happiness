import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import authHeader from "../../services/auth-header";

import SingleDateNav from "../../components/Single-date-nav/Single-date-nav";
import InputField from "../../components/Input-field/Input-field";
import ActivityButton from "../../components/Activity-button/Activity-button";
import SectionWrapper from "../../components/Section-wrapper/Section-wrapper";
import CustomButton from "../../components/Custom-button/Custom-button";

import { ReactComponent as ExerciseIcon } from "../../assets/exercise.svg";
import { ReactComponent as MeditationIcon } from "../../assets/meditation-m.svg";

import S from "./SingleDayPage.module.scss";

const SingleDayPage = () => {
  const [currentDate, setCurrentDate] = useState(
    new Date(new Date().toDateString())
  );

  const initialState = {
    workout: false,
    meditation: false,
    gratitude1: "",
    gratitude2: "",
    gratitude3: "",
    memory: "",
    kindness: "",
  };

  const [workout, setWorkout] = useState(false);
  const [meditation, setMeditation] = useState(false);
  const [gratitude1, setGratitude1] = useState("");
  const [gratitude2, setGratitude2] = useState("");
  const [gratitude3, setGratitude3] = useState("");
  const [memoryOfTheDay, setMemoryOfTheDay] = useState("");
  const [actOfKindness, setActOfKindness] = useState("");
  const [dbData, setDbData] = useState(initialState);
  const [hasChanges, setHasChanges] = useState(false);

  const inputForm = document.getElementsByTagName("form")[0];

  const checkForChanges = useCallback(() => {
    if (
      dbData.workout !== workout ||
      dbData.meditation !== meditation ||
      dbData.gratitude1 !== gratitude1 ||
      dbData.gratitude2 !== gratitude2 ||
      dbData.gratitude3 !== gratitude3 ||
      dbData.memory !== memoryOfTheDay ||
      dbData.kindness !== actOfKindness
    ) {
      return true;
    } else {
      return false;
    }
  }, [
    dbData,
    workout,
    meditation,
    gratitude1,
    gratitude2,
    gratitude3,
    memoryOfTheDay,
    actOfKindness,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:9000/diaries?created=${currentDate.toISOString()}`,
          {
            headers: authHeader(),
          }
        );
        const diary = res.data[0];
        if (diary) {
          setDbData(diary);
          setWorkout(diary.workout);
          setMeditation(diary.meditation);
          setGratitude1(diary.gratitude1);
          setGratitude2(diary.gratitude2);
          setGratitude3(diary.gratitude3);
          setMemoryOfTheDay(diary.memory);
          setActOfKindness(diary.kindness);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
    console.log("useEffect");
  }, [currentDate]);

  const setInitialState = () => {
    setWorkout(initialState.workout);
    setMeditation(initialState.meditation);
    setGratitude1(initialState.gratitude1);
    setGratitude2(initialState.gratitude2);
    setGratitude3(initialState.gratitude3);
    setMemoryOfTheDay(initialState.memory);
    setActOfKindness(initialState.kindness);
  };

  const resetToDbData = () => {
    inputForm.reset();
    setWorkout(dbData.workout);
    setMeditation(dbData.meditation);
    setGratitude1(dbData.gratitude1);
    setGratitude2(dbData.gratitude2);
    setGratitude3(dbData.gratitude3);
    setMemoryOfTheDay(dbData.memory);
    setActOfKindness(dbData.kindness);
  };

  useEffect(() => {
    setHasChanges(checkForChanges());
  }, [hasChanges, checkForChanges]);

  const getGratitudeStars = () => {
    let stars = 0;
    if (gratitude1.length) stars += 1;
    if (gratitude2.length) stars += 1;
    if (gratitude3.length) stars += 1;
    return stars;
  };

  const memoryOfTheDayStar = () => {
    return memoryOfTheDay.length > 0 ? 1 : 0;
  };

  const actOfKindnessStar = () => {
    return actOfKindness.length > 0 ? 1 : 0;
  };

  const activitiesClickHandler = (activity) => {
    if (activity === "exercise") setWorkout(!workout);
    if (activity === "meditation") setMeditation(!meditation);
  };

  const dateClickHandler = (step) => {
    const newDate = new Date(currentDate);

    if (checkForChanges()) {
      alert("Please save the changes");
      return;
    }

    setDbData(initialState);
    setInitialState();
    inputForm.reset();

    newDate.setDate(newDate.getDate() + step);
    setCurrentDate(newDate);
  };

  const changeHandler = (e) => {
    const val = e.target.value;

    switch (e.target.name) {
      case "g1":
        setGratitude1(val);
        break;
      case "g2":
        setGratitude2(val);
        break;
      case "g3":
        setGratitude3(val);
        break;
      case "hmod":
        setMemoryOfTheDay(val);
        break;
      case "aok":
        setActOfKindness(val);
        break;
      default:
        break;
    }
  };

  const getCurrentState = () => {
    return {
      created: currentDate.toDateString(),
      workout,
      meditation,
      gratitude1,
      gratitude2,
      gratitude3,
      memory: memoryOfTheDay,
      kindness: actOfKindness,
    };
  };

  const postUserData = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:9000/diaries",

        getCurrentState(),
        {
          headers: authHeader(),
        }
      );

      setDbData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const updateUserData = async (id) => {
    const data = getCurrentState();
    delete data.created;

    try {
      const response = await axios.patch(
        `http://127.0.0.1:9000/diaries/${id}`,

        data,
        {
          headers: authHeader(),
        }
      );

      setDbData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dbData._id) {
      updateUserData(dbData._id);
    } else {
      postUserData();
    }
  };

  return (
    <main className={S.container}>
      <SingleDateNav
        clicked={dateClickHandler}
        currentDate={currentDate}
        className={S.dateNav}
      />
      <form onSubmit={handleSubmit}>
        <section className={S.activities}>
          <ActivityButton
            clicked={activitiesClickHandler}
            size="5"
            done={workout}
            name="exercise"
          >
            <ExerciseIcon />
          </ActivityButton>
          <ActivityButton
            clicked={activitiesClickHandler}
            size="5"
            done={meditation}
            name="meditation"
          >
            <MeditationIcon />
          </ActivityButton>
        </section>
        <SectionWrapper title="Gratitude" stars={[getGratitudeStars(), 3]}>
          <InputField
            changed={changeHandler}
            value={gratitude1}
            fieldType="textArea"
            name="g1"
            placeholder="Gratitude one"
          />
          <InputField
            changed={changeHandler}
            value={gratitude2}
            fieldType="textArea"
            name="g2"
            placeholder="Gratitude two"
          />
          <InputField
            changed={changeHandler}
            value={gratitude3}
            fieldType="textArea"
            name="g3"
            placeholder="Gratitude three"
          />
        </SectionWrapper>
        <SectionWrapper
          title="Memory of the day"
          stars={[memoryOfTheDayStar(), 1]}
        >
          <InputField
            changed={changeHandler}
            value={memoryOfTheDay}
            fieldType="textArea"
            rows="8"
            name="hmod"
            placeholder="Happy memory of the day"
          />
        </SectionWrapper>
        <SectionWrapper
          title="Act of kindness"
          stars={[actOfKindnessStar(), 1]}
        >
          <InputField
            changed={changeHandler}
            value={actOfKindness}
            fieldType="textArea"
            rows="8"
            name="aok"
            placeholder="Act of kindness"
          />
        </SectionWrapper>
        {hasChanges && (
          <div className={S.btnPopup}>
            <CustomButton type="submit">Save</CustomButton>
            <CustomButton
              type="button"
              inverted
              clicked={() => resetToDbData()}
            >
              Cancel
            </CustomButton>
          </div>
        )}
      </form>
    </main>
  );
};

export default SingleDayPage;
