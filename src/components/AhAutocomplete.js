import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, FormControlLabel, Switch, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useHomeContext from '../context/HomeContext';
import { tripDigitStation } from '../util/stringUtil';

function AhAutocomplete({ name, aushilfen, formik, handleSelection }) {
  const { data, isLoading } = aushilfen;
  const { station, all } = data;
  const { state, updateSelected, updateCheckAll } = useHomeContext();

  const [inputValue, setInputValue] = useState('');

  const allOptions =
    state.selected?.sameStation === false || state.checkAll === true;

  const toggleAll = () => {
    updateSelected(null);
    updateCheckAll(!state.checkAll);
  };

  // station einfügen wenn all ah
  // damit AH mit doppelten namen eindeutig sind
  const optionLabel = (option) =>
    state.checkAll
      ? `${tripDigitStation(
          option.station
        )} ${option.vorname.trim()} ${option.nachname.trim()}`
      : `${option.vorname.trim()} ${option.nachname.trim()}`;

  return (
    <Box>
      <Autocomplete
        value={state?.selected?.data ?? null}
        onChange={(event, newValue) => {
          formik.setFieldValue(name, newValue?.id ?? null);
          handleSelection(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="ah-combo-box"
        loading={isLoading}
        options={allOptions ? all : station}
        getOptionLabel={optionLabel}
        blurOnSelect={true}
        renderInput={(params) => (
          <TextField
            {...params}
            id={name}
            name={name}
            label="Aushilfe"
            variant="outlined"
            fullWidth={true}
            // error={formik.touched[name] && !!formik.errors[name]}
            // helperText={formik.touched[name] && formik.errors[name]}
          />
        )}
      />
      <FormControlLabel
        control={
          <Switch
            checked={state.checkAll}
            onChange={toggleAll}
            color="secondary"
          />
        }
        label="Alle Aushilfen"
      />
    </Box>
  );
}

AhAutocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  aushilfen: PropTypes.object.isRequired,
  formik: PropTypes.object.isRequired,
  handleSelection: PropTypes.func.isRequired,
};

export default AhAutocomplete;
