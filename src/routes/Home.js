import { Box } from '@material-ui/core';
import useStyles from '../styles/routes/HomeStyles';
import useAllAushilfen from '../hooks/useAllAushilfen';
import AHAutocomplete from '../components/AHAutocomplete';
import PaperContainer from '../components/PaperContainer';

function Home() {
  const classes = useStyles();
  const ah = useAllAushilfen();

  const options = 'all' === true ? ah.all : ah.station;

  return (
    <Box className={classes.flexCenterRoot}>
      <PaperContainer m={2} p={2}>
        <AHAutocomplete options={options} />
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
