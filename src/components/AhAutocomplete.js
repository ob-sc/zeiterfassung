import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, FormControlLabel, Switch, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { tripDigitStation } from '../util/stringUtil';

function AhAutocomplete({ aushilfen, state, handleSelection, error }) {
  const [aushilfe, setAushilfe] = state;
  const { data, isLoading } = aushilfen;
  const { station, all } = data;

  const [checkAll, setCheckAll] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleAll = () => {
    setAushilfe(null);
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
        value={aushilfe?.data ?? null}
        onChange={(event, newValue) => {
          handleSelection(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="ah-combo-box"
        loading={isLoading}
        options={checkAll ? all : station}
        getOptionLabel={optionLabel}
        renderInput={(params) => (
          <TextField
            {...params}
            error={!!error}
            helperText={!!error && error.message}
            label="Aushilfe"
            variant="outlined"
            fullWidth={true}
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
