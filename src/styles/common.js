import { makeStyles } from '@material-ui/core/styles';
import { colors } from './theme';

const layout = {
  centerTransform: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  flexRowCenter: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
};

const buttons = {
  button: {
    color: colors.black,
    '&:disabled': {
      color: colors.grey,
    },
  },
  iconButton: {
    '& svg': {
      fontSize: 35,
    },
  },
};

export const commonClasses = {
  ...layout,
  ...buttons,
};

const useCommonStyles = makeStyles((theme) => ({
  ...commonClasses,
  input: {
    width: 300,
    [theme.breakpoints.down('xs')]: {
      width: '60vw',
    },
  },
  smContainer: {
    width: 420,
    [theme.breakpoints.down('xs')]: {
      width: '50vw',
    },
  },
  mdContainer: {
    width: 600,
    [theme.breakpoints.down('xs')]: {
      width: '70vw',
    },
  },
  lgContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 980,
    [theme.breakpoints.down('xs')]: {
      width: '80vw',
    },
  },
}));

export default useCommonStyles;

/*
 *           ACHTUNG
 * Klassen dürfen nicht root oder
 * Namen aus jss haben, sonst geht
 * style = { ...common, root: {  }}
 * oder alles nicht mehr
 */
