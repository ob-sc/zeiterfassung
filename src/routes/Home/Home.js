import { Box } from '@material-ui/core';
import useCommonStyles from '../../styles/common';
import useAngemeldet from '../../api/useAngemeldet';
import useAushilfen from '../../api/useAushilfen';
import AList from './components/AList';
import Control from './components/Control';
import Details from './components/Details';
import MaxProgress from './components/MaxProgress';
import useHome from './useHome';

function Home() {
  const common = useCommonStyles();
  const aushilfen = useAushilfen();
  const angemeldet = useAngemeldet();

  const { handleInputSelection, handleListSelection } = useHome({
    aushilfen,
    angemeldet,
  });

  return (
    <Box className={common.mdContainer}>
      <Control aushilfen={aushilfen} handleSelection={handleInputSelection} />
      <MaxProgress />
      <Box className={common.flexRowAroundStartWrap}>
        <AList handleSelection={handleListSelection} angemeldet={angemeldet} />
        <Details />
      </Box>
    </Box>
  );
}

export default Home;
