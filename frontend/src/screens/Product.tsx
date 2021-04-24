import React, { useState, useEffect } from "react";
import { RouteChildrenProps, Link } from "react-router-dom";
import {
  listProductsDetails,
  clearData,
} from "../store/actions/productActions";
import image from "../assets/images/1.png";
import { getCart, addToCart } from "../store/actions/cartActions";
import { postReview } from "../store/actions/productActions";

import {
  Container,
  Grid,
  List,
  ListItem,
  Typography,
  Button,
  Table,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  Select,
  Snackbar,
  TextField,
  Hidden,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import Loading from "../components/Loading";
import Alert from "@material-ui/lab/Alert";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import { IThemeOptions } from "../components/Theme";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const useStyles = makeStyles((theme: any) =>
  createStyles({
    tableRow: {
      maxHeight: 20,
      borderColor: `1px solid ${theme.palette.common.green} !important`,
    },
    tableCellCaption: {
      width: "40%",
    },
    tableCellContent: {
      width: "60%",
    },
    specContainer: {
      display: "block",
      border: "solid 1px rgba(0,0,0,0.5)",
      boxShadow: "1px 1px rgba(0,0,0,0.5)",
      borderRadius: "10px",
      // width: theme.spacing(45),
      // maxHeight: 500,
      boxSizing: "border-box",
      background: "#fff",
    },
    text: {
      fontSize: 15,
      lineHeight: 1.5,
    },
    reviewContainer: {},
    reviews: {
      marginBottom: theme.spacing(2),
    },
    review: {
      background: "#fff",
      padding: theme.spacing(1),
      marginBottom: theme.spacing(2),
      border: "solid 1px rgba(0,0,0,0.5)",
      boxShadow: "1px 1px rgba(0,0,0,0.5)",
      borderRadius: "10px",
    },
    textField: {
      marginBottom: theme.spacing(2),
      background: "#fff",
    },
  })
);

const Product: React.FC<any> = ({ match, history }) => {
  const theme = useTheme();
  const classes = useStyles();
  const [qty, setQty] = useState(1);
  let id = match!.params.id;
  console.log(id);

  const dispatch = useDispatch();

  const productDetails = useSelector((state: any) => state.productDetails);
  const { loading = true, error, product } = productDetails;
  const { reviews = [] } = product;
  const userLogin = useSelector((state: any) => state.userLogin);
  const {
    userInfo = JSON.parse(localStorage.getItem("userInfo") as string),
  } = userLogin;
  const cart = useSelector((state: any) => state.cart);
  let token: string;
  if (userInfo) {
    token = localStorage.getItem("token") || userInfo.token || "";
  }

  const [nameReview, setNameReview] = useState("");
  const [commentReview, setCommentReview] = useState("");

  const handleChangeNameReview = (e: React.ChangeEvent<any>) => {
    setNameReview(e.target.value);
  };
  const handleChangeCommentReview = (e: React.ChangeEvent<any>) => {
    setCommentReview(e.target.value);
  };
  const submitReview = () => {
    dispatch(postReview(id, { name: nameReview, comment: commentReview }));
    setNameReview("");
    setCommentReview("");
  };

  const addToCartHandle = () => {
    if (!userInfo) {
      return history.push("/signin");
    }
    dispatch(addToCart(id, qty, token));

    setOpenSnackBar(true);
  };

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  useEffect(() => {
    dispatch(listProductsDetails(id));

    return () => {
      dispatch(clearData());
    };
  }, [dispatch, id]);

  const productSpecification = [
    { name: "Màn hình", data: product.screen },
    { name: "Camera sau", data: product.mainCamera },
    { name: "Camera Selfie", data: product.selfieCamera },
    { name: "CPU", data: product.CPU },
    { name: "RAM", data: product.RAM },
    { name: "Bộ nhớ trong", data: product.hdd },
    { name: "Dung lượng pin", data: product.battery },
    { name: "Thời gian ra mắt", data: product.timeRelease },
  ];

  const specTable = (
    <Grid item lg={4}>
      <Grid item className={classes.specContainer}>
        <Grid
          container
          justify="center"
          style={{ marginBottom: 15, paddingTop: 8 }}
        >
          <Typography variant="h5" align="center">
            Thông số kỹ thuật
          </Typography>
        </Grid>

        <Table size="small">
          <TableBody>
            {productSpecification.map((i: any) => (
              <TableRow key={i.name} className={classes.tableRow}>
                <TableCell className={classes.tableCellCaption}>
                  {/* @ts-ignore */}
                  <Typography className={classes.text} align="left">
                    {i.name}
                  </Typography>
                </TableCell>
                <TableCell className={classes.tableCellContent}>
                  <Typography className={classes.text} align="right">
                    {i.data}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );

  return (
    <Container
      maxWidth="lg"
      style={{ minHeight: 500, backgroundColor: "transparent" }}
    >
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
          <Grid container spacing={3}>
            <Grid item lg={8}>
              {/* @ts-ignore */}
              <Carousel infiniteLoop>
                {product.image.map((p: any, i: any) => (
                  <img src={p} alt={i} key={i} />
                ))}
              </Carousel>
            </Grid>
            <Grid item lg={4}>
              <List
                style={{
                  background: "#fff",
                  height: 430,
                  width: "100%",
                  border: "solid 1px rgba(0,0,0,0.5)",
                  boxShadow: "1px 1px rgba(0,0,0,0.5)",
                  borderRadius: "10px",
                }}
              >
                <ListItem divider>
                  <Typography variant="h5">{product.name}</Typography>
                </ListItem>
                <ListItem divider>
                  <Rating value={product.rating} text={product.numReviews} />
                </ListItem>
                <ListItem divider>
                  <Typography variant="h6">Giá: {product.price}đ</Typography>
                </ListItem>
                <ListItem divider>
                  <Typography variant="body1">
                    <b>Mô tả:</b> {product.description}
                  </Typography>
                </ListItem>
                <ListItem divider>
                  <Grid container justify="space-between">
                    <Typography variant="body1">Tình trạng:</Typography>
                    <Typography variant="body1">
                      {product.countInStock > 0 ? "Còn hàng" : "Hết hàng"}
                    </Typography>
                  </Grid>
                </ListItem>
                <ListItem divider>
                  {product.countInStock > 0 && (
                    <Grid container justify="space-between">
                      <Grid item>
                        <Typography variant="body1">
                          <strong>Số lượng:</strong>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <FormControl
                          component={Select}
                          value={qty}
                          onChange={(e: any) => setQty(e.target.value)}
                        >
                          {/* @ts-ignore */}
                          {[...Array(product.countInStock).keys()].map(
                            (x: any) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  )}
                </ListItem>
                <ListItem divider>
                  <Grid container justify="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addToCartHandle}
                    >
                      Thêm Giỏ hàng
                    </Button>
                  </Grid>
                </ListItem>
              </List>

              <Hidden lgUp>{specTable}</Hidden>
            </Grid>
            <Grid item container direction="row" spacing={3}>
              <Grid
                item
                lg={8}
                md={12}
                sm={12}
                xs={12}
                className={classes.reviewContainer}
              >
                <Typography variant="h4" gutterBottom>
                  Reviews
                </Typography>
                <Grid container className={classes.reviews}>
                  {reviews.map((i: any) => (
                    <Grid container className={classes.review}>
                      <Grid item lg={1}>
                        <img src={image} width={50} height={50} alt="avatar" />
                      </Grid>
                      <Grid item lg={11}>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
                          {i.name}
                        </Typography>
                        <Typography variant="caption" color="primary">
                          Vào lúc: {i.createdAt.split("T")[0]}
                        </Typography>
                        <Typography variant="body1">{i.comment}</Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                <Grid container>
                  <Typography variant="h4" gutterBottom>
                    Phản hồi ý kiến
                  </Typography>
                  <Grid item container direction="column">
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Họ tên"
                      className={classes.textField}
                      onChange={handleChangeNameReview}
                      value={nameReview}
                    />
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Bình luận"
                      className={classes.textField}
                      multiline
                      rows={9}
                      onChange={handleChangeCommentReview}
                      value={commentReview}
                    />
                    <Button
                      onClick={submitReview}
                      variant="contained"
                      color="primary"
                      disabled={nameReview === "" || commentReview === ""}
                    >
                      Bình luận
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              {/* Product specification */}
              <Hidden mdDown>{specTable}</Hidden>
            </Grid>
          </Grid>
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackBar}
        onClose={handleCloseSnackBar}
        autoHideDuration={3000}
      >
        {/* @ts-ignore */}
        <Alert onClose={handleCloseSnackBar} severity="success">
          Đã thêm vào giỏ hàng
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Product;
