import React from "react";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import { Typography, Grid } from "@material-ui/core";

type Props = {
  value: number;
  text: number;
};

function Rating(props: Props) {
  const { value, text } = props;
  return (
    <Grid container direction="row">
      <Grid item>
        {value === 0 ? (
          <StarOutlineIcon fontSize="small" color="secondary" />
        ) : value < 1 ? (
          <StarHalfIcon fontSize="small" color="secondary" />
        ) : (
          <StarIcon fontSize="small" color="secondary" />
        )}
      </Grid>
      <Grid item>
        {value <= 1 ? (
          <StarOutlineIcon fontSize="small" color="secondary" />
        ) : value < 2 ? (
          <StarHalfIcon fontSize="small" color="secondary" />
        ) : (
          <StarIcon fontSize="small" color="secondary" />
        )}
      </Grid>
      <Grid item>
        {value <= 2 ? (
          <StarOutlineIcon fontSize="small" color="secondary" />
        ) : value < 3 ? (
          <StarHalfIcon fontSize="small" color="secondary" />
        ) : (
          <StarIcon fontSize="small" color="secondary" />
        )}
      </Grid>
      <Grid item>
        {value <= 3 ? (
          <StarOutlineIcon fontSize="small" color="secondary" />
        ) : value < 4 ? (
          <StarHalfIcon fontSize="small" color="secondary" />
        ) : (
          <StarIcon fontSize="small" color="secondary" />
        )}
      </Grid>
      <Grid item>
        {value <= 4 ? (
          <StarOutlineIcon fontSize="small" color="secondary" />
        ) : value < 5 ? (
          <StarHalfIcon fontSize="small" color="secondary" />
        ) : (
          <StarIcon fontSize="small" color="secondary" />
        )}
      </Grid>
      <Grid item>
        <Typography variant="caption">{text} Reviews</Typography>
      </Grid>
    </Grid>
  );
}

export default Rating;
