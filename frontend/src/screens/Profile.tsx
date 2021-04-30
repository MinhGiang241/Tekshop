import React from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import UserProfile from "../components/Update";
import Shipping from "../components/ShippingForm";
import UserOrders from "../components/UserOrders";
import { Grid } from "@material-ui/core";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Container,
} from "@material-ui/core/";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    border: `1px solid rgba(0,0,0,0.5)`,
    boxShadow: "10px 10px rgba(0,0,0,0.5)",
    borderRadius: "10px",
    paddingTop: "10px",
  },
}));

const Profile: React.FC<any> = ({ value, setValue }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container>
        <Grid item lg={4} md={12}>
          <UserProfile />
        </Grid>
        <Grid item lg={8} md={12}>
          <UserOrders />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
