import { navigate } from '@reach/router';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Grid, Button, Paper } from '@material-ui/core';

import useToastContext from '../context/ToastContext';
import { postData } from '../util/fetchData';
import yupLocale from '../validations/locale';
import Input from '../components/Input';

Yup.setLocale(yupLocale);

function SignUp() {
  const { addError } = useToastContext();

  const mutation = useMutation(
    (formValues) => postData('/api/users', formValues),
    {
      onError: (error) => {
        addError(error);
      },
      onSuccess: (data) => {
        navigate('/login');
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      username: '', // todo session.isDead ? session.username : ''
      password: '',
      repeat_password: '',
    },

    validationSchema: Yup.object({
      username: Yup.string().trim().lowercase().required('Benutzer eingeben'),
      password: Yup.string().trim().lowercase().required('Passwort eingeben'),
      repeat_password: Yup.string()
        .trim()
        .lowercase()
        .required('Passwort eingeben'),
    }),

    onSubmit: (values, { setSubmitting }) => {
      mutation.mutate(values);
      setSubmitting(false);
    },
  });

  return (
    <Box m={2} px={8} py={6} clone>
      <Paper>
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
              />
            </Grid>
            <Grid item>
              <Input
                name="password"
                label="Passwort"
                formik={formik}
                noComplete={true}
              />
            </Grid>
            <Grid item>
              <Input
                name="repeat_password"
                label="Passwort wiederholen"
                formik={formik}
                noComplete={true}
              />
            </Grid>
            <Grid item>
              <Box float="right" mt={3}>
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

export default SignUp;
