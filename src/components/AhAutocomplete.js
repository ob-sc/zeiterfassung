import { Box, FormControlLabel, Switch, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { tripDigitStation } from '../util/stringUtil';
import useAhAutocomplete from '../hooks/components/useAhAutocomplete';

function AhAutocomplete() {
  const {
    isLoading,
    ahState,
    optionsAll,
    optionsRegion,
    toggleAll,
    toggleRegion,
    selectAushilfe,
  } = useAhAutocomplete();
  const { optionToggle, options, selectedAH } = ahState;

  // station einfügen wenn options != aktuelle station
  // damit AH mit doppelten namen eindeutig sind
  const optionLabel = (option) =>
    optionsAll || optionsRegion
      ? `${tripDigitStation(
          option.station
        )} ${option.vorname.trim()} ${option.nachname.trim()}`
      : `${option.vorname.trim()} ${option.nachname.trim()}`;

  return (
    <Box>
      <Autocomplete
        id="combo-box"
        loading={isLoading}
        options={options}
        getOptionLabel={optionLabel}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Aushilfe" variant="outlined" />
        )}
      />
      <FormControlLabel
        control={
          <Switch checked={optionsAll} onChange={toggleAll} color="secondary" />
        }
        label="Alle"
      />
    </Box>
  );
}

export default AhAutocomplete;
