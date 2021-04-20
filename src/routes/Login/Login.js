import { Box, Grid, Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

// signUpLink = <Link to="/sign-up">Account erstellen</Link>

function Login({ signUpLink }) {
  const initialValues = {
    username: '',
    password: '',
  };
  const validationSchema = yup.object().shape({
    username: yup.string().trim().lowercase().required('Benutzer eingeben'),
    password: yup.string().required('Passwort eingeben'),
  });
  const fetchLogin = async (data) => {
    const response = await fetch('/api/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const init = {
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      fetchLogin(values).then((data) => {
        setSubmitting(false);
        console.log(data);
      });
    },
  };

  const formik = useFormik(init);

  return (
    <Box className="center-transform">
      <Box m={2} px={4} py={6} className="border-box" clone>
        <form onSubmit={formik.handleSubmit}>
          <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
            <Grid item className="input">
              <TextField
                variant="outlined"
                color="primary"
                id="username"
                name="username"
                label="Benutzer"
                fullWidth={true}
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && !!formik.errors.username}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item className="input">
              <TextField
                variant="outlined"
                color="primary"
                id="password"
                name="password"
                type="password"
                label="Passwort"
                fullWidth={true}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item className="input">
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mt={3}
              >
                {signUpLink}
                <Button type="submit" color="primary">
                  Anmelden
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
