import { makeStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    minHeight: '100vh',
    '& a': {
      textDecoration: 'none',
    },
  },
};

const useStyles = makeStyles(styles);

export default useStyles;
