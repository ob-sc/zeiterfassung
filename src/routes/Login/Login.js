import { Link } from '@reach/router';
import { Box, Grid, Button } from '@material-ui/core';
import useLogin from './useLogin';
import useCommonStyles from '../../styles/common';
import { useCreateSession } from '../../api/useSession';
import Input from '../../components/Input';
import BorderContainer from '../../components/BorderContainer';

function Login() {
  const common = useCommonStyles();
  const login = useCreateSession();

  const formik = useLogin(login);

  return (
    <Box className={common.centerTransform}>
      <BorderContainer m={2} px={4} py={6}>
        <form onSubmit={formik.handleSubmit} className={common.fullWidth}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item className={common.mdItem}>
              <Input name="username" label="Benutzer" formik={formik} />
            </Grid>
            <Grid item className={common.mdItem}>
              <Input name="password" label="Passwort" formik={formik} />
            </Grid>
            <Grid item className={common.mdItem}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mt={3}
              >
                <Link to="/sign-up">Account erstellen</Link>
                <Button
                  type="submit"
                  disabled={login.isLoading}
                  color="primary"
                  className={common.button}
                >
                  Anmelden
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </BorderContainer>
    </Box>
  );
}

export default Login;
