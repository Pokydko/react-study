import { Field } from "formik";
import css from "./ModulesCheckboxList.module.css";

const ModulesCheckboxList = ({ modulesDoneNumber }) => {
  return (
    <ul>
      {Object.keys(modulesDoneNumber).map((ModuleNumber, index) => (
        <li key={index} className={css.item}>
          <Field type="checkbox" name={ModuleNumber} />
        </li>
      ))}
    </ul>
  );
};

export default ModulesCheckboxList;
