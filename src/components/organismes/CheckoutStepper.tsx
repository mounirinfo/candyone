"use client";

import { Stepper, Step, StepLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

const primaryColor = "#FB98F6";
const secondaryColor = "#2D3748";

const steps = [
  "Choix de la salle",
  "Choix de l'abonnement",
  "Choix des options",
  "Coordonnées",
];

type CheckoutStepperProps = {
  activeStep: number;
};

const StyledStepper = styled(Stepper)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  "& .MuiStep-root": {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  "& .MuiStepLabel-root": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  "& .MuiStepLabel-iconContainer": {
    zIndex: 2,
    padding: 0,
  },
  "& .MuiStepLabel-label": {
    fontWeight: 600,
    fontSize: "0.85rem",
    color: secondaryColor,
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
  "& .MuiStepIcon-root": {
    color: "#e0e0e0",
    width: 32,
    height: 32,
    "&.Mui-active": {
      color: primaryColor,
      boxShadow: `0 0 0 4px ${primaryColor}20`,
    },
    "&.Mui-completed": {
      color: primaryColor,
    },
    "& .MuiStepIcon-text": {
      fill: secondaryColor,
      fontSize: "0.8rem",
      fontWeight: 600,
    },
  },
  "& .MuiStepConnector-line": {
    borderColor: primaryColor,
    borderTopWidth: 3,
    borderRadius: 2,
  },
}));

export default function CheckoutStepper({ activeStep }: CheckoutStepperProps) {
  return (
    <StyledStepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </StyledStepper>
  );
}
