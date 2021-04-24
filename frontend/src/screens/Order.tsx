import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import { IThemeOptions } from "../components/Theme";
import { createOrder, getOrderDetail } from "../store/actions/orderActions";
import numeral from "numeral";

import {
  Card,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  InputAdornment,
  IconButton,
  Typography,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme: IThemeOptions) => ({
  container: {
    marginLeft: "3rem",
    marginRight: "3rem",
    marginTop: 16,
    marginBottom: "2rem",
    minWidth: 700,
  },
  infoContainer: {
    minHeight: "70px",
    borderBottom: "1px solid rgba(0,0,0,0.15)",
  },
  cartItem: {
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    border: "2px solid rgba(0,0,0,0.15)",
    borderRadius: 5,
    // boxShadow: "2px 2px rgba(0,0,0,0.15)",
    marginBottom: 2,
  },
  totalPrice: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
}));

const OrderScreen: React.FC<any> = ({
  handleReset,
  handleBack,
  handleCreateOrder,
  total,
  province,
  district,
  ward,
  street,
  phone,
  paymentMethod,
  cartItems,
}) => {
  // const orderId = match.param.id;
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const orderDetails = useSelector((state: any) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  return (
    <Grid className={classes.container}>
      <Grid container justify="center">
        <Typography variant="h4" gutterBottom>
          ĐƠN HÀNG
        </Typography>
      </Grid>
      <Grid item>
        <Grid item direction="column" className={classes.infoContainer}>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              ĐỊA CHỈ GIAO HÀNG :
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              {street}, {ward}, {district}, {province}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          className={classes.infoContainer}
        >
          <Grid item>
            <Typography variant="h6" gutterBottom>
              SỐ ĐIỆN THOẠI :
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{phone}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          className={classes.infoContainer}
        >
          <Grid item>
            <Typography variant="h6" gutterBottom>
              PHƯƠNG THỨC THANH TOÁN :
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{paymentMethod}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          className={classes.infoContainer}
        >
          <Grid
            item
            style={{
              marginBottom: 20,
            }}
          >
            <Typography variant="h6">VẬT PHẨM :</Typography>
          </Grid>
          <Grid item>
            {cartItems.map((i: any) => (
              <div key={i.name} className={classes.cartItem}>
                <img height={40} src={i.image} alt={i.name} />
                <Typography variant="body1">{i.name}</Typography>
                <Typography variant="body1">
                  {i.quantity}X {i.price}đ ={" "}
                  {numeral(
                    Number(i.quantity) * Number(i.price.replace(/[.]/g, ""))
                  ).format("0,0")}
                  đ
                </Typography>
              </div>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item container justify="center" className={classes.totalPrice}>
          <Typography variant="h6">
            TỔNG CỘNG : {numeral(total).format("0,0")}đ
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Button variant="contained" onClick={handleReset}>
          Giỏ hàng
        </Button>
        <Button
          style={{ margin: "0 10px" }}
          variant="contained"
          onClick={handleBack}
        >
          Quay lại
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleCreateOrder}
        >
          Đặt hàng
        </Button>
      </Grid>
    </Grid>
  );
};

export default OrderScreen;
