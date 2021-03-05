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
  Button,
  Table,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  Select,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import Loading from "../components/Loading";
import Alert from "@material-ui/lab/Alert";
import Carousel from "react-material-ui-carousel";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import { IThemeOptions } from "../components/Theme";

const useStyles = makeStyles((theme: IThemeOptions) =>
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
      border: `1px solid ${theme.palette.common.black}`,
    },
    text: {
      fontSize: 13.5,
      lineHeight: 1.5,
    },
  })
);

export default function Product({ match, history }: RouteChildrenProps<any>) {
  const theme = useTheme();
  const classes = useStyles();
  const [qty, setQty] = useState(1);
  let id = match!.params.id;
  console.log(id);

  const dispatch = useDispatch();

  const productDetails = useSelector((state: any) => state.productDetails);
  const { loading = true, error, product } = productDetails;
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const addToCartHandle = () => {
    if (!userInfo) {
      return history.push("/signin");
    }
    history.push(`/cart/${id}?qty=${qty}`);
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
          <Grid container spacing={1}>
            <Grid item style={{ width: "45%" }}>
              {/* @ts-ignore */}
              <Carousel
                animation="slide"
                fullHeightHover={false}
                navButtonsProps={{
                  style: {
                    backgroundColor: "black",
                    borderRadius: 0,
                    opacity: 0,
                    height: "100%",
                  },
                }}
                /* @ts-ignore */
                navButtonsWrapperProps={{}}
              >
                {product.image.map((p: any, i: any) => (
                  <img src={p} alt={i} key={i} />
                ))}
              </Carousel>
            </Grid>
            <Grid item style={{ width: "30%" }}>
              <List>
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
            </Grid>
            <Grid
              item
              style={{ width: "25%" }}
              className={classes.specContainer}
            >
              <Grid container>
                <Grid item container>
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
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
}
