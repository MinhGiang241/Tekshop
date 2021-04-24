import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import Review from "../components/Review";

import { createOrder, getOrderList } from "../store/actions/orderActions";
import { clearCartItem } from "../store/actions/cartActions";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    border: `1px solid rgba(0,0,0,0.5)`,
    boxShadow: "10px 10px rgba(0,0,0,0.5)",
    borderRadius: "10px",
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Địa chỉ nhận hàng", "Thanh toán", "Xác nhận đơn hàng"];
const Checkout: React.FC<any> = ({ history, setValue }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [phone, setPhone] = useState("");
  const [nameCard, setNameCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expire, setExpire] = useState("");
  const [cvv, setCVV] = useState("");

  const cartItems = useSelector((state: any) => state.cart.cartItems) || [];
  const userLogin = useSelector((state: any) => state.userLogin);
  const {
    userInfo = JSON.parse(localStorage.getItem("userInfo") as string),
  } = userLogin;
  const token = userInfo.token;

  const totalPrice = cartItems.reduce((a: any, b: any) => {
    const total = a + Number(b.quantity) * Number(b.price.replace(/[.]/g, ""));
    return total;
  }, 0);

  const order = {
    shippingAddress: {
      province,
      district,
      ward,
      address,
      phone,
    },
    nameOrder: name,
    paymentMethod: {
      method: paymentMethod,
      visa: {
        nameCard,
        cardNumber,
        expire,
        cvv,
      },
    },
    orderItems: [...cartItems],
    totalPrice,
  };

  const handleCreateOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(createOrder(order, token));
    dispatch(clearCartItem(token));
    dispatch(getOrderList(token));
    setActiveStep(activeStep + 1);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleBackToCart = () => {
    history.push("/cart");
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            setName={setName}
            setAddress={setAddress}
            setPhone={setPhone}
            setProvince={setProvince}
            setDistrict={setDistrict}
            setWard={setWard}
            setZipCode={setZipCode}
          />
        );
      case 1:
        return (
          <PaymentForm
            setNameCard={setNameCard}
            setCardNumber={setCardNumber}
            setExpire={setExpire}
            setCVV={setCVV}
            setPaymentMethod={setPaymentMethod}
          />
        );
      case 2:
        return (
          <Review
            name={name}
            zipCode={zipCode}
            address={address}
            province={province}
            district={district}
            ward={ward}
            phone={phone}
            nameCard={nameCard}
            cardNumber={cardNumber}
            expire={expire}
            cvv={cvv}
            totalPrice={totalPrice}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Đặt hàng
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Bạn đã đặt hàng thành công.
                </Typography>
                <Typography variant="subtitle1">
                  Chúng tôi đã gửi cho bạn 1 email xác nhận đơn đặt hàng.
                </Typography>
                <Grid container justify="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      history.push("/");
                      setValue(0);
                    }}
                    className={classes.buttons}
                  >
                    {activeStep === steps.length && "Trang chủ"}
                  </Button>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {
                    <Button
                      onClick={activeStep !== 0 ? handleBack : handleBackToCart}
                      className={classes.button}
                    >
                      {activeStep !== 0 ? "Trở lại" : "Giỏ hàng"}
                    </Button>
                  }
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep === steps.length - 1
                        ? handleCreateOrder
                        : handleNext
                    }
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Đặt hàng" : "Tiếp theo"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default Checkout;
