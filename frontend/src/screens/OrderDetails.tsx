import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import numeral from "numeral";

import {
  List,
  Grid,
  ListItemText,
  ListItem,
  Typography,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
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

const OrderDetails: React.FC<any> = ({ match, location, history }) => {
  const classes = useStyles();
  const orders = useSelector((state: any) => state.orderList.order);
  const orderId = match.params.id;
  const order = orders.find((i: any) => i._id === orderId);
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    nameOrder,
  } = order;
  const { province, district, ward, address, phone } = shippingAddress;
  const { visa, method } = paymentMethod;
  const { nameCard, cardNumber, expire, cvv } = visa;
  console.log(orderItems);
  const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: nameCard },
    { name: "Phone", detail: phone },
    { name: "Card number", detail: cardNumber },
    { name: "Expiry date", detail: expire },
  ];

  const addresses = [address, ward, district, province];
  return (
    <Container
      maxWidth="sm"
      style={{
        border: `1px solid rgba(0,0,0,0.5)`,
        boxShadow: "10px 10px rgba(0,0,0,0.5)",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {orderItems.map((product: any) => (
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
          <Typography gutterBottom>{nameOrder}</Typography>
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
    </Container>
  );
};

export default OrderDetails;
