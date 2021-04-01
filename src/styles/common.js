import { makeStyles } from '@material-ui/core/styles';
import { colors } from './theme';

export const layout = {
  centerTransform: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  flexColumnCenter: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexColumnCenterStart: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  flexRowCenter: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRowCenterStartWrap: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  flexGrowItem: {
    flex: '1 0 ',
  },
};

// todo muss eig unten zu (theme) =>
// dann theme.palette.primary.main und .light?
export const buttons = {
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

const useCommonStyles = makeStyles((theme) => ({
  ...layout,
  ...buttons,
  smItem: {
    width: 250,
    [theme.breakpoints.down('xs')]: {
      width: '50vw',
    },
  },
  mdItem: {
    width: 300,
    [theme.breakpoints.down('xs')]: {
      width: '60vw',
    },
  },
  smContainer: {
    width: 420,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: '50vw',
    },
  },
  mdContainer: {
    width: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '60vw',
    },
    [theme.breakpoints.down('xs')]: {
      width: '70vw',
    },
  },
  lgContainer: {
    width: 980,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '80vw',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
    },
  },
  xlContainer: {
    width: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '80vw',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
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
