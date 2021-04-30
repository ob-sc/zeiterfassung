import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

function SignUpInput({ name, label, formik, ...rest }) {
  const isPassword = name === 'password' || name === 'repeat_password';
  const type = isPassword ? 'password' : 'text';

  return (
    <TextField
      variant="outlined"
      color="primary"
      id={name}
      name={name}
      label={label}
      type={type}
      fullWidth={true}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && !!formik.errors[name]}
      helperText={formik.touched[name] && formik.errors[name]}
      inputProps={{ autoComplete: 'new-password' }}
      {...rest}
    />
  );
}

SignUpInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
};

export default SignUpInput;
