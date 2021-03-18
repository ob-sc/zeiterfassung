import { makeStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    width: 600,
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
    },
  },
  headLine: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  textContainer: {
    width: 500,
    [theme.breakpoints.down('xs')]: {
      width: '80vw',
    },
  },
});

const useStyles = makeStyles(styles);

export default useStyles;
