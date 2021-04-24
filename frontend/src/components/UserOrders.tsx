import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import numeral from "numeral";
import Loading from "./Loading";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { IThemeOptions } from "./Theme";
import Alert from "@material-ui/lab/Alert";

import { deleteUserOrderItem } from "../store/actions/orderActions";

import { Grid, IconButton, Typography, useMediaQuery } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme: IThemeOptions) => ({
  orderItem: {
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    border: "2px solid rgba(0,0,0,0.15)",
    borderRadius: 5,
    marginBottom: 2,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(0,0,0,0.15)",
    },
  },
}));

const UserOrders = ({ history }: any) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: any) => state.userLogin);
  const orderList = useSelector((state: any) => state.orderList);
  const { userInfo } = userLogin;
  let token: any;
  if (userInfo) {
    token = userInfo.token;
  }
  const { order = [], loading } = orderList;

  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container justify="center" direction="column">
      <Grid item container justify="center">
        <Typography variant="h5">LỊCH SỬ ĐẶT HÀNG</Typography>
      </Grid>
      <Grid item container justify="center">
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
        ) : order.length === 0 ? (
          // @ts-ignore
          <Alert severity="info">Không có đơn đặt hàng nào</Alert>
        ) : (
          <>
            {order.map((i: any) => (
              <Grid container item justify="center" key={i._id}>
                <Link
                  to={`/order/${i._id}`}
                  style={{
                    textDecoration: "none",
                    color: theme.palette.common.black,
                    width: !matchesMD ? "100%" : "400px",
                  }}
                >
                  <Grid
                    container
                    item
                    justify="space-between"
                    alignItems="center"
                    className={classes.orderItem}
                  >
                    {!matchesMD && (
                      <Grid item>
                        <Typography variant="body1">{i._id}</Typography>
                      </Grid>
                    )}

                    <Grid item>
                      <Typography variant="body1">{i.createdAt}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        {numeral(i.totalPrice).format("0,0")}đ
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={(e: any) => {
                          e.preventDefault();
                          dispatch(deleteUserOrderItem(i._id, token));
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Link>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default UserOrders;
