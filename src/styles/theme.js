import { createMuiTheme } from '@material-ui/core/styles';
import { deDE } from '@material-ui/core/locale';

export const colors = {
  white: '#ffffff',
  greywhite: '#fbfbfb',
  offwhite: '#f6f5f4',
  bluewhite: '#f2faff',
  lightGrey: '#e3e3e3',
  grey: '#c0c0c0',
  blackish: '#6e6e6e',
  blueish: '#8089ff',
  brand: '#feed01',
};

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 300,
  },
  palette: {
    background: {
      default: colors.greywhite,
    },
    primary: {
      main: colors.blackish,
      light: colors.grey,
    },
    secondary: {
      main: colors.blueish,
      light: colors.bluewhite,
    },
  },
  props: {
    ...deDE.props,
    MuiButton: {
      variant: 'outlined',
      disableRipple: true,
    },
    MuiPaper: {
      elevation: 0,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
      // label: {
      //   color: colors.black,
      // },
    },
    // MuiTouchRipple: {
    //   child: {
    //     backgroundColor: colors.greywhite,
    //   },
    // },
  },
});

export default theme;
