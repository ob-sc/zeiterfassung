import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function AHAutocomplete({ options }) {
  return (
    <Autocomplete
      id="combo-box"
      options={options}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Aushilfe" variant="outlined" />
      )}
    />
  );
}

AHAutocomplete.propTypes = { options: PropTypes.array };

export default AHAutocomplete;

// options: [{ name: 'peter', ... }, { ... }, ...]
