import React, { useState, useEffect } from "react";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import { IThemeOptions } from "../components/Theme";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../store/actions/productActions";
import Loading from "../components/Loading";
import Alert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";
import Skeleton from "@material-ui/lab/Skeleton";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  useMediaQuery,
  GridList,
  Container,
  GridListTile,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

import apple from "../assets/logo/apple.jpg";
import samsung from "../assets/logo/samsung.jpg";
import oppo from "../assets/logo/oppo.jpg";
import huawei from "../assets/logo/huawei.jpg";
import nokia from "../assets/logo/nokia.jpg";
import realme from "../assets/logo/realme.jpg";
import vivo from "../assets/logo/vivo.jpg";
import masstel from "../assets/logo/masstel.jpg";
import vsmart from "../assets/logo/vsmart.jpg";

const logos = [
  { brand: "apple", src: apple },
  { brand: "samsung", src: samsung },
  { brand: "oppo", src: oppo },
  { brand: "huawei", src: huawei },
  { brand: "nokia", src: nokia },
  { brand: "realme", src: realme },
  { brand: "vivo", src: vivo },
  { brand: "masstel", src: masstel },
  { brand: "vsmart", src: vsmart },
];

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

const useStyles = makeStyles((theme: IThemeOptions) =>
  createStyles({
    card: {
      width: 230,
      maxHeight: 400,
      backgroundColor: theme.palette.common.white,
    },
    cardHeader: { height: "3em" },
    image: { height: "12em", width: "100%" },
    cardTitle: { fontSize: 17 },
    cardSubheader: { fontSize: 11 },
    icon: { fontSize: 20 },
    text: {},
    cardLink: {
      display: "flex",
      maxWidth: 230,
      margin: "auto",
      textDecoration: "none",
      "&:hover": {
        "& $cardSubheader,$cardTitle,$text": { color: "red" },
        "& $image": {
          transform: "scale(1.15, 1.15)",
          transition: "transform 0.3s",
        },
      },
    },
    logoContainer: {
      marginBottom: "2em",
    },
    logo: { width: "100%" },
    pagination: {
      width: 500,
      margin: "auto",
    },
  })
);

export default function Home(props: any) {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const [page, setPage] = useState(1);
  const classes = useStyles();

  const dispatch = useDispatch();

  const productList = useSelector((state: any) => state.productList);
  const userInfo = useSelector((state: any) => state.userLogin);

  //@ts-ignore
  const { loading = true, error, products } = productList;

  const perPage = 15;
  const totalProduct = products.count;
  const totalPage = Math.ceil(totalProduct / perPage);

  useEffect(() => {
    dispatch(listProducts(page));
  }, [dispatch, page]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Container maxWidth="lg">
      {matchesMD || (
        <Grid item container className={classes.logoContainer}>
          {logos.map((i: any) => (
            <Grid item lg key={i.brand}>
              <img src={i.src} alt={i.brand} className={classes.logo} />
            </Grid>
          ))}
        </Grid>
      )}
      {loading ? (
        <GridList
          cellHeight={380}
          cols={matchesXS ? 1 : matchesSM ? 2 : matchesMD ? 3 : 5}
        >
          {Array.from(new Array(15)).map((p: any, i: any) => (
            <GridListTile key={i} style={{ marginBottom: 25 }}>
              <Skeleton variant="rect" width={230} height={400}></Skeleton>
            </GridListTile>
          ))}
        </GridList>
      ) : error ? (
        // @ts-ignore
        <Alert variant="filled" severity="error">
          Have an Error when loading data
        </Alert>
      ) : (
        <Grid container>
          <Grid item container>
            <GridList
              cellHeight={380}
              cols={matchesXS ? 1 : matchesSM ? 2 : matchesMD ? 3 : 5}
            >
              {products.products.map((product: Products) => (
                <GridListTile key={product._id}>
                  <Link
                    to={`/product/${product._id}`}
                    className={classes.cardLink}
                  >
                    <Card className={classes.card}>
                      <CardHeader
                        className={classes.cardHeader}
                        title={product.name}
                        classes={{
                          title: classes.cardTitle,
                          subheader: classes.cardSubheader,
                        }}
                        subheader={product.brand}
                      />
                      <CardMedia
                        image={product.image[0]}
                        className={classes.image}
                      />
                      <CardContent>
                        <Grid container direction="column" justify="center">
                          <Grid
                            item
                            container
                            justify="center"
                            alignItems="center"
                          >
                            <Typography variant="h6" className={classes.text}>
                              {product.price}đ
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Rating
                            value={product.rating}
                            text={product.numReviews}
                          />
                        </Grid>
                      </CardContent>
                    </Card>
                  </Link>
                </GridListTile>
              ))}
            </GridList>
          </Grid>
          <Grid item container justify="center">
            <Pagination
              color="primary"
              page={page}
              count={totalPage}
              size="large"
              onChange={handleChangePage}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
