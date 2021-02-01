import { createMuiTheme, ThemeOptions, Theme } from "@material-ui/core/styles";
import { Palette } from "@material-ui/core/styles/createPalette";
import { TypographyOptions } from "@material-ui/core/styles/createTypography";

interface ITypography extends TypographyOptions {}

interface IPalette extends Palette {
  common: { green: string; black: string; white: string; yellow: string };
}

export interface IThemeOptions extends ThemeOptions {
  palette: IPalette;
  typography: ITypography;
  overrides: any;
  breakpoints: any;
}

const greenColor = "#09496e";
const yellowColor = "#9c8a08";

let theme = createMuiTheme({});

export default createMuiTheme({
  overrides: {
    MuiListItem: {
      divider: {
        borderBottom: `1px solid white`,
      },
    },
    MuiTab: {
      root: {
        [theme.breakpoints.up("sm")]: {
          minWidth: 100,
        },
      },
    },
    MuiFilledInput: {
      input: {
        paddingTop: 15,
        paddingLeft: 12,
        paddingBottom: 15,
      },
    },
    MuiTabs: { indicator: {} },
    MuiToolbar: {
      gutters: {
        paddingLeft: 0,
        paddingRight: 0,
        [theme.breakpoints.up("sm")]: { paddingLeft: 0, paddingRight: 0 },
      },
    },
  },
  palette: {
    common: {
      green: greenColor,
      yellow: yellowColor,
    },
    primary: {
      main: greenColor,
    },
    secondary: {
      main: yellowColor,
    },
  },
  typography: {},
} as IThemeOptions);
