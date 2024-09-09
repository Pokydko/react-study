import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// redux
import { addContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleAddContact = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  const ContactFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "at least 3 char!")
      .max(50, "Too long name!")
      .required("Required"),
    number: Yup.string()
      .matches(
        /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i,
        "+38(111)11-111-11"
      )
      .min(3, "At least 3 digit!")
      .max(50, "Too long number!")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={handleAddContact}
      validationSchema={ContactFormSchema}
    >
      <Form className={css.form}>
        <label htmlFor="nameFieldId">
          Name
          <Field
            type="text"
            name="name"
            id="nameFieldId"
            autoComplete="on"
            className={css.field}
          ></Field>
          <ErrorMessage
            className={css.errorMessage}
            name="name"
            component="span"
          />
        </label>
        <label htmlFor="numberFieldId">
          Number
          <Field
            type="text"
            name="number"
            id="numberFieldId"
            className={css.field}
          ></Field>
          <ErrorMessage
            className={css.errorMessage}
            name="number"
            component="span"
          />
        </label>
        <div className={css.btnWrap}>
          <button type="submit">Add contact</button>
        </div>
      </Form>
    </Formik>
  );
};
export default ContactForm;
