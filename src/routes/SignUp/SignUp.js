import { Box, Grid, Button, MenuItem } from '@material-ui/core';
import { navigate } from '@reach/router';
import useStyles from './SignUpStyles';
import validation from './SignUpValidation';
import useCommonStyles from '../../styles/common';
import stations from '../../constants/stations';
import Input from '../../components/Input';
import CtrlSelect from '../../components/CtrlSelect';
import useForm from '../../hooks/useForm';

function SignUp() {
  const common = useCommonStyles();
  const classes = useStyles();

  const init = {
    username: '',
    password: '',
    repeat_password: '',
    station: '',
  };

  const handleSuccess = (data) => {
    navigate('/login');
  };

  const { formik, mutation } = useForm(
    init,
    validation,
    handleSuccess,
    '/api/users',
    'post'
  );

  return (
    <Box m={2} px={2} p={4} className={common.lgContainer}>
      <h1 className={classes.center}>Account erstellen</h1>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Box>
              Der Benutzername ist <i>vorname.nachname</i>, wie bei deinem
              Citrix-Account.
              <br />
              Das Passwort muss mindestens einen Klein-, einen Großbuchstaben
              und eine Zahl enthalten.
            </Box>
          </Grid>
          <Grid item className={common.mdItem}>
            <Input
              name="username"
              label="Benutzer"
              formik={formik}
              noComplete={true}
            />
          </Grid>
          <Grid item className={common.mdItem}>
            <Input
              name="password"
              label="Passwort"
              formik={formik}
              noComplete={true}
            />
          </Grid>
          <Grid item className={common.mdItem}>
            <Input
              name="repeat_password"
              label="Passwort wiederholen"
              formik={formik}
              noComplete={true}
            />
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
