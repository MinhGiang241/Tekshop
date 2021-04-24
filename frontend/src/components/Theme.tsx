import { createMuiTheme, ThemeOptions, Theme } from "@material-ui/core/styles";
import { Palette } from "@material-ui/core/styles/createPalette";
import { TypographyOptions } from "@material-ui/core/styles/createTypography";

interface ITypography extends TypographyOptions {
  body3: any;
}

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
    MuiCssBaseline: {
      "@global": {
        "*, *::before, *::after": {
          boxSizing: "content-box",
        },
        img: { display: "bock" },
        a: {
          textDecoration: "none",
          color: greenColor,
        },
        ul: {
          margin: 0,
          padding: 0,
          listStyle: "none",
        },
      },
    },

    MuiTypography: {
      colorTextPrimary: { color: "black" },
      colorTextSecondary: { color: "white" },
    },
    table: {
      borderColor: "grey",
    },
    MuiContainer: {
      root: {
        backgroundColor: "#fff",
      },
    },
    MuiFormLabel: {
      root: {
        color: theme.palette.common.black,
      },
    },
    buttonWrapper: {
      position: "absolute",
      height: "100% !important",
      backgroundColor: "transparent",
      top: "calc(50% - 70px)",
      "&:hover": {
        "& $button": {
          backgroundColor: "black",
          filter: "brightness(120%)",
          opacity: "0.4",
        },
      },
    },
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
      textColorSecondary: { color: "#fff" },
      root: {
        [theme.breakpoints.up("sm")]: {
          minWidth: 100,
        },
        color: "#fff",
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
  typography: {
    body3: {
      fontFamily: "Roboto" || "Helvetica" || "Arial" || "sans-serif",
      fontWeight: 300,
      fontSize: "0.6rem",
      lineHeight: 1.2,
      letterSpacing: "0.008em",
    },
  },
} as IThemeOptions);
