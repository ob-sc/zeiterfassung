import { makeStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    '& a': {
      textDecoration: 'none',
    },
  },
};

const useStyles = makeStyles(styles);

export default useStyles;
