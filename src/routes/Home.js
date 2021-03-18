import useStyles from '../styles/routes/HomeStyles';
import AHAutocomplete from '../components/AHAutocomplete';

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.flexCenterRoot}>
      <AHAutocomplete />
    </div>
  );
}

export default Home;

// <Home path="/"> {children} </Home> ?
