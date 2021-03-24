import { createMuiTheme } from '@material-ui/core/styles';
import { deDE } from '@material-ui/core/locale';

export const colors = {
  white: '#ffffff',
  offwhite: '#f6f5f4',
  bluewhite: '#f2faff',
  lightGrey: '#dedede',
  black: '#000000',
  blackish: '#4a4c51',
  brand: '#feed01',
  blue: '#0112fe',
  blueish: '#8089ff',
};

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 300,
  },
  palette: {
    background: {
      default: colors.offwhite,
    },
    primary: {
      main: colors.blackish,
      light: colors.lightGrey,
    },
    secondary: {
      main: colors.blueish,
    },
  },
});

theme.props = {
  ...deDE.props,
  MuiButton: {
    variant: 'outlined',
    disableRipple: true,
  },
  MuiPaper: {
    // square: true,
    elevation: 0,
  },
  MuiAppBar: {
    color: 'transparent',
    elevation: 0,
  },
};

theme.overrides = {
  // MuiButtonBase: {
  //   root: {
  //     borderRadius: 0,
  //     textTransform: 'none',
  //   },
  // },
  MuiTouchRipple: {
    child: {
      backgroundColor: colors.bluewhite,
    },
  },
};

export default theme;
