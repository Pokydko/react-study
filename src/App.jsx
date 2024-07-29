import { Formik, Form } from "formik";
import "./App.css";
import ModulesCheckboxList from "./components/ModulesCheckboxList/ModulesCheckboxList";
import ModuleList from "./components/ModuleList/ModuleList";

import Module1 from "./Apps/Module1";
import Module2 from "./Apps/Module2";
import Module3 from "./Apps/Module3";
import Description from "./components/Description/Description";
const modulesDone = [
  {
    what: "ProfileCard; table of some data",
    content: <Module1 />,
    components: [
      "Profile",
      "FriendList",
      "FriendListItem",
      "TransactionHistory",
    ],
  },
  {
    what: "FeedbackCounter",
    content: <Module2 />,
    components: ["Description", "Options", "Feedback", "Notification"],
  },
  {
    what: "Phonebook",
    content: <Module3 />,
    components: ["Contact", "ContactList", "ContactForm", "SearchBox"],
  },
];

const modulesDoneNumber = modulesDone.length;
const initialValues = {};
for (let x = 1; x <= modulesDoneNumber; x++)
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
