import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import { login } from "../store/actions/userAction";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { InputAdornment, IconButton } from "@material-ui/core/";
import { getCart } from "../store/actions/cartActions";
import { getOrderList } from "../store/actions/orderActions";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

function Copyright() {
  return (
    <Typography variant="body2" color="textPrimary" align="center">
      {"Copyright © "}
      My Website {new Date().getFullYear()}
      {"."}
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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: "3rem",
  },
  error: { color: "red" },
  link: {
    textDecoration: "none",
    color: theme.palette.common.green,
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const SignIn: React.FC<any> = ({ history, setValue }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelpText, setEmailHelpText] = useState("");

  const [password, setPassword] = useState("");
  const [passwordHelpText, setPasswordHelpText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state: any) => state.userLogin);
  const {
    loading = false,
    error,
    userInfo = JSON.parse(localStorage.getItem("userInfo") as string),
  } = userLogin;

  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setValue(0);
    history.push("/");
    dispatch(getCart(userInfo.token));
    dispatch(getOrderList(userInfo.token));
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
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ĐĂNG NHẬP
        </Typography>
        <form className={classes.form} onSubmit={submitHandle}>
          <TextField
            error={emailError}
            helperText={emailHelpText}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />

          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onMouseDown={() => setShowPassword(!showPassword)}
                    onMouseUp={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={passwordError}
            helperText={passwordHelpText}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Đăng nhập
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" className={classes.link}>
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" className={classes.link}>
                {"Chưa có tài khoản? Đăng ký"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Modal
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        text={"Bạn đã đăng nhập thành công"}
        open={open}
      />
    </Container>
  );
};

export default SignIn;
