import { createMuiTheme } from '@material-ui/core/styles';

export const colors = {
  white: '#ffffff',
  offwhite: '#f6f5f4',
  bluewhite: '#f2faff',
  black: '#000000',
  blackish: '#4a4c51',
  brand: '#feed01',
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
    },
    secondary: {
      main: colors.brand,
      contrastText: colors.blackish,
    },
  },
});

theme.props = {
  MuiButton: {
    variant: 'outlined',
    disableRipple: true,
  },
  MuiPaper: {
    square: true,
    elevation: 1,
  },
  MuiAlert: {
    variant: 'outlined',
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
