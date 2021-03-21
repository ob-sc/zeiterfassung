import { useImmer } from 'use-immer';
import { Box, FormControlLabel, Switch } from '@material-ui/core';
import useStyles from '../styles/routes/HomeStyles';
import useAllAushilfen from '../hooks/useAllAushilfen';
import AHAutocomplete from '../components/AHAutocomplete';
import PaperContainer from '../components/PaperContainer';

function Home() {
  const classes = useStyles();
  const ah = useAllAushilfen();

  const initState = {
    optionToggle: 'station',
    options: ah.station,
    selectedAH: null,
  };

  const [state, updateState] = useImmer(initState);
  const { optionToggle, options, selectedAH } = state;

  const optionsAll = optionToggle === 'all';
  const optionsRegion = optionToggle === 'region';

  const toggleAll = () =>
    updateState((draft) => {
      draft.optionToggle = optionsAll ? 'station' : 'all';
      draft.options = optionsAll ? ah.station : ah.all;
    });

  const toggleRegion = () =>
    updateState((draft) => {
      draft.optionToggle = optionsRegion ? 'station' : 'region';
      draft.options = optionsRegion ? ah.station : ah.region;
    });

  const selectAushilfe = (ah) => {
    updateState((draft) => {
      draft.selectedAH = ah;
    });
  };

  console.log(options);

  return (
    <Box className={classes.flexCenterRoot}>
      <PaperContainer m={2} p={2}>
        <AHAutocomplete
          options={options}
          optionToggle={optionToggle}
          loading={ah.isLoading}
        />
        <FormControlLabel
          control={
            <Switch
              checked={optionsAll}
              onChange={toggleAll}
              color="secondary"
            />
          }
          label="Alle"
        />
      </PaperContainer>
    </Box>
  );
}

export default Home;

// set state aushilfe, wenn keine aushilfe in autocomplete dann default

// state ah angemeldet -> wenn ausgewählt abmelden statt anmelden

// aushilfe aussuchen -> id in state
// GET daten für aushilfe
//

// station ist eine tabelle mit ausklappen
// bei ausklappen kann man dann gehalt anpassen etc
