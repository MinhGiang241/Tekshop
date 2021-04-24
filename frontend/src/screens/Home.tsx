import React, { useState, useEffect } from "react";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../store/actions/productActions";
import Loading from "../components/Loading";
import Alert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";
import Skeleton from "@material-ui/lab/Skeleton";
import banner from "../assets/images/banner.jpg";
import banner1 from "../assets/images/banner1.png";

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
  Button,
  GridListTile,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Carousel from "react-material-ui-carousel";

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

const useStyles = makeStyles((theme: any) =>
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
    logo: { width: "100%", height: 35 },
    pagination: {
      width: 500,
      margin: "auto",
    },
    skeleton: {
      display: "flex",
      justifyContent: "center",
      margin: "0 auto",
    },
    layout: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      zIndex: 0,
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    heroContent: {
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      marginBottom: theme.spacing(5),
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    banner: {
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      position: "relative",
      width: "100%",
      height: "26rem",
    },
    overlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,.3)",
    },
    mainFeaturedPostContent: {},
  })
);

const Home: React.FC<any> = (props) => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const [page, setPage] = useState(1);
  const classes = useStyles();

  const dispatch = useDispatch();

  const productList = useSelector((state: any) => state.productList);
  const userInfo = useSelector((state: any) => state.userLogin);

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
    <Container maxWidth="lg" style={{ backgroundColor: "transparent" }}>
      <div className={classes.heroContent}>
        <Carousel
          animation="slide"
          fullHeightHover={true}
          indicators={false}
          // @ts-ignore
          navButtonsProps={{
            style: {
              display: "none",
            },
          }}
        >
          {[banner, banner1].map((p: any, i: any) => (
            // <img src={p} alt={i} height="100px" />
            <div
              key={i}
              className={classes.banner}
              style={{ backgroundImage: `url(${p})` }}
            />
          ))}
        </Carousel>
        <div className={classes.layout} />
      </div>
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
          className={classes.skeleton}
          cellHeight={380}
          cols={matchesXS ? 1 : matchesSM ? 2 : matchesMD ? 3 : 5}
        >
          {Array.from(new Array(15)).map((p: any, i: any) => (
            <GridListTile key={i}>
              <Skeleton
                variant="rect"
                width={230}
                height={350}
                style={{ margin: "0 auto" }}
              ></Skeleton>
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
              cellHeight={350}
              cols={matchesXS ? 1 : matchesSM ? 2 : matchesMD ? 3 : 5}
            >
              {products.products.map((product: any) => (
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
                            <Typography variant="h6" color="textPrimary">
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
};

export default Home;
