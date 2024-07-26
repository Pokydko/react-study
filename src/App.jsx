import { Formik, Form } from "formik";
import "./App.css";
import ModulesCheckboxList from "./components/ModulesCheckboxList/ModulesCheckboxList";
import ModuleList from "./components/ModuleList/ModuleList";
import Module1 from "./Apps/Module1";
import Module2 from "./Apps/Module2";
const modulesDone = [
  {
    content: <Module1 />,
    components: "Profile, FriendList, FriendListItem, TransactionHistory",
  },
  {
    content: <Module2 />,
    components: "Description, Options, Feedback, Notification",
  },
];

const modulesDoneNumber = modulesDone.length;
const initialValues = {};
for (let x = 1; x < modulesDoneNumber + 1; x++)
  initialValues[`Module${x}`] = false;

const App = () => {
  return (
    <>
      <Formik initialValues={initialValues}>
        {({ values }) => (
          <>
            <Form>
              <ModulesCheckboxList modulesDoneNumber={initialValues} />
            </Form>
            <ModuleList values={values} modulesDone={modulesDone} />
          </>
        )}
      </Formik>
    </>
  );
};
export default App;
