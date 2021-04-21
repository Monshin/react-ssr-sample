// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Theme } from '@material-ui/core/styles/createMuiTheme';

interface FontSizeOption {
  default: React.CSSProperties['fontSize'];
  size12: React.CSSProperties['fontSize'];
  size13: React.CSSProperties['fontSize'];
  size14: React.CSSProperties['fontSize'];
  size15: React.CSSProperties['fontSize'];
  size16: React.CSSProperties['fontSize'];
  size17: React.CSSProperties['fontSize'];
  size18: React.CSSProperties['fontSize'];
  size19: React.CSSProperties['fontSize'];
  size20: React.CSSProperties['fontSize'];
  size25: React.CSSProperties['fontSize'];
}

interface ColorOption {
  default: React.CSSProperties['color'];
  title: React.CSSProperties['color'];
}

interface PageOption {
  appBarHeight: number;
  maxWidth: number;
  marginBottom: number;
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    fontSize: FontSizeOption;
    color: ColorOption;
    page: PageOption;
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    fontSize: FontSizeOption;
    color: ColorOption;
    page: PageOption;
  }
}
