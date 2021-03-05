import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteChildrenProps } from "react-router-dom";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import { IThemeOptions } from "../components/Theme";
import { login } from "../store/actions/userAction";
import {
  Container,
  Grid,
  Typography,
  Select,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles((theme: IThemeOptions) => ({}));
const Form = ({ children, signIn, singUp }: any) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const submitHandle = (e: any) => {};
  return (
    <Container maxWidth="lg">
      <Grid container justify="center" alignItems="center">
        <form onSubmit={submitHandle}></form>
      </Grid>
    </Container>
  );
};

export default Form;
