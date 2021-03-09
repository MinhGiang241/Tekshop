import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import { IThemeOptions } from "../components/Theme";
import { login } from "../store/actions/userAction";
import {
  Container,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  InputAdornment,
  IconButton,
  Typography,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { getCart } from "../store/actions/cartAction";

const useStyles = makeStyles((theme: IThemeOptions) => ({
  input: { height: 100 },
  error: { color: "red" },
}));

const LoginScreen = ({ match, location, history, children, setValue }: any) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelpText, setEmailHelpText] = useState("");

  const [password, setPassword] = useState("");
  const [passwordHelpText, setPasswordHelpText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: any) => state.userLogin);
  const {
    loading = false,
    error,
    userInfo = JSON.parse(localStorage.getItem("userInfo") as string),
  } = userLogin;

  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setValue(0);
    history.push("/");
    dispatch(getCart(userInfo.token));
  };

  useEffect(() => {
    if (userInfo) {
      setEmailError(false);
      setPasswordError(false);
      setOpen(true);
    } else if (error) {
      const { validationErrors } = error;
      if (validationErrors) {
        const emailDataError = validationErrors.find(
          (i: any) => i.param === "email"
        );
        const passwordDataError = validationErrors.find(
          (i: any) => i.param === "password"
        );

        if (emailDataError) {
          setEmailError(true);
          setEmailHelpText(emailDataError.msg);
        } else {
          setEmailError(false);
        }
        if (passwordDataError) {
          setPasswordError(true);
          setPasswordHelpText(passwordDataError.msg);
        } else {
          setPasswordError(false);
        }
      }
    }
  }, [userInfo, error]);

  const submitHandle = async (e: any) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container maxWidth="lg">
      <form onSubmit={submitHandle} noValidate autoComplete="off">
        <Grid container justify="center" alignItems="center">
          <Grid
            item
            container
            justify="center"
            className={classes.input}
            alignItems="center"
          >
            <FormControl style={{ width: 400 }}>
              <InputLabel htmlFor="email">Email </InputLabel>
              <Input
                id="email"
                aria-describedby="email-address"
                type="text"
                value={email}
                error={emailError}
                onChange={(e: any) => setEmail(e.target.value.trim())}
              />
              {emailError && (
                <FormHelperText
                  id="email-helper-text"
                  className={classes.error}
                >
                  {emailHelpText}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid
            item
            container
            justify="center"
            className={classes.input}
            alignItems="center"
          >
            <FormControl style={{ width: 400 }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                aria-describedby="password"
                type={showPassword ? "text" : "password"}
                value={password}
                error={passwordError}
                onChange={(e: any) => setPassword(e.target.value.trim())}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />

              {passwordError && (
                <FormHelperText
                  id="password-helper-text"
                  className={classes.error}
                >
                  {passwordHelpText}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item style={{ width: 300 }}>
            <Grid item container justify="space-between">
              <Grid item>
                <Typography>Quên mật khẩu</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  Đăng nhập
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Modal
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        text={"Bạn đã đăng nhập thành công"}
        open={open}
      />
    </Container>
  );
};

export default LoginScreen;
