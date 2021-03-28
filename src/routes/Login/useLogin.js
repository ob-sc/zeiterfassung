import useForm from '../../hooks/useForm';
import Yup from '../../validation/yup';

const useLogin = (mutation) => {
  const init = {
    username: '',
    password: '',
  };

  const validation = Yup.object({
    username: Yup.string().trim().lowercase().required('Benutzer eingeben'),
    password: Yup.string().required('Passwort eingeben'),
  });

  const formik = useForm(init, mutation, validation);

  return formik;
};

export default useLogin;
