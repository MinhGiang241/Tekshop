import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import { register, login } from "../store/actions/userAction";
import { USER_LOGOUT } from "../store/constants/userConstants";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { InputAdornment, IconButton } from "@material-ui/core/";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

function Copyright() {
  return (
    <Typography variant="body2" color="textPrimary" align="center">
      {"Copyright © "}
      My Website
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme: any) => ({
  root: {
    border: `1px solid rgba(0,0,0,0.5)`,
    boxShadow: "10px 10px rgba(0,0,0,0.5)",
    borderRadius: "10px",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: "3rem",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.green,
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const SignUp: React.FC<any> = ({ history, setValue }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [nameHelpText, setNameHelpText] = useState("");
  const [nameError, setNameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailHelpText, setEmailHelpText] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordHelpText, setPasswordHelpText] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordHelpText, setConfirmPasswordHelpText] = useState("");

  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const userRegister = useSelector((state: any) => state.userRegister);
  let { loading = false, error, userInfo } = userRegister;

  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setValue(0);
    history.push("/signin");
  };

  // @ts-ignore
  useEffect(() => {
    if (userInfo) {
      setNameError(false);
      setEmailError(false);
      setPasswordError(false);
      setConfirmPasswordError(false);
      setOpen(true);
    } else if (error) {
      const { validationErrors } = error;
      if (validationErrors) {
        const nameDataError = validationErrors.find(
          (i: any) => i.param === "name"
        );
        const emailDataError = validationErrors.find(
          (i: any) => i.param === "email"
        );
        const passwordDataError = validationErrors.find(
          (i: any) => i.param === "password"
        );
        const confirmPasswordDataError = validationErrors.find(
          (i: any) => i.param === "confirmPassword"
        );
        if (nameDataError) {
          setNameError(true);
          setNameHelpText(nameDataError.msg);
        } else {
          setEmailError(false);
        }
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
        if (confirmPasswordDataError) {
          setConfirmPasswordError(true);
          setConfirmPasswordHelpText(confirmPasswordDataError.msg);
        } else {
          setConfirmPasswordError(false);
        }
      }
    }
    return dispatch({ type: USER_LOGOUT });
  }, [userInfo, error, dispatch]);

  const submitHandle = async (e: any) => {
    e.preventDefault();
    dispatch(register(name, email, password, confirmPassword, avatar));
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ĐĂNG KÝ
        </Typography>
        <form onSubmit={submitHandle} noValidate className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={nameError}
                helperText={nameHelpText}
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Tên"
                name="name"
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={emailError}
                helperText={emailHelpText}
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={passwordError}
                helperText={passwordHelpText}
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                autoComplete="password"
                InputProps={{
                  endAdornment: (
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
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={confirmPasswordError}
                helperText={confirmPasswordHelpText}
                value={confirmPassword}
                onChange={(e: any) => setConfirmPassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                name="confirm-password"
                label="Nhập lại Password"
                type={showPassword ? "text" : "password"}
                id="confirm-password"
                autoComplete="confirm-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onMouseDown={() => setShowPassword(!showPassword)}
                        onMouseUp={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Nhận thông tin, quảng cáo qua email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            ĐĂNG KÝ
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" className={classes.link}>
                Đã có tài khoản? Đăng nhập
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <Modal
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        text={"Bạn đã đăng ký thành công, có 1 email đã được gửi cho bạn"}
        open={open}
      />
    </Container>
  );
};

export default SignUp;
