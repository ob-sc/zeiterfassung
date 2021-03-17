import PropTypes from 'prop-types';

import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@material-ui/core';

function CtrlSelect({ name, label, formik, children, ...rest }) {
  return (
    <FormControl
      variant="outlined"
      error={formik.touched[name] && !!formik.errors[name]}
      {...rest}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        label={label}
      >
        {children}
      </Select>
      <FormHelperText>
        {formik.touched[name] && formik.errors[name]}
      </FormHelperText>
    </FormControl>
  );
}

CtrlSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
};

export default CtrlSelect;
