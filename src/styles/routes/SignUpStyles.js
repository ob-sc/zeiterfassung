import { makeStyles } from '@material-ui/core/styles';
import { common } from '../common';

const styles = (theme) => ({
  ...common,
  root: {
    width: 600,
    [theme.breakpoints.down('md')]: {
      width: '90vw',
    },
  },
  headLine: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  textContainer: {
    width: 500,
    [theme.breakpoints.down('md')]: {
      width: '80vw',
    },
  },
});

const useStyles = makeStyles(styles);

export default useStyles;
