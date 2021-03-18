import { Link, navigate } from '@reach/router';
import * as Yup from 'yup';
import { Box, Grid, Button, Paper } from '@material-ui/core';

import useCommonStyles from '../styles/common';
import yupLocale from '../validations/locale';
import Input from '../components/Input';
import useForm from '../hooks/useForm';

Yup.setLocale(yupLocale);

function Login() {
  const common = useCommonStyles();

  const init = {
    username: '',
    password: '',
  };

  const validation = Yup.object({
    username: Yup.string().trim().lowercase().required('Benutzer eingeben'),
    password: Yup.string().required('Passwort eingeben'),
  });

  const handleSuccess = (data) => {
    navigate('/', { replace: true });
  };

  const { formik, mutation } = useForm(
    init,
    validation,
    handleSuccess,
    '/api/session',
    'post'
  );

  return (
    <Box className={common.flexCenterRoot}>
      <Box m={2} px={3} py={6} clone>
        <Paper>
          <form onSubmit={formik.handleSubmit}>
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
                  className={common.mdInput}
                />
              </Grid>
              <Grid item>
                <Input
                  name="password"
                  label="Passwort"
                  formik={formik}
                  className={common.mdInput}
                />
              </Grid>
              <Grid className={common.mdInput} item>
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
                    disabled={mutation.isLoading}
                    color="primary"
                  >
                    Anmelden
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

export default Login;
