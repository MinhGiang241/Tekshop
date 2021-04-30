import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import { IThemeOptions } from "../components/Theme";
import Resizer from "react-image-file-resizer";
import {
  Grid,
  Button,
  InputLabel,
  Input,
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
  inputEdit: { width: "100%", height: "100%" },
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
  tableRow: {},
  tableCell: { maxHeight: "20px", padding: "8px" },
  tableCellContent: {
    maxWidth: "180px",
    minWidth: "180px",
    padding: "0px",
  },
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

const Profile: React.FC<any> = ({
  match,
  location,
  history,
  children,
  setValue,
}) => {
  const {
    userInfo = JSON.parse(localStorage.getItem("userInfo") as string),
    error,
    loading,
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

  const resizeFile = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        100,
        100,
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

      const image = (await resizeFile(file)) as string;
      setUpdatedAvatar(image);
    } catch (err) {
      console.log(err);
    }
  };

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    submitHandle();
  }, [updatedAvatar]);

  const submitHandle = () => {
    dispatch(
      updateProfile(
        updatedAvatar === "" ? undefined : updatedAvatar,
        updatedName,
        updatedEmail,
        updatedPassword === "" ? "*****" : updatedPassword,
        userInfo.token
      )
    );

    setEditName(false);
    setEditEmail(false);
    setEditPassword(false);
    setUpdatedPassword("");
  };
  return (
    <Grid
      container
      justify="center"
      style={{ backgroundColor: "transparent", paddingBottom: "30px" }}
    >
      <Grid container justify="center">
        <Grid container item>
          {loading ? (
            <Grid
              container
              style={{ height: 500 }}
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Loading />
              </Grid>
            </Grid>
          ) : (
            <>
              <Grid item container>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="center"
                  style={{ width: "100%" }}
                >
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
                  //@ts-ignore
                  src={updatedAvatar === "" ? dataAvatar : updatedAvatar}
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
                        {userInfo.isAdmin ? "Admin" : "Người dùng"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableCell}>
                      <Typography variant="body1" align="right">
                        Tên :
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.tableCellContent}>
                      {editName ? (
                        <input
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
                  <TableRow className={classes.tableRow}>
                    <TableCell className={classes.tableCell}>
                      <Typography variant="body1" align="right">
                        Email:
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.tableCellContent}>
                      {editEmail ? (
                        <input
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
                    <TableCell className={classes.tableCellContent}>
                      {editPassword ? (
                        <input
                          autoFocus
                          className={classes.inputEdit}
                          value={updatedPassword}
                          onChange={(e: any) =>
                            setUpdatedPassword(e.target.value)
                          }
                        />
                      ) : (
                        <Typography variant="body1">
                          {updatedPassword === ""
                            ? "*********"
                            : updatedPassword}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell className={classes.editButtonWrap}>
                      <IconButton
                        onClick={() => setEditPassword(!editPassword)}
                      >
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
                    loading ||
                    (name === updatedName &&
                      email === updatedEmail &&
                      updatedPassword === "")
                  }
                  onClick={submitHandle}
                >
                  Update
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
