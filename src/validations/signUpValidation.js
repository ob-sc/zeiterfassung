import Yup from './yup';

const user = new RegExp('^[a-z.-]{1,}$');
// > 6, 1 klein, 1 groß & 1 zahl
const pwd = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})');

const validation = Yup.object().shape({
  username: Yup.string()
    .trim()
    .lowercase()
    .matches(user, 'Benutzer entspricht nicht den Anforderungen')
    .required(),
  password: Yup.string()
    .min(6)
    .matches(pwd, 'Passwort entspricht nicht den Anforderungen')
    .required(),
  repeat_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwörter müssen gleich sein')
    .required(),
  station: Yup.number().required(),
});

export default validation;
