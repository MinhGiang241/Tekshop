import React from "react";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import { IThemeOptions } from "./Theme";
import { IconButton, Typography, Grid, Toolbar } from "@material-ui/core";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme: IThemeOptions) => ({
  footer: {
    position: "relative",
    width: "100%",
    backgroundColor: theme.palette.common.green,
    color: theme.palette.common.white,
  },
  socialContainer: {
    position: "absolute",
    right: "1.5em",
    [theme.breakpoints.down("xs")]: {
      right: "0.6em",
    },
  },
  container: {
    height: 180,
  },
  end: {
    position: "absolute",
    bottom: 0,
    height: 30,
  },
  linkContainer: {
    borderBottom: "1px solid white",
    position: "absolute",
    bottom: 30,
  },
  iconButton: {
    marginTop: "auto",
    marginLeft: "auto",
    marginRight: 2,
    marginBottom: 2,
  },
  footerTitle: { fontWeight: "bold", textDecoration: "underline" },
  icon: { fontSize: 30, color: theme.palette.common.white },
  text: { color: theme.palette.common.white },
}));

function Footer() {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container className={classes.container}>
        <Grid item container className={classes.linkContainer}>
          <Grid item lg>
            <Typography
              align="center"
              gutterBottom
              className={classes.footerTitle}
            >
              Thông tin
            </Typography>
            <Typography align="center" gutterBottom>
              Giới thiệu
            </Typography>
            <Typography align="center" gutterBottom>
              Liên hệ
            </Typography>
            <Typography align="center" gutterBottom>
              Đối tác
            </Typography>
          </Grid>
          <Grid item lg>
            <Typography
              align="center"
              gutterBottom
              className={classes.footerTitle}
            >
              Chính sách
            </Typography>
            <Typography align="center" gutterBottom>
              Chính sách đổi hàng
            </Typography>
            <Typography align="center" gutterBottom>
              Chính sách bảo mật
            </Typography>
            <Typography align="center" gutterBottom>
              Chính sách bảo hành
            </Typography>
            <Typography align="center" gutterBottom>
              Chính sách hoàn tiền
            </Typography>
          </Grid>
          <Grid item lg>
            <Typography
              align="center"
              gutterBottom
              className={classes.footerTitle}
            >
              Dịch vụ
            </Typography>
            <Typography align="center" gutterBottom>
              Thanh toán
            </Typography>
            <Typography align="center" gutterBottom>
              vận chuyển
            </Typography>
            <Typography align="center" gutterBottom>
              Câu hỏi thường gặp
            </Typography>
          </Grid>
        </Grid>

        <Grid item container className={classes.end}>
          <Grid item>
            <Typography variant="caption">
              Copyright © 2017 All Rights Reserved by me.
            </Typography>
          </Grid>
          <Grid item className={classes.socialContainer}>
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
