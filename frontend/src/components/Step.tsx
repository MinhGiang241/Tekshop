import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      background: "transparent",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

function getSteps() {
  return ["Giỏ hàng", "địa chỉ nhận hàng", "thanh toán"];
}

export default function HorizontalLabelPositionBelowStepper({
  children,
  activeStep,
  setActiveStep,
  handleNext,
  handleBack,
  handleReset,
}: any) {
  const classes = useStyles();
  const steps = getSteps();
  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        style={{ background: "transparent" }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}
