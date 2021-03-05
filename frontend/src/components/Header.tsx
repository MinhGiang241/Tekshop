import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IThemeOptions } from "./Theme";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  AppBar,
  Toolbar,
  useScrollTrigger,
  Button,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Paper,
  useMediaQuery,
  Hidden,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { USER_LOGOUT } from "../store/constants/userConstants";
import logo from "../assets/logo.png";
import { useHistory } from "react-router-dom";
import Modal from "../components/Modal";

interface Props {
  window?: () => Window;
  children?: React.ReactElement | any;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme: IThemeOptions) =>
  createStyles({
    toolBar: {},
    logoContainer: {
      marginLeft: "2em",
    },
    logo: {
      maxHeight: "3em",
    },
    headerTab: {
      maxWidth: "7em",
      paddingLeft: 2,
      paddingRight: 2,
      "& button": { margin: "auto" },
    },

    list: {
      display: "flex",
      color: theme.palette.common.white,
      width: "100%",
      marginLeft: "1em",
      marginRight: "1em",
      [theme.breakpoints.down("md")]: { marginLeft: 0 },
    },
    space: {
      display: "block",
      width: "100%",
    },
    search: { width: "100%", height: "2.5em" },
    menu: {
      marginLeft: 12,
      fontSize: 40,
      color: theme.palette.common.white,
    },
    drawer: {
      minWidth: "20em",
      backgroundColor: theme.palette.common.green,
      borderBottom: `1px solid ${theme.palette.common.yellow}`,
    },
    drawItem: {
      color: theme.palette.common.white,
    },
    headerText: {
      color: theme.palette.common.white,
      margin: "auto",
      fontSize: 11,
    },
    active: {
      backgroundColor: theme.palette.common.green,
    },
    link: {
      textDecoration: "none",
      color: "inherit",
    },
  })
);

export default function Header(props: any) {
  const theme = useTheme();
  const { value, setValue, history, location } = props;
  const iOS =
    (process as any).browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const userInfo = useSelector((state: any) => state.userLogin.userInfo);

  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setValue(0);
  };

  useEffect(() => {
    switch (window.location.pathname) {
      case "/":
        if (value !== 0 && !matchesSM) {
          setValue(0);
        }
        break;
      case "/products":
        if (value !== 1 && !matchesSM) {
          setValue(1);
        }
        break;
      case "/admin/products":
        if (value !== 2 && !matchesSM) {
          setValue(2);
        }
        break;
      case "/admin":
        if (value !== 3 && !matchesSM) {
          setValue(3);
        }
        break;
      case "/signup":
        if (value !== 5 && !matchesSM) {
          setValue(4);
        }
        break;
      case "/signin":
        if (value !== 6 && !matchesSM) {
          setValue(5);
        }
        break;
      default:
        setValue(9);
        break;
    }
  }, [value, matchesSM, history]);

  const tabs = (
    <List disablePadding className={classes.list}>
      {matchesSM ? null : (
        <ListItem
          className={classes.headerTab}
          component={Link}
          to="/"
          selected={value === 0}
          onClick={() => setValue(0)}
          classes={{ selected: classes.active }}
        >
          <Button
            // @ts-ignore
            variant={value === 0 ? "contained" : "text"}
            color="secondary"
          >
            <Typography
              variant="button"
              align="center"
              className={classes.headerText}
            >
              Trang Chủ
            </Typography>
          </Button>
        </ListItem>
      )}
      {matchesSM ? null : (
        <ListItem
          className={classes.headerTab}
          component={Link}
          to="/products"
          selected={value === 1}
          onClick={() => setValue(1)}
        >
          <Button
            // @ts-ignore
            variant={value === 1 ? "contained" : "text"}
            color="secondary"
          >
            <Typography
              variant="button"
              align="center"
              className={classes.headerText}
            >
              Sản Phẩm
            </Typography>
          </Button>
        </ListItem>
      )}
      {matchesSM ? null : (
        <ListItem
          className={classes.headerTab}
          component={Link}
          to="/admin/products"
          selected={value === 2}
          onClick={() => setValue(2)}
        >
          <Button
            // @ts-ignore
            variant={value === 2 ? "contained" : "text"}
            color="secondary"
          >
            <Typography
              variant="button"
              align="center"
              className={classes.headerText}
            >
              Chỉnh Sửa
            </Typography>
          </Button>
        </ListItem>
      )}
      {matchesSM ? null : (
        <ListItem
          className={classes.headerTab}
          component={Link}
          to="/admin"
          selected={value === 3}
          onClick={() => setValue(3)}
        >
          <Button
            // @ts-ignore
            variant={value === 3 ? "contained" : "text"}
            color="secondary"
          >
            <Typography
              variant="button"
              align="center"
              className={classes.headerText}
            >
              Thống kê
            </Typography>
          </Button>
        </ListItem>
      )}
      {matchesXS ? null : (
        <ListItem>
          <Paper
            style={{
              width: "100%",
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <TextField
              autoFocus={false}
              placeholder="Tìm kiếm sản phẩm..."
              className={classes.search}
              variant="filled"
              fullWidth
              // value={search}
              // onChange={handleSearch}
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end" style={{ cursor: "pointer" }}>
                    <IconButton>
                      <SearchIcon color="primary" style={{ fontSize: 40 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Paper>
        </ListItem>
      )}
      {userInfo ? (
        <ListItem
          className={classes.headerTab}
          style={{ marginLeft: matchesSM ? "auto" : undefined }}
        >
          <IconButton
            style={{ color: theme.palette.common.white }}
            onClick={handleClick}
            aria-controls="profile-menu"
            aria-haspopup="true"
          >
            <PersonIcon />
            <Typography variant="body1">{userInfo.name}</Typography>
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link className={classes.link} to="/profile">
                Hồ sơ
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className={classes.link} to="/cart">
                Giỏ hàng
              </Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setOpen(true);
                dispatch({ type: USER_LOGOUT });
              }}
            >
              <Link className={classes.link} to="/">
                Đăng xuất
              </Link>
            </MenuItem>
          </Menu>
        </ListItem>
      ) : (
        <>
          <ListItem
            component={Link}
            to="/signup"
            selected={value === 4}
            style={{ marginLeft: matchesSM ? "auto" : undefined }}
            onClick={() => setValue(4)}
            className={classes.headerTab}
          >
            <Button
              // @ts-ignore
              variant={value === 4 ? "contained" : "text"}
              color="secondary"
            >
              <Typography
                variant="button"
                align="center"
                className={classes.headerText}
              >
                Đăng Ký
              </Typography>
            </Button>
          </ListItem>

          <ListItem
            component={Link}
            to={`/signin`}
            selected={value === 5}
            onClick={() => setValue(5)}
            className={classes.headerTab}
          >
            <Button
              // @ts-ignore
              variant={value === 5 ? "contained" : "text"}
              color="secondary"
            >
              <Typography
                variant="button"
                align="center"
                className={classes.headerText}
              >
                Đăng Nhập
              </Typography>
            </Button>
          </ListItem>
        </>
      )}
    </List>
  );

  const drawer = (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
      onOpen={() => setOpenDrawer(true)}
      classes={{ paper: classes.drawer }}
    >
      <List disablePadding>
        {matchesXS ? (
          <ListItem divider className={classes.drawItem}>
            <TextField
              autoFocus={false}
              placeholder="Tìm kiếm sản phẩm..."
              className={classes.search}
              variant="filled"
              // value={search}
              // onChange={handleSearch}
              InputProps={{
                style: { backgroundColor: "white", overflow: "hidden" },
                endAdornment: (
                  <InputAdornment position="end" style={{ cursor: "pointer" }}>
                    <IconButton>
                      <SearchIcon color="primary" style={{ width: 30 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </ListItem>
        ) : null}
        <ListItem
          divider
          button
          component={Link}
          to="/"
          selected={value === 0}
          style={{
            backgroundColor:
              // @ts-ignore
              value === 0 ? theme.palette.common.yellow : undefined,
          }}
          onClick={() => {
            setOpenDrawer(false);
            setValue(0);
          }}
        >
          <ListItemText disableTypography className={classes.drawItem}>
            TRANG CHỦ
          </ListItemText>
        </ListItem>

        <ListItem
          divider
          button
          component={Link}
          to="/products"
          selected={value === 1}
          style={{
            backgroundColor:
              // @ts-ignore
              value === 1 ? theme.palette.common.yellow : undefined,
          }}
          onClick={() => {
            setOpenDrawer(false);
            setValue(1);
          }}
        >
          <ListItemText disableTypography className={classes.drawItem}>
            SẢN PHẨM
          </ListItemText>
        </ListItem>
        <ListItem
          divider
          button
          component={Link}
          to="/admin/products"
          selected={value === 2}
          style={{
            backgroundColor:
              // @ts-ignore
              value === 2 ? theme.palette.common.yellow : undefined,
          }}
          onClick={() => {
            setOpenDrawer(false);
            setValue(2);
          }}
        >
          <ListItemText disableTypography className={classes.drawItem}>
            THÊM SẢN PHẨM
          </ListItemText>
        </ListItem>
        <ListItem
          divider
          button
          component={Link}
          to="/admin"
          selected={value === 3}
          style={{
            backgroundColor:
              // @ts-ignore
              value === 3 ? theme.palette.common.yellow : undefined,
          }}
          onClick={() => {
            setOpenDrawer(false);
            setValue(3);
          }}
        >
          <ListItemText disableTypography className={classes.drawItem}>
            THỐNG KÊ
          </ListItemText>
        </ListItem>
      </List>
    </SwipeableDrawer>
  );

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="fixed">
          <Toolbar color="primary" className={classes.toolBar}>
            <Hidden mdDown>
              <Button
                component={Link}
                to="/"
                className={classes.logoContainer}
                onClick={() => {
                  setValue(0);
                }}
                disableRipple
              >
                <img alt="company logo" src={logo} className={classes.logo} />
              </Button>
            </Hidden>
            <Hidden mdUp>
              <IconButton
                onClick={() => setOpenDrawer((st) => !openDrawer)}
                disableRipple
              >
                <MenuIcon className={classes.menu} />
              </IconButton>
            </Hidden>
            <Grid container>{tabs}</Grid>
          </Toolbar>
          {drawer}
        </AppBar>
      </ElevationScroll>
      <Modal
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        text={"Bạn đã đăng xuất thành công"}
        open={open}
      />
      <div style={{ width: "100%", height: "6em" }} />
    </>
  );
}
