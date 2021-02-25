import React from "react";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import { IThemeOptions } from "./Theme";
import { IconButton, Typography, Grid, Toolbar } from "@material-ui/core";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme: IThemeOptions) => ({
  footer: {
    position: "absolute",
    minHeight: "8em",
    width: "100%",
    backgroundColor: theme.palette.common.green,
  },
  socialContainer: {
    position: "absolute",
    right: "1.5em",
    [theme.breakpoints.down("xs")]: {
      right: "0.6em",
    },
  },
  container: {
    height: "8em",
  },
  iconButton: {
    marginTop: "auto",
    marginLeft: "auto",
    marginRight: 2,
    marginBottom: 2,
  },
  icon: { fontSize: 40, color: theme.palette.common.white },
  text: { color: theme.palette.common.white },
}));

function Footer() {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Toolbar className={classes.container}>
        <Grid
          container
          justify="flex-end"
          alignItems="flex-end"
          spacing={2}
          className={classes.socialContainer}
          style={{ height: "100%" }}
        >
          <Grid item>
            <Typography variant="body1" className={classes.text}>
              Liên hệ :
            </Typography>
          </Grid>
          <Grid item component="a" href="http://facebook.com" target="_blank">
            <FacebookIcon className={classes.icon} />
          </Grid>
          <Grid item component="a" href="http://istagram.com" target="_blank">
            <InstagramIcon className={classes.icon} />
          </Grid>
          <Grid item component="a" href="http://twitter.com" target="_blank">
            <TwitterIcon className={classes.icon} />
          </Grid>
        </Grid>
      </Toolbar>
    </footer>
  );
}

export default Footer;
