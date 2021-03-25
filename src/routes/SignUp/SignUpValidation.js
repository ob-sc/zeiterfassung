import Yup from '../../validation/yup';

const user = new RegExp('^[a-z.-]{1,}$');
// > 6, 1 klein, 1 groß & 1 zahl
const pwd = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})');

const validation = Yup.object().shape({
  username: Yup.string()
    .trim()
    .lowercase()
    .matches(user, 'Benutzer entspricht nicht den Anforderungen')
    .required('Benutzer eingeben'),
  password: Yup.string()
    .min(6)
    .matches(pwd, 'Passwort entspricht nicht den Anforderungen')
    .required('Passwort eingeben'),
  repeat_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwörter müssen gleich sein')
    .required('Passwort wiederholen'),
  station: Yup.number().required('Station auswählen'),
});

export default validation;
