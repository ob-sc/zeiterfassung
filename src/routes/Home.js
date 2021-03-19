import useStyles from '../styles/routes/HomeStyles';
import useAllAushilfen from '../hooks/useAllAushilfen';
import AHAutocomplete from '../components/AHAutocomplete';

function Home() {
  const classes = useStyles();
  const ah = useAllAushilfen();

  const options = 'all' === true ? ah.all : ah.station;

  return (
    <div className={classes.flexCenterRoot}>
      <AHAutocomplete options={options} />
    </div>
  );
}

export default Home;

// set state aushilfe, wenn keine aushilfe in autocomplete dann default

// state ah angemeldet -> wenn ausgewählt abmelden statt anmelden
