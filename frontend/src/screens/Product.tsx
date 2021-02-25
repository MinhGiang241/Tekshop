import React, { useState, useEffect } from "react";
import { RouteChildrenProps, Link } from "react-router-dom";
import {
  listProductsDetails,
  clearData,
} from "../store/actions/productActions";
import {
  Container,
  Grid,
  List,
  ListItem,
  Typography,
  useTheme,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import Loading from "../components/Loading";
import Alert from "@material-ui/lab/Alert";

type Products = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
};

export default function Product({ match }: RouteChildrenProps<any>) {
  const theme = useTheme();
  // const [load, setLoad] = useState(true);
  let id = match!.params.id;
  console.log(id);

  const dispatch = useDispatch();

  const productDetails = useSelector((state: any) => state.productDetails);
  const { loading = true, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductsDetails(id));

    return () => {
      dispatch(clearData());
    };
  }, [dispatch, id]);

  return (
    <Container maxWidth="lg">
      {loading ? (
        <Loading />
      ) : error ? (
        // @ts-ignore
        <Alert variant="filled" severity="error">
          Have an Error when loading data
        </Alert>
      ) : (
        <div>
          <Grid container>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: theme.palette.common.black,
              }}
            >
              <Typography variant="h5">GO BACK</Typography>
            </Link>
          </Grid>
          <Grid container spacing={2}>
            <Grid item lg={6}>
              <img src={product.image[0]} alt={product.name} width="100%" />
            </Grid>
            <Grid item lg={3}>
              <List>
                <ListItem divider>
                  <Typography variant="h5">{product.name}</Typography>
                </ListItem>
                <ListItem divider>
                  <Rating value={product.rating} text={product.numReviews} />
                </ListItem>
                <ListItem divider>
                  <Typography variant="h6">
                    Giá: {product.price}
                    {/* @ts-ignore */}
                    {product.price === "chưa xác định" ? "" : "đ"}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1">
                    <b>Mô tả:</b> {product.description}
                  </Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item lg={3}>
              <List>
                <ListItem divider>
                  <Grid container justify="space-between">
                    <Typography variant="body1">Giá:</Typography>
                    <Typography variant="body1">
                      {product.price}
                      {/* @ts-ignore */}
                      {product.price === "chưa xác định" ? "" : "đ"}
                    </Typography>
                  </Grid>
                </ListItem>
                <ListItem divider>
                  <Grid container justify="space-between">
                    <Typography variant="body1">Tình trạng:</Typography>
                    <Typography variant="body1">
                      {product.countInStock > 0 ? "Còn hàng" : "Hết hàng"}
                    </Typography>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container justify="center">
                    <Button variant="contained" color="primary">
                      Thêm Giỏ hàng
                    </Button>
                  </Grid>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
}
