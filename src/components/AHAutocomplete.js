import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { tripDigitStation } from '../util/stringUtil';

function AHAutocomplete({ options, optionToggle, ...rest }) {
  // station einfügen wenn options != aktuelle station
  // damit AH mit doppelten namen eindeutig sind
  const optionLabel = (option) =>
    optionToggle !== 'station'
      ? `${tripDigitStation(
          option.station
        )} ${option.vorname.trim()} ${option.nachname.trim()}`
      : `${option.vorname.trim()} ${option.nachname.trim()}`;

  return (
    <Autocomplete
      {...rest}
      id="combo-box"
      options={options}
      getOptionLabel={optionLabel}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Aushilfe" variant="outlined" />
      )}
    />
  );
}

AHAutocomplete.propTypes = {
  options: PropTypes.array,
  optionToggle: PropTypes.string,
};

export default AHAutocomplete;
