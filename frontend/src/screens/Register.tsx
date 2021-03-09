import React, { useState, useEffect, useRef } from "react";
import Resizer from "react-image-file-resizer";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteChildrenProps } from "react-router-dom";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import { IThemeOptions } from "../components/Theme";
import { register, login } from "../store/actions/userAction";
import { USER_LOGOUT } from "../store/constants/userConstants";
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
import PublishIcon from "@material-ui/icons/Publish";

const useStyles = makeStyles((theme: IThemeOptions) => ({
  input: { height: "100px" },
  error: { color: "red" },
  uploadContainer: {
    zIndex: 0,
    display: "flex",
    background: "#00bfff",
    cursor: "pointer",
    padding: "10px 0",
  },
  uploadLabel: {
    position: "absolute",
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#00bfff",
    cursor: "pointer",
    color: theme.palette.common.white,
    width: "100px",
    height: "50px",
    transform: "none",
    textTransform: "uppercase",
  },
  upload: {
    position: "absolute",
    top: 0,
    left: 0,
  },
}));

const RegisterScreen = ({
  match,
  location,
  history,
  children,
  setValue,
}: any) => {
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

  const fileField = React.useRef<HTMLInputElement>(null);

  const classes = useStyles();
  const dispatch = useDispatch();
  const userRegister = useSelector((state: any) => state.userRegister);
  let { loading = false, error, userInfo } = userRegister;

  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load something...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        // @ts-ignore
        baseURL = reader.result;
        // console.log(baseURL);
        resolve(baseURL);
      };
      // console.log(baseURL);
      return baseURL;
    });
  };

  const resizeFile = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const handleCloseModal = () => {
    setOpen(false);
    setValue(0);
    history.push("/signin");
  };

  const handleChangeFile = async (e: any) => {
    try {
      const file = e.target.files[0];
      const image = (await resizeFile(file)) as string;
      setAvatar((st: string) => image);
    } catch (err) {
      console.log(err);
    }
  };

  // @ts-ignore
  useEffect(() => {
    console.log(userInfo);
    console.log(avatar);

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
  }, [userInfo, error, dispatch, avatar]);

  const submitHandle = async (e: any) => {
    e.preventDefault();
    dispatch(register(name, email, password, confirmPassword, avatar));
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
              <InputLabel htmlFor="name">Tên</InputLabel>
              <Input
                id="name"
                aria-describedby="name"
                type="text"
                value={name}
                error={nameError}
                onChange={(e: any) => setName(e.target.value.trim())}
              />
              {nameError && (
                <FormHelperText id="name-helper-text" className={classes.error}>
                  {nameHelpText}
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
          <Grid
            item
            container
            justify="center"
            className={classes.input}
            alignItems="center"
          >
            <FormControl style={{ width: 400 }}>
              <InputLabel htmlFor="confirm-password">
                Nhập lại Password
              </InputLabel>
              <Input
                id="confirm-password"
                aria-describedby="password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                error={confirmPasswordError}
                onChange={(e: any) => setConfirmPassword(e.target.value.trim())}
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

              {confirmPasswordError && (
                <FormHelperText
                  id="confirm-password-helper-text"
                  className={classes.error}
                >
                  {confirmPasswordHelpText}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid
            item
            container
            style={{
              position: "relative",
              width: 400,
              display: "flex",
              justifyContent: "space-between",
              height: 100,
            }}
          >
            <Grid
              item
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                style={{
                  width: "100%",
                }}
                variant="body1"
                align="left"
              >
                Ảnh đại diện
              </Typography>
            </Grid>
            <Grid
              item
              style={{ width: 100, display: "flex", alignItems: "center" }}
            >
              <FormControl style={{ height: 50 }}>
                <InputLabel htmlFor="avatar" className={classes.uploadLabel}>
                  <Typography variant="body1">Upload</Typography>
                  <PublishIcon />
                </InputLabel>
                <Input
                  className={classes.upload}
                  id="avatar"
                  inputProps={{
                    accept: "image/png, image/jpeg, image/svg",
                    type: "file",
                  }}
                  onChange={handleChangeFile}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item container justify="center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              Đăng ký
            </Button>
          </Grid>
        </Grid>
      </form>
      <Modal
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        text={"Bạn đã đăng ký thành công, có 1 email đã được gửi cho bạn"}
        open={open}
      />
    </Container>
  );
};

export default RegisterScreen;
