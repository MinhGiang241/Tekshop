import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteChildrenProps } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { IThemeOptions } from "../components/Theme";
import numeral from "numeral";
import { getCart, deleteCartItem } from "../store/actions/cartAction";
import Loading from "../components/Loading";
import {
  Container,
  Grid,
  Typography,
  Select,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme: IThemeOptions) => ({
  cartItem: { width: "80%", height: 100, display: "flex", marginBottom: 10 },
  cartItemImage: { width: "20%", height: "80%", margin: 10 },
  cardContent: { flex: 1 },
}));

// eslint-disable-next-line
const CartList = ({ match, location, history }: RouteChildrenProps<any>) => {
  const productId = match!.params.id;

  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  const classes = useStyles();

  const userLogin = useSelector((state: any) => state.userLogin);
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const [productQty, setProductQty] = useState(Number(qty));

  const {
    userInfo = JSON.parse(localStorage.getItem("userInfo") as string),
  } = userLogin;
  const userError = userLogin.error;
  const userLoading = userLogin.loading;
  const token = userInfo.token;

  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const cartError = useSelector((state: any) => state.cart.error);
  const cartLoading = useSelector((state: any) => state.cart.loading);

  const [loading, setLoading] = useState(userLoading && cartLoading);
  const [error, setError] = useState("");

  const handleDeleteFromCart = (id: any) => {
    dispatch(deleteCartItem(id, token));
  };

  useEffect(() => {
    setLoading(userLoading || cartLoading);
    setError(userError || cartError);
    const totalPrice = cartItems.reduce((a: any, b: any) => {
      const total =
        a + Number(b.quantity) * Number(b.price.replace(/[.]/g, ""));
      return total;
    }, 0);
    setTotal(totalPrice);
  }, [
    dispatch,
    productId,
    qty,
    cartItems,
    userLoading,
    cartLoading,
    userError,
    cartError,
  ]);
  return (
    <Container maxWidth="lg" style={{ minHeight: 500 }}>
      {loading ? (
        <div style={{ height: "100%" }}>
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
        </div>
      ) : (
        <Grid container>
          <Grid item container justify="center">
            <Typography variant="h5" align="center">
              GIỎ HÀNG
            </Typography>
          </Grid>
          <Grid item container justify="center">
            {error ? (
              // @ts-ignore
              <Alert severity="error">
                <Typography variant="body1" align="center">
                  {error}
                </Typography>
              </Alert>
            ) : (
              cartItems.length === 0 && (
                // @ts-ignore
                <Alert severity="info">
                  <Typography variant="body1" align="center">
                    Chưa có sản phẩm nào
                  </Typography>
                </Alert>
              )
            )}
          </Grid>
          <Grid item container justify="center">
            <Typography variant="h6" align="center">
              Tổng cộng:{numeral(total).format("0,0")}đ
            </Typography>
          </Grid>
          <Grid item container>
            {cartItems.map((p: any) => (
              <Grid item container justify="center" key={p.name}>
                <Card className={classes.cartItem}>
                  <CardMedia
                    className={classes.cartItemImage}
                    image={p.image}
                  />
                  <CardContent className={classes.cardContent}>
                    <Grid
                      container
                      alignItems="center"
                      style={{ height: "100%" }}
                    >
                      <Grid item lg={6}>
                        <Typography variant="body1">{p.name}</Typography>
                      </Grid>
                      <Grid item lg={3}>
                        <Typography variant="body1">Giá: {p.price}đ</Typography>
                      </Grid>
                      <Grid item lg={3} style={{ display: "flex" }}>
                        <Typography variant="body1" align="center">
                          Số lượng: {p.quantity}
                        </Typography>{" "}
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      onClick={() => {
                        console.log("p", p);
                        handleDeleteFromCart(p._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CartList;
