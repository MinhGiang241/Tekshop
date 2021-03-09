import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import { IThemeOptions } from "../components/Theme";
import Resizer from "react-image-file-resizer";
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
  Table,
  TableRow,
  TableCell,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { updateProfile } from "../store/actions/userAction";

const useStyles = makeStyles((theme: IThemeOptions) => ({
  inputEdit: {
    flexGrow: 1,
  },
  editButtonWrap: {
    marginLeft: "auto",
    padding: "0",
  },
  avatar: {
    position: "relative",
    "&:hover": {
      "& $upload": { display: "flex" },
      cursor: "pointer",
    },
  },
  tableCell: { padding: "6px 11px" },
  upload: {
    display: "none",
    position: "absolute",
    top: 0,
    width: 200,
    height: 200,
    background: "rgba(0,0,0,0.5)",
    cursor: "pointer",
  },
  uploadIcon: {
    margin: "auto",
    color: theme.palette.common.white,
    fontSize: 60,
  },
}));

const Profile = ({ match, location, history, children, setValue }: any) => {
  const {
    userInfo = JSON.parse(localStorage.getItem("userInfo") as string),
    error,
  } = useSelector((state: any) => state.userLogin);
  const dispatch = useDispatch();
  const { name, email, avatar } = userInfo;
  let errorMessage;
  if (error) {
    errorMessage = error.error;
  }
  const dataAvatar = new TextDecoder().decode(new Uint8Array(avatar.data));
  const theme = useTheme();
  const classes = useStyles();
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedAvatar, setUpdatedAvatar] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");

  const [imageName, setImageName] = useState("");

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

  const handleChangeFile = async (e: any) => {
    try {
      const file = e.target.files[0];
      setImageName(file.name);
      const image = (await resizeFile(file)) as string;
      setUpdatedAvatar(image);
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandle = (e: any) => {
    dispatch(
      updateProfile(
        updatedAvatar === "" ? undefined : updatedAvatar,
        updatedName,
        updatedEmail,
        updatedPassword === "" ? undefined : updatedPassword,
        userInfo.token
      )
    );

    setEditName(false);
    setEditEmail(false);
    setEditPassword(false);
    setUpdatedPassword("");
  };
  useEffect(() => {}, [dispatch, avatar, name, email]);
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item lg={3}>
          <Grid item container>
            <Typography variant="h5" gutterBottom align="center">
              THÔNG TIN NGƯỜI DÙNG
            </Typography>
          </Grid>
          <Grid
            item
            container
            justify="center"
            direction="column"
            alignItems="center"
            className={classes.avatar}
          >
            <img
              src={dataAvatar}
              alt="avatar"
              width={200}
              height={200}
              className={classes.avatar}
            />
            <InputLabel htmlFor="upload-avatar" className={classes.upload}>
              <PhotoCameraIcon className={classes.uploadIcon} />
            </InputLabel>
            <Input
              id="upload-avatar"
              style={{ display: "none" }}
              type="file"
              onChange={handleChangeFile}
            />
            {imageName ? (
              <Typography
                variant="body1"
                // @ts-ignore
                style={{ color: theme.palette.common.green }}
              >
                {imageName}
              </Typography>
            ) : null}
          </Grid>
          <Grid item container>
            <Table>
              <TableRow>
                <TableCell className={classes.tableCell}>
                  <Typography variant="body1" align="right">
                    Vai trò :
                  </Typography>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Typography variant="body1">
                    {userInfo.isAdmin ? "Admin" : "người dùng"}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableCell}>
                  <Typography variant="body1" align="right">
                    Tên :
                  </Typography>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {editName ? (
                    <Input
                      id="name"
                      className={classes.inputEdit}
                      value={updatedName}
                      autoFocus
                      onChange={(e: any) => setUpdatedName(e.target.value)}
                    />
                  ) : (
                    <Typography variant="body1">{updatedName}</Typography>
                  )}
                </TableCell>
                <TableCell className={classes.editButtonWrap}>
                  <IconButton
                    onClick={() => {
                      setEditName(!editName);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableCell}>
                  <Typography variant="body1" align="right">
                    Email:
                  </Typography>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {editEmail ? (
                    <Input
                      autoFocus
                      className={classes.inputEdit}
                      value={updatedEmail}
                      onChange={(e: any) => setUpdatedEmail(e.target.value)}
                    />
                  ) : (
                    <Typography variant="body1">{updatedEmail}</Typography>
                  )}
                </TableCell>
                <TableCell className={classes.editButtonWrap}>
                  <IconButton onClick={() => setEditEmail(!editEmail)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableCell}>
                  <Typography variant="body1" align="right">
                    Password:
                  </Typography>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {editPassword ? (
                    <Input
                      autoFocus
                      className={classes.inputEdit}
                      value={updatedPassword}
                      onChange={(e: any) => setUpdatedPassword(e.target.value)}
                    />
                  ) : (
                    <Typography variant="body1">
                      {updatedPassword === "" ? "*********" : updatedPassword}
                    </Typography>
                  )}
                </TableCell>
                <TableCell className={classes.editButtonWrap}>
                  <IconButton onClick={() => setEditPassword(!editPassword)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </Table>
          </Grid>
          <Grid item container justify="center">
            {errorMessage && (
              <Typography
                variant="body1"
                align="center"
                style={{ width: "100%", color: "red" }}
              >
                {errorMessage}
              </Typography>
            )}
          </Grid>
          <Grid item container justify="center">
            <Button
              variant="contained"
              color="primary"
              disabled={
                name === updatedName &&
                email === updatedEmail &&
                updatedPassword === "" &&
                updatedAvatar === ""
              }
              onClick={submitHandle}
            >
              Update
            </Button>
          </Grid>
        </Grid>
        <Grid item lg></Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
