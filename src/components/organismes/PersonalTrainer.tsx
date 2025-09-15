"use client";

import React from "react";
import { Box, Typography, styled } from "@mui/material";
import RoundedImage4 from "../atoms/RoundedImage";
import NameTitle from "../atoms/NameTitle";
import SubTitle from "../atoms/SubTitle";
import FeatureList from "../molecules/FeatureList";

export type PersonalTrainerProps = {
  name: string;
  role: string;
  imageUrl: string;
  features: string[];
  footerText: string;
};

const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  justifyItems: "center", 
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr",
    alignItems: "center",
  },
}));

export const PersonalTrainer: React.FC<PersonalTrainerProps> = ({
  name,
  role,
  imageUrl,
  features,
  footerText,
}) => (
  <Grid>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", 
        alignItems: "flex-start",
        gap: 0, 
        width: "100%",
      }}
    >
      <Box sx={{ position: "relative", maxWidth: 550, width: "100%" }}>
        <Box sx={{ position: "absolute", top: -1, left: 16, zIndex: 2 }}>
          <NameTitle>{name}</NameTitle>
          <SubTitle>{role}</SubTitle>
        </Box>

        <RoundedImage4>
          <img src={imageUrl} alt={name} />
        </RoundedImage4>
      </Box>

      <FeatureList features={features} />
    </Box>

    <Typography sx={{ mt: 2, fontSize: 25, textAlign: "center" }}>
      {footerText}
    </Typography>
  </Grid>
);

export default PersonalTrainer;
