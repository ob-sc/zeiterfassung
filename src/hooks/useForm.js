import { useFormik } from 'formik';

const useForm = (
  initialValues,
  mutation,
  validationSchema = null,
  values = {}
) => {
  const init = {
    initialValues,
    onSubmit: (formValues, { setSubmitting }) => {
      mutation.mutate({ ...values, ...formValues });
      setSubmitting(false);
    },
  };

  if (validationSchema !== null) init.validationSchema = validationSchema;

  const formik = useFormik(init);

  return formik;
};

export default useForm;
