import css from "./Options.module.css";

const Options = ({ totalFeedback, updateFeedback, resetFeedback, buttons }) => {
  return (
    <div className="controls">
      {buttons.map((buttonName) => {
        return (
          <button
            key={buttonName}
            className={css.controlsBtn}
            onClick={() => updateFeedback(buttonName.toLowerCase())}
          >
            {buttonName}
          </button>
        );
      })}
      {totalFeedback > 0 && (
        <button key="Reset" className={css.controlsBtn} onClick={resetFeedback}>
          Reset
        </button>
      )}
    </div>
  );
};
export default Options;
