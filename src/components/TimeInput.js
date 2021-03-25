import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { nowTimeString } from '../util/stringUtil';

function TimeInput({ label }) {
  return (
    <TextField
      fullWidth={true}
      id="time"
      label={label}
      type="time"
      variant="outlined"
      color="primary"
      defaultValue={nowTimeString}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

TimeInput.propTypes = { label: PropTypes.string };

export default TimeInput;
