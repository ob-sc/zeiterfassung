import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

function TimeInput({ beginn, setBeginn, label, name }) {
  return (
    <TextField
      fullWidth={true}
      id={name}
      name={name}
      label={label}
      type="time"
      variant="outlined"
      color="primary"
      value={beginn}
      onChange={(val) => setBeginn(val)}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

TimeInput.propTypes = { label: PropTypes.string };

export default TimeInput;
