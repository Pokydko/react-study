import css from "./Options.module.css";

const Options = ({ totalFeedback, updateFeedback, resetFeedback, buttons }) => {
  return (
    <div className="controls">
      {buttons.map((buttonName) => {
        return (
          <button
            key={buttonName}
            onClick={() => updateFeedback(buttonName.toLowerCase())}
          >
            {buttonName}
          </button>
        );
      })}
      {totalFeedback > 0 && (
        <button key="Reset" onClick={resetFeedback}>
          Reset
        </button>
      )}
    </div>
  );
};
export default Options;
