import { Formik, Form, Field, ErrorMessage } from 'formik';

export const FeedbackForm = () => {
  return (<div>
      <h1>Форма обратной связи</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        /*validate={values => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            return errors;
        }}*/
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (<Form>

            <Field type="text" name="name" placeholder={'Имя'}/>
            <Field type="email" name="email" placeholder={'Ваш e-mail'}/>
            <ErrorMessage name="email" component="div"/>

            <Field type="text" name="text"/>
            <ErrorMessage name="password" component="div"/>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>)}
      </Formik>
    </div>

  );
};
