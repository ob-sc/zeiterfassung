import { Box, Grid, Button, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useSignUp from './useSignUp';
import SignUpInput from './components/SignUpInput';
import useCommonStyles from '../../styles/common';
import { useCreateUser } from '../../api/useUser';
import stations from '../../constants/stations';
import CtrlSelect from '../../components/CtrlSelect';

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
}));

function SignUp() {
  const common = useCommonStyles();
  const { center } = useStyles();

  const mutation = useCreateUser();

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
  // useform komplett raus, hier useformik

  return (
    <Box m={2} px={2} p={4} className={common.lgContainer}>
      <h1 className={center}>Account erstellen</h1>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
          <Grid item>
            <div>
              Der Benutzername ist <i>vorname.nachname</i>, wie bei deinem Citrix-Account.
              <br />
              Das Passwort muss mindestens einen Klein-, einen Großbuchstaben und eine Zahl
              enthalten.
            </div>
          </Grid>
          <Grid item className={common.mdItem}>
            <SignUpInput name="username" label="Benutzer" formik={formik} />
          </Grid>
          <Grid item className={common.mdItem}>
            <SignUpInput name="password" label="Passwort" formik={formik} />
          </Grid>
          <Grid item className={common.mdItem}>
            <SignUpInput name="repeat_password" label="Passwort wiederholen" formik={formik} />
          </Grid>
          <Grid item className={common.mdItem}>
            <CtrlSelect name="station" label="Station" formik={formik}>
              <MenuItem value="">&nbsp;</MenuItem>
              {stations.map(({ num, station }) => {
                return (
                  <MenuItem key={num} value={num}>
                    {station.name}
                  </MenuItem>
                );
              })}
            </CtrlSelect>
          </Grid>
          <Grid item>
            <Box mt={3}>
              <Button
                type="submit"
                disabled={mutation.isLoading}
                className={common.button}
                color="primary"
              >
                Registrieren
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default SignUp;
