import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

function Input({ name, label, noComplete, formik, ...rest }) {
  const isPassword = name === 'password' || name === 'repeat_password';
  const type = isPassword ? 'password' : 'text';
  const complete =
    noComplete === true
      ? {
          autoComplete: 'new-password',
        }
      : {};

  return (
    <TextField
      id={name}
      name={name}
      label={label}
      type={type}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && !!formik.errors[name]}
      helperText={formik.touched[name] && formik.errors[name]}
      inputProps={complete}
      {...rest}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  autoComplete: PropTypes.bool,
  formik: PropTypes.object,
};

export default Input;
