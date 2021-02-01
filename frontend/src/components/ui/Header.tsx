import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IThemeOptions } from "./Theme";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Button,
  Tabs,
  Tab,
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
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";

import logo from "../../assets/logo.png";

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
      maxHeight: "5em",
    },
    tab: {
      width: "100%",
      marginLeft: "2em",
      marginRight: "1em",
      [theme.breakpoints.down("md")]: { marginLeft: 0 },
    },
    space: {
      display: "block",
      width: "100%",
    },
    search: { width: "100%" },
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
  })
);

export default function Header(props: Props) {
  const theme = useTheme();
  const iOS =
    (process as any).browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);
  const [openDrawer, setOpenDrawer] = useState(false);

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
        break;
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const tabs = (
    <Tabs
      value={value}
      onChange={handleChange}
      className={classes.tab}
      aria-label="tabs"
      indicatorColor={
        matchesSM && value >= 0 && value <= 3 ? "primary" : "secondary"
      }
      centered={matchesSM ? false : true}
    >
      {matchesSM ? null : (
        <Tab label="Trang Chủ" component={Link} to="/" value={0} />
      )}
      {matchesSM ? null : (
        <Tab label="Sản Phẩm" component={Link} to="/products" value={1} />
      )}
      {matchesSM ? null : (
        <Tab
          label="Thêm sản Phẩm"
          component={Link}
          to="/admin/products"
          value={2}
        />
      )}
      {matchesSM ? null : (
        <Tab label="Thống Kê" component={Link} to="/admin" value={3} />
      )}
      {matchesXS ? null : (
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
            // value={search}
            // onChange={handleSearch}
            InputProps={{
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
      )}
      <Tab
        label="Đăng Ký"
        component={Link}
        to="/signup"
        value={4}
        style={{ marginLeft: matchesSM ? "auto" : undefined }}
      />
      <Tab label="Đăng Nhập" component={Link} to="/signin" value={5} />
      {false ? <Tab label="Đăng xuất" component={Link} to="/logout" /> : null}
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
                      <SearchIcon color="primary" style={{ fontSize: 40 }} />
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
  );
}
