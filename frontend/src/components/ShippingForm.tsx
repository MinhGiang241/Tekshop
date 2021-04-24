import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import { IThemeOptions } from "../components/Theme";

import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Typography,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme: IThemeOptions) => ({
  input: { width: 400, marginBottom: "1.3rem" },
}));

const Shipping: React.FC<any> = ({
  token,
  province,
  setProvince,
  district,
  setDistrict,
  ward,
  setWard,
  street,
  setStreet,
  phone,
  setPhone,
  paymentMethod,
  setPaymentMethod,
  handleNext,
  handleBack,
  handleReset,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <Grid container style={{ marginBottom: "1rem", maxWidth: 700 }}>
      <Grid
        item
        container
        justify="center"
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        <Typography variant="h4">ĐỊA CHỈ GIAO HÀNG</Typography>
      </Grid>
      <Grid item container justify="center">
        <FormControl className={classes.input}>
          <InputLabel htmlFor="province">Tỉnh/TP </InputLabel>
          <Input
            id="province"
            aria-describedby="province"
            type="text"
            value={province}
            error={province === ""}
            onChange={(e: any) => setProvince(e.target.value)}
          />
          {province === "" && (
            <FormHelperText style={{ color: "red" }} id="province-helper-text">
              Không được để trống
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item container justify="center">
        <FormControl className={classes.input}>
          <InputLabel htmlFor="district">Quận/huyện </InputLabel>
          <Input
            id="district"
            aria-describedby="district"
            type="text"
            value={district}
            error={district === ""}
            onChange={(e: any) => setDistrict(e.target.value)}
          />
          {district === "" && (
            <FormHelperText style={{ color: "red" }} id="province-helper-text">
              Không được để trống
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item container justify="center">
        <FormControl className={classes.input}>
          <InputLabel htmlFor="ward">Xã/phường </InputLabel>
          <Input
            id="ward"
            aria-describedby="ward"
            type="text"
            value={ward}
            error={ward === ""}
            onChange={(e: any) => setWard(e.target.value)}
          />
          {ward === "" && (
            <FormHelperText style={{ color: "red" }} id="ward-helper-text">
              Không được để trống
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item container justify="center">
        <FormControl className={classes.input}>
          <InputLabel htmlFor="street">Số nhà/Tên đường </InputLabel>
          <Input
            id="street"
            aria-describedby="street"
            type="text"
            value={street}
            error={street === ""}
            onChange={(e: any) => setStreet(e.target.value)}
          />
          {street === "" && (
            <FormHelperText style={{ color: "red" }} id="street-helper-text">
              Không được để trống
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item container justify="center">
        <FormControl className={classes.input}>
          <InputLabel htmlFor="phone">Số điện thoại </InputLabel>
          <Input
            id="phone"
            aria-describedby="phone"
            type="text"
            value={phone}
            error={phone === ""}
            onChange={(e: any) => setPhone(e.target.value)}
          />
          {phone === "" && (
            <FormHelperText style={{ color: "red" }} id="phone-helper-text">
              Không được để trống
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid
        item
        container
        justify="space-between"
        style={{ marginBottom: "1rem" }}
      >
        <Grid item style={{ marginLeft: "calc(50% - 200px)" }}>
          <Typography variant="body1">Thanh toán:</Typography>
        </Grid>
        <Grid item style={{ marginRight: "calc(50% - 200px)" }}>
          <FormControl
            component={Select}
            value={paymentMethod}
            onChange={(e: any) => setPaymentMethod(e.target.value)}
          >
            <option selected value="Thanh toán khi nhận hàng">
              Thanh toán khi nhận hàng
            </option>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item container justify="center">
        <Button
          style={{ marginRight: "10px" }}
          variant="contained"
          onClick={handleBack}
        >
          Quay lại
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={
            province === "" ||
            district === "" ||
            ward === "" ||
            street === "" ||
            phone === ""
          }
          onClick={handleNext}
        >
          Tiếp tục
        </Button>
      </Grid>
    </Grid>
  );
};

export default Shipping;
