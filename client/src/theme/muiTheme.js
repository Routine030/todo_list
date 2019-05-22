import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffb0',
      main: '#ffcc80',
      dark: '#ca9b52',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffddc1',
      main: '#ffab91',
      dark: '##c97b63',
      contrastText: '#000',
    },
  },
  typography: {
    useNextVariants: true,
  },
});
export default theme;