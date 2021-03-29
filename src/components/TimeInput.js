import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

function TimeInput({ label, name, ...rest }) {
  return (
    <TextField
      fullWidth={true}
      id={name}
      name={name}
      label={label}
      type="time"
      variant="outlined"
      color="primary"
      InputLabelProps={{
        shrink: true,
      }}
      {...rest}
    />
  );
}

TimeInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default TimeInput;
