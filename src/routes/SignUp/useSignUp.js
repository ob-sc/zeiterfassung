import yup from '../../validation/yup';
import useForm from '../../hooks/useForm';

const useSignUp = (mutation) => {
  const init = {
    username: '',
    password: '',
    repeat_password: '',
    station: '',
  };

  const user = new RegExp('^[a-z.-]{1,}$');
  // > 6, 1 klein, 1 groß & 1 zahl
  const pwd = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})');

  const validation = yup.object().shape({
    username: yup
      .string()
      .trim()
      .lowercase()
      .matches(user, 'Benutzer entspricht nicht den Anforderungen')
      .required('Benutzer eingeben'),
    password: yup
      .string()
      .min(6)
      .matches(pwd, 'Passwort entspricht nicht den Anforderungen')
      .required('Passwort eingeben'),
    repeat_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwörter müssen gleich sein')
      .required('Passwort wiederholen'),
    station: yup.number().required('Station auswählen'),
  });

  const formik = useForm(init, mutation, validation);

  return formik;
};

export default useSignUp;
