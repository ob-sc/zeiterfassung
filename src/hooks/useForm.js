import { useFormik } from 'formik';

const useForm = (initialValues, mutation, validationSchema = null) => {
  const init = {
    initialValues,
    onSubmit: (values, { setSubmitting }) => {
      mutation.mutate(values);
      setSubmitting(false);
    },
  };

  if (validationSchema !== null) init.validationSchema = validationSchema;

  const formik = useFormik(init);

  return formik;
};

export default useForm;
