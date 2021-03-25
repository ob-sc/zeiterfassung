import { makeStyles } from '@material-ui/core/styles';

const flex = {
  flexCenterRoot: {
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

export const commonClasses = {
  ...flex,
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
