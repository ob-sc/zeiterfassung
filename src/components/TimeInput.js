import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

function TimeInput({ beginn, setBeginn, label }) {
  return (
    <TextField
      fullWidth={true}
      id="time"
      label={label}
      type="time"
      variant="outlined"
      color="primary"
      defaultValue={beginn}
      onChange={(val) => setBeginn(val)}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

TimeInput.propTypes = { label: PropTypes.string };

export default TimeInput;
