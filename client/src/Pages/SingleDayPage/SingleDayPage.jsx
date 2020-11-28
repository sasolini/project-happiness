import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";

import {
  getDbDataAsync,
  postDiaryToDbAsync,
  updateDiaryInDbAsync,
} from "./SingleDayAPI";

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

  const initialState = useMemo(() => {
    return {
      workout: false,
      meditation: false,
      gratitude1: "",
      gratitude2: "",
      gratitude3: "",
      memory: "",
      kindness: "",
    };
  }, []);

  const [workout, setWorkout] = useState(false);
  const [meditation, setMeditation] = useState(false);
  const [gratitude1, setGratitude1] = useState("");
  const [gratitude2, setGratitude2] = useState("");
  const [gratitude3, setGratitude3] = useState("");
  const [memoryOfTheDay, setMemoryOfTheDay] = useState("");
  const [actOfKindness, setActOfKindness] = useState("");
  const [dbData, setDbData] = useState(initialState);
  const [hasChanges, setHasChanges] = useState(false);

  const formRef = useRef(null);

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
    setHasChanges(checkForChanges());
  }, [hasChanges, checkForChanges]);

  useEffect(() => {
    getDbDataAsync(currentDate).then((data) => {
      if (data) {
        setDbData(data);
      } else {
        setDbData(initialState);
      }
    });
  }, [currentDate, initialState]);

  useEffect(() => {
    setWorkout(dbData.workout);
    setMeditation(dbData.meditation);
    setGratitude1(dbData.gratitude1);
    setGratitude2(dbData.gratitude2);
    setGratitude3(dbData.gratitude3);
    setMemoryOfTheDay(dbData.memory);
    setActOfKindness(dbData.kindness);
    setHasChanges(false);
  }, [dbData]);

  const resetToDbData = () => {
    formRef.current.reset();
    setWorkout(dbData.workout);
    setMeditation(dbData.meditation);
    setGratitude1(dbData.gratitude1);
    setGratitude2(dbData.gratitude2);
    setGratitude3(dbData.gratitude3);
    setMemoryOfTheDay(dbData.memory);
    setActOfKindness(dbData.kindness);
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
    if (hasChanges) {
      alert("Please save the changes");
      return;
    }

    formRef.current.reset();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dbData._id) {
      updateDiaryInDbAsync(dbData._id, getCurrentState()).then((res) =>
        setDbData(res)
      );
    } else {
      postDiaryToDbAsync(getCurrentState()).then((res) => setDbData(res));
    }
  };

  return (
    <main className={S.container}>
      <SingleDateNav
        clicked={dateClickHandler}
        currentDate={currentDate}
        className={S.dateNav}
      />
      <form ref={formRef} onSubmit={handleSubmit}>
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
              clicked={() => {
                resetToDbData();
                setHasChanges(false);
              }}
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
