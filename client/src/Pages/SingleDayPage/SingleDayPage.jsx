import React, { useState, useEffect } from "react";

import SingleDateNav from "../../components/Single-date-nav/Single-date-nav";
import InputField from "../../components/Input-field/Input-field";
import ActivityButton from "../../components/Activity-button/Activity-button";
import SectionWrapper from "../../components/Section-wrapper/Section-wrapper";

import { ReactComponent as ExerciseIcon } from "../../assets/exercise.svg";
import { ReactComponent as MeditationIcon } from "../../assets/meditation-m.svg";

import S from "./SingleDayPage.module.scss";

const SingleDayPage = () => {
  const singleDayData = {
    exerciseIsDone: false,
    meditationIsDone: true,
    gratitude: ["", "", ""],
    memoryOfTheDay: "",
    actOfKindness: "Test",
  };

  const [exerciseIsDone, setExerciseIsDone] = useState(
    singleDayData.exerciseIsDone
  );
  const [meditationIsDone, setMeditationIsDone] = useState(
    singleDayData.exerciseIsDone
  );
  const [gratitude1, setGratitude1] = useState(singleDayData.gratitude[0]);
  const [gratitude2, setGratitude2] = useState(singleDayData.gratitude[1]);
  const [gratitude3, setGratitude3] = useState(singleDayData.gratitude[2]);
  const [memoryOfTheDay, setMemoryOfTheDay] = useState(
    singleDayData.memoryOfTheDay
  );
  const [actOfKindness, setActOfKindness] = useState(
    singleDayData.actOfKindness
  );

  useEffect(() => {
    const getGratitudeStars = () => {
      let stars = 0;
      if (gratitude1.length) stars += 1;
      if (gratitude2.length) stars += 1;
      if (gratitude3.length) stars += 1;
      return stars;
    };
  }, [gratitude1, gratitude2, gratitude3]);

  const activitiesClickHandler = (activity) => {
    if (activity === "exercise") setExerciseIsDone(!exerciseIsDone);
    if (activity === "meditation") setMeditationIsDone(!meditationIsDone);
  };

  const onChangeHandler = (e) => {
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
      case "ack":
        setActOfKindness(val);
        break;
      default:
        break;
    }
  };

  return (
    <main className={S.container}>
      <SingleDateNav className={S.dateNav} />
      <section className={S.activities}>
        <ActivityButton
          clicked={activitiesClickHandler}
          size="5"
          done={exerciseIsDone}
          name="exercise"
        >
          <ExerciseIcon />
        </ActivityButton>
        <ActivityButton
          clicked={activitiesClickHandler}
          size="5"
          done={meditationIsDone}
          name="meditation"
        >
          <MeditationIcon />
        </ActivityButton>
      </section>
      <SectionWrapper title="Gratitude" stars={[1, 3]}>
        <InputField
          changed={onChangeHandler}
          value={gratitude1}
          fieldType="textArea"
          name="g1"
          placeholder="Gratitude one"
        />
        <InputField
          changed={onChangeHandler}
          value={gratitude2}
          fieldType="textArea"
          name="g2"
          placeholder="Gratitude two"
        />
        <InputField
          changed={onChangeHandler}
          value={gratitude3}
          fieldType="textArea"
          name="g3"
          placeholder="Gratitude three"
        />
      </SectionWrapper>
      <SectionWrapper title="Memory of the day" stars={[0, 1]}>
        <InputField
          changed={onChangeHandler}
          value={memoryOfTheDay}
          fieldType="textArea"
          rows="8"
          name="hmod"
          placeholder="Happy memory of the day"
        />
      </SectionWrapper>
      <SectionWrapper title="Act of kindness" stars={[0, 1]}>
        <InputField
          changed={onChangeHandler}
          value={actOfKindness}
          fieldType="textArea"
          rows="8"
          name="aok"
          placeholder="Act of kindness"
        />
      </SectionWrapper>
    </main>
  );
};

export default SingleDayPage;
