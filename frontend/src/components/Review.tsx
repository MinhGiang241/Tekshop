import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import numeral from "numeral";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const Review: React.FC<any> = ({
  name,
  zipCode,
  province,
  address,
  district,
  ward,
  phone,
  nameCard,
  cardNumber,
  expire,
  cvv,
  totalPrice,
}) => {
  const classes = useStyles();
  const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: nameCard },
    { name: "Phone", detail: phone },
    { name: "Card number", detail: cardNumber },
    { name: "Expiry date", detail: expire },
  ];

  const addresses = [address, ward, district, province];

  const cartItems = useSelector((state: any) => state.cart.cartItems) || [];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((product: any) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} />
            <Typography variant="body2">
              {product.price}đ x {product.quantity} ={" "}
              {numeral(
                Number(product.price.replaceAll(".", "")) *
                  Number(product.quantity)
              )
                .format("0,0")
                .replaceAll(",", ".")}
              đ
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {numeral(totalPrice).format("0,0").replaceAll(",", ".")}đ
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{name}</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Review;
