import { useMutation } from 'react-query';
import { useFormik } from 'formik';

import useToastContext from '../context/ToastContext';
import fetchData from '../util/fetchData';

const useForm = (initialValues, validationSchema, onSuccess, url, method) => {
  const { addError } = useToastContext();

  const mutation = useMutation((values) => fetchData(url, values, method), {
    onError: addError,
    onSuccess,
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      mutation.mutate(values);
      setSubmitting(false);
    },
  });

  return { formik, mutation };
};

export default useForm;
