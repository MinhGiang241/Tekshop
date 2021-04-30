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
  useMediaQuery,
  Hidden,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Menu,
  MenuItem,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { USER_LOGOUT } from "../store/constants/userConstants";
import logo from "../assets/logo.png";
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

const Header: React.FC<any> = (props) => {
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
  const userLogin = useSelector((state: any) => state.userLogin);

  const {
    loading = false,
    error,
    userInfo = JSON.parse(localStorage.getItem("userInfo") as string),
  } = userLogin;

  const cart = useSelector((state: any) => state.cart.cartItems) || [];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        if (value !== 0) {
          setValue(0);
        }
        break;
      case "/signin":
        if (value !== 1) {
          setValue(1);
        }
        break;
      case "/signup":
        if (value !== 2) {
          setValue(2);
        }
        break;
      case "/profile":
        if (value !== 3) {
          setValue(3);
        }
        break;
      case "/cart":
        if (value !== 4) {
          setValue(4);
        }
        break;
      default:
        setValue(0);
        break;
    }
  }, [value, matchesSM, history]);

  const handleChange = (e: React.ChangeEvent<any>, newValue: Number) => {
    if (newValue === 5) {
      setValue(0);
      handleOpenModal();
      dispatch({ type: USER_LOGOUT });
    }
    setOpenDrawer(false);
    setValue(newValue);
  };
  const tabs = (
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="secondary"
      centered
    >
      {!matchesMD && (
        <Tab label="Trang Chủ" component={Link} to="/" value={0} />
      )}
      {!userInfo && (
        <Tab label="Đăng nhập" component={Link} to="/signin" value={1} />
      )}
      {!userInfo && (
        <Tab label="Đăng Ký" component={Link} to="/signup" value={2} />
      )}
      {userInfo && !matchesSM && (
        <Tab label="Thông Tin" component={Link} to="/profile" value={3} />
      )}

      {userInfo && !matchesSM && (
        <Tab label="Giỏ Hàng" component={Link} to="/cart" value={4} />
      )}
      {cart.length !== 0 && (
        <div
          style={{
            backgroundColor: "red",
            fontSize: 14,
            fontWeight: "bold",
            textAlign: "center",
            width: 18,
            height: 18,
            borderRadius: "50%",
            transform: "translate(-20px, 3px)",
          }}
        >
          {cart.length}
        </div>
      )}
      {userInfo && <Tab label="Đăng xuất" component={Link} to="/" value={5} />}
      {userInfo && (
        <Hidden mdUp>
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
              <MenuItem
                onClick={() => {
                  handleClose();
                }}
              >
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
        </Hidden>
      )}
    </Tabs>
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
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        orientation="vertical"
      >
        {<Tab label="Trang Chủ" component={Link} to="/" value={0} />}
        {!userInfo && (
          <Tab label="Đăng nhập" component={Link} to="/signin" value={1} />
        )}
        {!userInfo && (
          <Tab label="Đăng Ký" component={Link} to="/signup" value={2} />
        )}
        {userInfo && (
          <Tab label="Thông Tin" component={Link} to="/profile" value={3} />
        )}
        {userInfo && (
          <Tab label="Giỏ Hàng" component={Link} to="/cart" value={4} />
        )}
      </Tabs>
    </SwipeableDrawer>
  );

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="fixed">
          <Toolbar color="primary" className={classes.toolBar}>
            <Hidden smDown>
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
            <Grid
              container
              justify="flex-end"
              style={{
                marginRight: !matchesMD ? theme.spacing(6) : theme.spacing(1),
              }}
            >
              {tabs}
            </Grid>
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
};

export default Header;
