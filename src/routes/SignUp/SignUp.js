import { Box, Grid, Button, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useSignUp from './useSignUp';
import useCommonStyles from '../../styles/common';
import { useCreateUser } from '../../api/useUser';
import stations from '../../constants/stations';
import Input from '../../components/Input';
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
  const formik = useSignUp(mutation);

  return (
    <Box m={2} px={2} p={4} className={common.lgContainer}>
      <h1 className={center}>Account erstellen</h1>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <div>
              Der Benutzername ist <i>vorname.nachname</i>, wie bei deinem
              Citrix-Account.
              <br />
              Das Passwort muss mindestens einen Klein-, einen Großbuchstaben
              und eine Zahl enthalten.
            </div>
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
