import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const AddressForm: React.FC<any> = (props) => {
  const {
    setName,
    setAddress,
    setPhone,
    setProvince,
    setDistrict,
    setWard,
    setZipCode,
  } = props;

  function capitalizeFirstLetter(string: string) {
    return string
      .split(" ")
      .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
      .join(" ");
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Địa chỉ nhận hàng
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            variant="outlined"
            id="name"
            name="name"
            label="Họ Tên"
            fullWidth
            autoComplete="name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(capitalizeFirstLetter(e.target.value))
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Số điện thoại"
            fullWidth
            autoComplete="phone"
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhone(e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Địa chi nhận hàng"
            fullWidth
            autoComplete="shipping address-line"
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAddress(e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Tỉnh/Thành phố"
            fullWidth
            autoComplete="shipping city"
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProvince(e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="state"
            label="Quận/Huyện"
            fullWidth
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDistrict(e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="ward"
            name="ward"
            label="Xã/Phường"
            fullWidth
            autoComplete="shipping ward"
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setWard(e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip/Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setZipCode(e.target.value)
            }
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AddressForm;
