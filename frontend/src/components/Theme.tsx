import { createMuiTheme, ThemeOptions, Theme } from "@material-ui/core/styles";
import { Palette } from "@material-ui/core/styles/createPalette";
import { TypographyOptions } from "@material-ui/core/styles/createTypography";

interface ITypography extends TypographyOptions {}

interface IPalette extends Palette {
  common: {
    green: string;
    black: string;
    white: string;
    yellow: string;
    grey: string;
  };
}

export interface IThemeOptions extends ThemeOptions {
  palette: IPalette;
  typography: ITypography;
  overrides: any;
  breakpoints: any;
}

const greenColor = "#09496e";
const yellowColor = "#dbc412";
const greyColor = "#e6e6e6";

let theme = createMuiTheme({});

export default createMuiTheme({
  overrides: {
    MuiListItem: {
      divider: {
        borderBottom: `1px solid ${greyColor}`,
      },
      root: {
        "&$selected": {
          backgroundColor: `rgba(0, 0, 0, 0)`,
          "&:hover": {
            backgroundColor: `rgba(0, 0, 0, 0)`,
          },
        },
        button: {
          "&:hover": {
            backgroundColor: yellowColor,
          },
        },
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
        paddingTop: 10,
        paddingLeft: 12,
        paddingBottom: 10,
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
    MuiGridList: { root: { width: "100%" } },

    MuiGridListTile: {
      root: {
        maxHeight: "400px",
        maxWidth: "20%",
      },
    },
  },
  palette: {
    common: {
      green: greenColor,
      yellow: yellowColor,
      grey: greyColor,
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