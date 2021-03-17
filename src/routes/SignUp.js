import { Box, Grid, Button, Paper, MenuItem } from '@material-ui/core';
import { navigate } from '@reach/router';

import useStyles from '../styles/views/SignUpStyles';
import stations from '../constants/stations';
import validation from '../validations/signUpValidation';
import Input from '../components/Input';
import CtrlSelect from '../components/CtrlSelect';
import useForm from '../hooks/useForm';

function SignUp() {
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
    <Box m={2} px={3} py={6} clone>
      <Paper>
        <h1 className={classes.headLine}>Account erstellen</h1>
        <p>
          Der Benutzername ist <i>vorname.nachname</i>, wie bei deinem
          Citrix-Account
        </p>
        <p>
          Das Passwort muss mindestens einen Klein-, einen Großbuchstaben und
          eine Zahl enthalten.
        </p>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Input
                name="username"
                label="Benutzer"
                formik={formik}
                noComplete={true}
                variant="outlined"
                className={classes.input}
              />
            </Grid>
            <Grid item>
              <Input
                name="password"
                label="Passwort"
                formik={formik}
                noComplete={true}
                variant="outlined"
                className={classes.input}
              />
            </Grid>
            <Grid item>
              <Input
                name="repeat_password"
                label="Passwort wiederholen"
                formik={formik}
                noComplete={true}
                variant="outlined"
                className={classes.input}
              />
            </Grid>
            <Grid item>
              <CtrlSelect
                name="station"
                label="Station"
                formik={formik}
                className={classes.input}
              >
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
              <Box float="right" mt={3}>
                <Button
                  type="submit"
                  disabled={mutation.isLoading}
                  color="primary"
                >
                  Registrieren
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default SignUp;
