import css from "./Feedback.module.css";

const Feedback = ({ states, totalFeedback, positiveFeedback }) => {
  return (
    <div>
      <p>Good: {states.good}</p>
      <p>Neutral: {states.neutral}</p>
      <p>Bad: {states.bad}</p>
      <p>Total: {totalFeedback} </p>
      <p>Positive: {positiveFeedback > 0 ? positiveFeedback : "0"}%</p>
    </div>
  );
};
export default Feedback;
