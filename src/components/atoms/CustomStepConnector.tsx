import { StepConnector, stepConnectorClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: "50%", // 🔹 centre verticalement par rapport aux ronds
    left: "calc(-50% + 20px)",
    right: "calc(50% + 20px)",
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#FB98F6",
    borderTopWidth: 2,
  },
}));
