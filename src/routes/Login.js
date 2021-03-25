import { Link, navigate } from '@reach/router';
import * as Yup from 'yup';
import { Box, Grid, Button } from '@material-ui/core';

import useCommonStyles from '../styles/common';
import yupLocale from '../validations/locale';
import Input from '../components/Input';
import useForm from '../hooks/useForm';
import PaperContainer from '../components/PaperContainer';

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
      <PaperContainer m={2} px={4} py={6}>
        <form onSubmit={formik.handleSubmit} className={common.fullWidth}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item className={common.input}>
              <Input name="username" label="Benutzer" formik={formik} />
            </Grid>
            <Grid item className={common.input}>
              <Input name="password" label="Passwort" formik={formik} />
            </Grid>
            <Grid item className={common.input}>
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
      </PaperContainer>
    </Box>
  );
}

export default Login;
