import css from "./ModuleList.module.css";

const ModuleList = ({ values, modulesDone }) => {
  return (
    <ul>
      {Object.keys(values).map((ModuleNumber, index) => (
        <li key={ModuleNumber}>
          {values[ModuleNumber] && modulesDone[index].content}
        </li>
      ))}
    </ul>
  );
};
export default ModuleList;
