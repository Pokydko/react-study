import { useState, useEffect } from "react";
import "./App.css";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

const zeroFeedback = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const App = () => {
  const [feedbackCounter, setFeedbackCounter] = useState(() => {
    try {
      const feedbacksInStorage = JSON.parse(
        localStorage.getItem("feedback-count")
      );
      return feedbacksInStorage === null ? zeroFeedback : feedbacksInStorage;
    } catch (error) {
      console.error(
        "Something went wrong with your browser storage, but we handle it."
      );
      return zeroFeedback;
    }
  });

  useEffect(() => {
    localStorage.setItem("feedback-count", JSON.stringify(feedbackCounter));
  });

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
    <section className="feedback">
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

export default App;
