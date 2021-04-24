import React from "react";
import { makeStyles, useTheme, Grid } from "@material-ui/core";
import { IThemeOptions } from "../components/Theme";

const useStyles = makeStyles((theme: IThemeOptions) => ({
  container: {
    backgroundColor: theme.palette.common.white,
    display: "flex",
    justifyContent: "center",
    maxWidth: 1000,
    border: `1px solid rgba(0,0,0,0.5)`,
    boxShadow: "10px 10px rgba(0,0,0,0.5)",
    borderRadius: "10px",
  },
}));

const FormContainer: React.FC<any> = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.container}>
      <Grid item>{children}</Grid>
    </Grid>
  );
};

export default FormContainer;
