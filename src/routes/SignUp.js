import { Box, Grid, Button, Paper, MenuItem } from '@material-ui/core';
import { navigate } from '@reach/router';

import useCommonStyles from '../styles/common';
import useStyles from '../styles/routes/SignUpStyles';
import stations from '../constants/stations';
import validation from '../validations/signUpValidation';
import Input from '../components/Input';
import CtrlSelect from '../components/CtrlSelect';
import useForm from '../hooks/useForm';

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
    <Box className={common.flexCenterRoot}>
      <Box m={2} px={2} py={4} className={classes.root} clone>
        <Paper>
          <h1 className={classes.headLine}>Account erstellen</h1>
          <form onSubmit={formik.handleSubmit} noValidate>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid className={classes.textContainer} item>
                <Box>
                  <p>
                    Der Benutzername ist <i>vorname.nachname</i>, wie bei deinem
                    Citrix-Account. Das Passwort muss mindestens einen Klein-,
                    einen Großbuchstaben und eine Zahl enthalten.
                  </p>
                </Box>
              </Grid>
              <Grid item>
                <Input
                  name="username"
                  label="Benutzer"
                  formik={formik}
                  noComplete={true}
                  className={common.mdInput}
                />
              </Grid>
              <Grid item>
                <Input
                  name="password"
                  label="Passwort"
                  formik={formik}
                  noComplete={true}
                  className={common.mdInput}
                />
              </Grid>
              <Grid item>
                <Input
                  name="repeat_password"
                  label="Passwort wiederholen"
                  formik={formik}
                  noComplete={true}
                  className={common.mdInput}
                />
              </Grid>
              <Grid item>
                <CtrlSelect
                  name="station"
                  label="Station"
                  formik={formik}
                  className={common.mdInput}
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
                <Box mt={3}>
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
    </Box>
  );
}

export default SignUp;
