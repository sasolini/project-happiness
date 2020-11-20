import React, { useState, useEffect } from "react";
import axios from "axios";

import authHeader from "../../services/auth-header";

import SingleDateNav from "../../components/Single-date-nav/Single-date-nav";
import InputField from "../../components/Input-field/Input-field";
import ActivityButton from "../../components/Activity-button/Activity-button";
import SectionWrapper from "../../components/Section-wrapper/Section-wrapper";

import { ReactComponent as ExerciseIcon } from "../../assets/exercise.svg";
import { ReactComponent as MeditationIcon } from "../../assets/meditation-m.svg";

import S from "./SingleDayPage.module.scss";

const SingleDayPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workout, setWorkout] = useState(false);
  const [meditation, setMeditation] = useState(false);
  const [gratitude1, setGratitude1] = useState("");
  const [gratitude2, setGratitude2] = useState("");
  const [gratitude3, setGratitude3] = useState("");
  const [memoryOfTheDay, setMemoryOfTheDay] = useState("");
  const [actOfKindness, setActOfKindness] = useState("");

  useEffect(() => {
    const today = new Date(currentDate.toDateString());
    axios
      .get(`http://127.0.0.1:9000/diaries?created=${today.toISOString()}`, {
        headers: authHeader(),
      })
      .then(
        (response) => {
          if (response.data.length) {
            setWorkout(response.data[0].workout);
            setMeditation(response.data[0].meditation);
            setGratitude1(response.data[0].gratitude1);
            setGratitude2(response.data[0].gratitude2);
            setGratitude3(response.data[0].gratitude3);
            setMemoryOfTheDay(response.data[0].memory);
            setActOfKindness(response.data[0].kindness);
          } else {
            resetFields();
          }
        },
        (error) => {
          console.log(error);
        }
      );

    return () => {
      // cleanup
    };
  }, [currentDate]);

  const resetFields = () => {
    setWorkout(false);
    setMeditation(false);
    setGratitude1("");
    setGratitude2("");
    setGratitude3("");
    setMemoryOfTheDay("");
    setActOfKindness("");
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://127.0.0.1:9000/diaries",
        {
          created: currentDate.toDateString(),
          workout,
          meditation,
          gratitude1,
          gratitude2,
          gratitude3,
          memory: memoryOfTheDay,
          kindness: actOfKindness,
        },
        {
          headers: authHeader(),
        }
      )
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
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
        <input type="submit" value="Save"></input>
      </form>
    </main>
  );
};

export default SingleDayPage;
