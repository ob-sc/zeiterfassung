import useCommonStyles from '../../styles/common';
import BorderContainer from '../../components/BorderContainer';
import magnifyingGlass from '../../images/magnifying-glass.svg';

function NotFound() {
  const common = useCommonStyles();

  return (
    <div className={common.centerTransform}>
      <BorderContainer m={2} p={10}>
        <div textAlign="center">
          <h1>Seite nicht gefunden</h1>
          <img src={magnifyingGlass} alt="lupe" width="150px" />
        </div>
      </BorderContainer>
    </div>
  );
}

export default NotFound;

// /api sollte wegen nginx konfig nie kommen
