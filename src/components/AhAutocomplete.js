import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, FormControlLabel, Switch, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { tripDigitStation } from '../util/stringUtil';

function AhAutocomplete({ aushilfen, selected, setSelected, error }) {
  const { station, all, isLoading } = aushilfen;
  const [checkAll, setCheckAll] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleAll = () => {
    setSelected(null);
    setCheckAll(!checkAll);
  };

  // station einfügen wenn all ah
  // damit AH mit doppelten namen eindeutig sind
  const optionLabel = (option) =>
    checkAll
      ? `${tripDigitStation(
          option.station
        )} ${option.vorname.trim()} ${option.nachname.trim()}`
      : `${option.vorname.trim()} ${option.nachname.trim()}`;

  return (
    <Box>
      <Autocomplete
        value={selected}
        onChange={(event, newValue) => {
          setSelected(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="ah-combo-box"
        loading={isLoading}
        options={checkAll ? all : station}
        getOptionLabel={optionLabel}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={!!error}
            helperText={!!error && error.message}
            label="Aushilfe"
            variant="outlined"
          />
        )}
      />
      <FormControlLabel
        control={
          <Switch checked={checkAll} onChange={toggleAll} color="secondary" />
        }
        label="Alle Aushilfen"
      />
    </Box>
  );
}

AhAutocomplete.propTypes = {
  station: PropTypes.array,
  all: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.any,
};

export default AhAutocomplete;
