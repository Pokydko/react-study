import { useState, useEffect } from "react";
import css from "./Module2.module.css";
import Description from "../components/Description/Description";
import Options from "../components/Options/Options";
import Feedback from "../components/Feedback/Feedback";
import Notification from "../components/Notification/Notification";

const zeroFeedback = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const FeedbackSection = () => {
  const [feedbackCounter, setFeedbackCounter] = useState(
    fromLocalStorage("feedback-count", zeroFeedback)
  );

  useEffect(() => {
    localStorage.setItem("feedback-count", JSON.stringify(feedbackCounter));
  });

  useEffect(() => clickToBlack("h2"), []);

  let totalFeedback = 0;
  for (const number of Object.values(feedbackCounter)) totalFeedback += number;
  const positiveFeedback = Math.round(
    (feedbackCounter.good / totalFeedback) * 100
  );

  const updateFeedback = (feedbackType) => {
    setFeedbackCounter({
      ...feedbackCounter,
      [feedbackType]: feedbackCounter[feedbackType] + 1,
    });
  };
  const resetFeedback = () => {
    setFeedbackCounter(zeroFeedback);
  };

  return (
    <section className={css.feedback}>
      <Description title="Sip Happens Café">
        Please leave your feedback about our service by selecting one of the
        options below.
      </Description>
      <Options
        totalFeedback={totalFeedback}
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        buttons={["Good", "Neutral", "Bad"]}
      />
      {totalFeedback === 0 ? (
        <Notification message="No feedback yet" />
      ) : (
        <Feedback
          states={feedbackCounter}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      )}
    </section>
  );
};
export default FeedbackSection;

function clickToBlack(tag) {
  const root = document.querySelector(":root");
  const changeTheme = () => {
    root.style.colorScheme =
      root.style.colorScheme === "dark" ? "light" : "dark";
    console.info("Change black/white theme (tap on Title)");
  };

  setTimeout(() => {
    document.querySelector(tag).addEventListener("click", changeTheme);
  }, 500);

  return () => {
    setTimeout(() => {
      if (document.querySelector(tag))
        document.querySelector(tag).removeEventListener("click", changeTheme);
    }, 500);
  };
}

function fromLocalStorage(key, startingState) {
  try {
    const inStorage = JSON.parse(localStorage.getItem(key));
    return inStorage === null ? startingState : inStorage;
  } catch (error) {
    console.error(
      "Something went wrong with your browser storage, but we handle it."
    );
    return startingState;
  }
}
