import { Link, navigate } from '@reach/router';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Grid, Button, Paper } from '@material-ui/core';

import useStyles from '../styles/views/LoginStyles';
import useToastContext from '../context/ToastContext';
import { postData } from '../util/fetchData';
import yupLocale from '../validations/locale';
import Input from '../components/Input';

Yup.setLocale(yupLocale);

function Login() {
  const classes = useStyles();
  const { addError } = useToastContext();

  const mutation = useMutation((values) => postData('/api/session', values), {
    onError: (error) => {
      addError(error);
    },
    onSuccess: (data) => {
      navigate('/', { replace: true });
    },
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    validationSchema: Yup.object({
      username: Yup.string().trim().lowercase().required('Benutzer eingeben'),
      password: Yup.string().trim().lowercase().required('Passwort eingeben'),
    }),

    onSubmit: (values, { setSubmitting }) => {
      mutation.mutate(values);
      setSubmitting(false);
    },
  });

  return (
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
                variant="outlined"
                className={classes.loginInput}
              />
            </Grid>
            <Grid item>
              <Input
                name="password"
                label="Passwort"
                formik={formik}
                variant="outlined"
                className={classes.loginInput}
              />
            </Grid>
            <Grid className={classes.actionBox} item>
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
  );
}

export default Login;
