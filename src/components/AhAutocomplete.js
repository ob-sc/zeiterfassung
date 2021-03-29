import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, FormControlLabel, Switch, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { tripDigitStation } from '../util/stringUtil';

function AhAutocomplete({ name, aushilfen, state, formik, handleSelection }) {
  const [selectedAh, setSelectedAh] = state;
  const { data, isLoading } = aushilfen;
  const { station, all } = data;

  const [checkAll, setCheckAll] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleAll = () => {
    setSelectedAh(null);
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
        value={selectedAh?.data ?? null}
        onChange={(event, newValue) => {
          handleSelection(newValue);
          formik.setFieldValue('ahid', selectedAh?.data?.id);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          formik.setFieldValue('ahid', selectedAh?.data?.id);
          console.log(formik.values);
        }}
        id="ah-combo-box"
        loading={isLoading}
        options={checkAll ? all : station}
        getOptionLabel={optionLabel}
        renderInput={(params) => (
          <TextField
            {...params}
            id={name}
            name={name}
            label="Aushilfe"
            error={formik.touched[name] && !!formik.errors[name]}
            helperText={formik.touched[name] && formik.errors[name]}
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
  name: PropTypes.string.isRequired,
  aushilfen: PropTypes.object,
  loading: PropTypes.bool,
  formik: PropTypes.object.isRequired,
  handleSelection: PropTypes.func.isRequired,
};

export default AhAutocomplete;
