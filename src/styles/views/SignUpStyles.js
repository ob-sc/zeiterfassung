import { makeStyles } from '@material-ui/core/styles';
import { common } from '../common';

const styles = (theme) => ({
  ...common,
  root: { width: 'min(1000px, 90%)', padding: '5% 10%' },
  headLine: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  textContainer: {
    width: 'min(500px, 100%)',
  },
});

const useStyles = makeStyles(styles);

export default useStyles;
