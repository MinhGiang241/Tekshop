import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { IThemeOptions } from "../components/Theme";

const useStyles = makeStyles((theme: IThemeOptions) =>
  createStyles({
    skChase: {
      margin: "auto",
      width: "50px",
      height: "50px",
      position: "relative",
      animation: "$skChase 2.5s infinite linear both",
    },
    skChaseDot: {
      "&::before": {
        content: ' "" !important',
        display: "block",
        width: "30%",
        height: "30%",
        backgroundColor: theme.palette.common.green,
        borderRadius: "100%",
        animation: "$skChaseDotBefore 2.0s infinite ease-in-out both",
      },
      width: "100%",
      height: "100%",
      position: "absolute",
      left: 0,
      top: 0,
      animation: "$skChaseDot 2.0s infinite ease-in-out both",
      "&:nth-child(1)": {
        animationDelay: "-1.1s",
        "&::before": {
          animationDelay: "-1.1s",
        },
      },
      "&:nth-child(2)": {
        animationDelay: "-1.0s",
        "&::before": {
          animationDelay: "-1.0s",
        },
      },
      "&:nth-child(3)": {
        animationDelay: "-0.9s",
        "&::before": {
          animationDelay: "-0.9s",
        },
      },
      "&:nth-child(4)": {
        animationDelay: "-0.8s",
        "&::before": {
          animationDelay: "-0.8s",
        },
      },
      "&:nth-child(5)": {
        animationDelay: "-0.7s",
        "&::before": {
          animationDelay: "-0.7s",
        },
      },
      "&:nth-child(6)": {
        animationDelay: "-0.6s",
        "&::before": {
          animationDelay: "-0.6s",
        },
      },
    },
    "@keyframes skChase": {
      "100%": { transform: "rotate(360deg)" },
    },

    "@keyframes skChaseDot": {
      "80%, 100%": { transform: "rotate(360deg)" },
    },

    "@keyframes skChaseDotBefore": {
      "50%": {
        transform: " scale(0.4)",
      },
      "100%, 0%": {
        transform: "scale(1.0)",
      },
    },
  })
);

export default function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.skChase}>
      <div className={classes.skChaseDot}></div>
      <div className={classes.skChaseDot}></div>
      <div className={classes.skChaseDot}></div>
      <div className={classes.skChaseDot}></div>
      <div className={classes.skChaseDot}></div>
      <div className={classes.skChaseDot}></div>
    </div>
  );
}
