import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteChildrenProps } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { IThemeOptions } from "../components/Theme";
import numeral from "numeral";
import {
  getCart,
  deleteCartItem,
  clearCartItem,
} from "../store/actions/cartActions";
import Loading from "../components/Loading";
import {
  Container,
  Grid,
  Typography,
  Button,
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
  cartItemImage: { height: "90%", margin: 10 },
  cardContent: { flex: 1 },
}));

// eslint-disable-next-line
const CartList: React.FC<any> = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [total, setTotal] = useState(0);
  const userLogin = useSelector((state: any) => state.userLogin);
  const {
    userInfo = JSON.parse(localStorage.getItem("userInfo") as string),
  } = userLogin;
  const token = userInfo.token;
  const userLoading = userLogin.loading;
  const userError = userLogin.error;

  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const cartError = useSelector((state: any) => state.cart.error);
  const cartLoading = useSelector((state: any) => state.cart.loading);

  const [loading, setLoading] = useState(userLoading && cartLoading);
  const [error, setError] = useState("");

  const handleDeleteFromCart = (id: any) => {
    dispatch(deleteCartItem(id, token));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return history.push("/");
    }
    return history.push("/checkout");
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
    total,
    setTotal,
    dispatch,
    cartItems,
    userLoading,
    cartLoading,
    userError,
    cartError,
    token,
  ]);
  return (
    <Container maxWidth="lg" style={{ backgroundColor: "transparent" }}>
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
              Tổng cộng:{numeral(total).format("0,0").replaceAll(",", ".")}đ
            </Typography>
          </Grid>
          <Grid item container>
            {cartItems.map((p: any) => (
              <Grid item container justify="center" key={p.name}>
                <Card className={classes.cartItem}>
                  <img
                    className={classes.cartItemImage}
                    src={p.image}
                    alt={p.image}
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
      {!loading && (
        <Grid item container justify="center">
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            {cartItems.length === 0 ? "Trang chủ" : "Tiếp tục"}
          </Button>
        </Grid>
      )}
    </Container>
  );
};

export default CartList;
