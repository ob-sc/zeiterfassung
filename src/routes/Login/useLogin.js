import useForm from '../../hooks/useForm';
import yup from '../../validation/yup';

const useLogin = (mutation) => {
  // const init = {
  //   username: '',
  //   password: '',
  // };

  // const validation = yup.object().shape({
  //   username: yup.string().trim().lowercase().required('Benutzer eingeben'),
  //   password: yup.string().required('Passwort eingeben'),
  // });

  const formik = useForm(init, mutation, validation);

  return formik;
};

export default useLogin;
