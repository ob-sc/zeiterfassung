import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function AHAutocomplete() {
  return (
    <Autocomplete
      id="combo-box"
      options={[{ title: 'test' }]}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Aushilfe" variant="outlined" />
      )}
    />
  );
}

export default AHAutocomplete;
