import { useEffect, useState } from 'react';
import useStyles from '../styles/routes/HomeStyles';
import useAllAushilfen from '../hooks/useAllAushilfen';
import AHAutocomplete from '../components/AHAutocomplete';

function Home() {
  const classes = useStyles();
  const [options, setOptions] = useState([]);
  const ah = useAllAushilfen();

  useEffect(() => {
    setOptions([]);
  }, []);

  return (
    <div className={classes.flexCenterRoot}>
      <AHAutocomplete options={options} />
    </div>
  );
}

export default Home;

// set state aushilfe, wenn keine aushilfe in autocomplete dann default
