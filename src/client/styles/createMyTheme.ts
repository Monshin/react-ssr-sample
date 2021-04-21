import createMuiTheme, { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export default function createMyTheme(options?: ThemeOptions) {
  const fontSize: ThemeOptions['fontSize'] = {
    default: '1rem',
    size12: '0.75rem',
    size13: '0.8125rem',
    size14: '0.875rem',
    size15: '0.9375rem',
    size16: '1rem',
    size17: '1.0625rem',
    size18: '1.125rem',
    size19: '1.1875rem',
    size20: '1.25rem',
    size25: '1.5625rem',
  };

  const color: ThemeOptions['color'] = {
    default: '#4a4a4a',
    title: '#000000',
  };

  const mainColor = '#8e56d5';

  return createMuiTheme({
    ...options,
    typography: {
      fontFamily: '"Microsoft JhengHei", "PingFangTC", Arial, sans-serif',
      fontSize: 16,
    },
    fontSize,
    color,
    palette: {
      primary: {
        main: mainColor,
      },
      background: {
        default: '#f8f8f8',
        paper: '#ffffff',
      },
    },
    page: {
      appBarHeight: 50,
      maxWidth: 1000,
      marginBottom: 30,
    },
    overrides: {
      MuiTypography: {
        body2: {
          fontSize: fontSize.default,
        },
      },
    },
  });
}
