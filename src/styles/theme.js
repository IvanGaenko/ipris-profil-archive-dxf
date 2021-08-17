// UI Imports
import { createTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import lightBlue from '@material-ui/core/colors/lightBlue';
import deepPurple from '@material-ui/core/colors/deepPurple';
import deepOrange from '@material-ui/core/colors/deepOrange';

const getTheme = (darkState) => {
  const palletType = darkState ? 'dark' : 'light';
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const scrollBarColor = darkState ? '#ccc' : '#ccc';
  const scrollBarColorHover = darkState ? '#606060' : '#606060';

  const theme = createTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          'body::-webkit-scrollbar': {
            width: '16px',
          },
          'body::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          'body::-webkit-scrollbar-thumb': {
            width: '8px',
            height: '56px',
            backgroundColor: scrollBarColor,
            borderRadius: '8px',
            border: '4px solid transparent',
            backgroundClip: 'content-box',
            '&:hover': {
              backgroundColor: scrollBarColorHover,
            },
          },
        },
      },
    },
  });

  return theme;
};

export default getTheme;
