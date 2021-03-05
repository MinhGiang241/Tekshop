import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteChildrenProps } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { IThemeOptions } from "../components/Theme";
import { addToCart } from "../store/actions/cartAction";
import numeral from "numeral";
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
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [productQty, setProductQty] = useState(Number(qty));

  const classes = useStyles();

  const userLogin = useSelector((state: any) => state.userLogin);
  const { loading = false, error, userInfo } = userLogin;

  const cartItems = userInfo.cart.items;

  const handleDeleteFromCart = (id: any) => {};

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    const totalPrice = cartItems.reduce((a: any, b: any) => {
      const total =
        a + Number(productQty) * Number(b.price.replace(/[.]/g, ""));
      return total;
    }, 0);
    setTotal(totalPrice);
  }, [dispatch, productId, qty, cartItems, productQty]);
  return (
    <Container maxWidth="lg" style={{ minHeight: 500 }}>
      <Grid container>
        <Grid item container justify="center">
          <Typography variant="h5" align="center">
            GIỎ HÀNG
          </Typography>
        </Grid>
        <Grid item container justify="center">
          {cartItems.length === 0 && (
            // @ts-ignore
            <Alert severity="info">
              <Typography variant="body1" align="center">
                Chưa có sản phẩm nào
              </Typography>
            </Alert>
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
                  image={p.image[0]}
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
                        Số lượng:
                      </Typography>{" "}
                      <Select
                        style={{ marginLeft: 10, height: 24 }}
                        value={productQty}
                        onChange={(e: any) => {
                          setProductQty(Number(e.target.value));
                          dispatch(addToCart(p._id, Number(e.target.value)));
                        }}
                      >
                        {Array.from({ length: p.countInStock }, (v, x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleDeleteFromCart(p._id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartList;
