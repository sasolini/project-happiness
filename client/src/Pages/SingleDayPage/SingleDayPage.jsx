import React from "react";

// import SingleDateNav from "../../components/Single-date-nav/Single-date-nav";
import InputField from "../../components/input-field/input-field";

import S from "./SingleDayPage.module.scss";

const SingleDayPage = () => (
  <main className={S.container}>
    <section className={S.gratitudes}>
      <h3 className={S.groupTitle}>Gratitudes</h3>

      <InputField fieldType="input" name="g1" placeholder="Gratitude one" />
      <InputField fieldType="input" name="g2" placeholder="Gratitude two" />
      <InputField fieldType="input" name="g3" placeholder="Gratitude two" />
    </section>
    <section className={S.gratitudes}>
      <h3 className={S.groupTitle}>Happy memory of the day</h3>
      <InputField
        fieldType="textArea"
        styles={{ minHeight: "20rem" }}
        name="g3"
        placeholder="Happy memory of the day"
      />
    </section>
    <section className={S.gratitudes}>
      <h3 className={S.groupTitle}>Act of kindness</h3>
      <InputField
        fieldType="textArea"
        styles={{ minHeight: "20rem" }}
        name="g3"
        placeholder="Act of kindness"
      />
    </section>
  </main>
);

export default SingleDayPage;
