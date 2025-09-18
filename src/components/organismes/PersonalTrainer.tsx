"use client";

import React from "react";
import {
  Box,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
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
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      sx={{
        px: isMobile ? 2 : 0,
        py: isMobile ? 2 : 4,
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row", 
          justifyContent: "center",
          alignItems: isMobile ? "center" : "flex-start",
          gap: isMobile ? 2 : 0,
          width: "100%",
        }}
      >
        {/* IMAGE */}
        <Box
          sx={{
            position: "relative",
            width: isMobile ? "100%" : "100%",
            maxWidth: isMobile ? "100%" : 550,
            mb: isMobile ? 2 : 0,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 16,
              zIndex: 2,
            }}
          >
            <NameTitle sx={{ fontSize: isMobile ? "1.5rem" : "2rem" }}>
              {name}
            </NameTitle>
            <SubTitle sx={{ fontSize: isMobile ? "1rem" : "1.2rem" }}>
              {role}
            </SubTitle>
          </Box>

          <RoundedImage4>
            <img
              src={imageUrl}
              alt={name}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
              }}
            />
          </RoundedImage4>
        </Box>

        {/* FEATURES */}
        <Box
          sx={{
            width: isMobile ? "100%" : "auto",
            maxWidth: isMobile ? "100%" : "650px",
          }}
        >
          <FeatureList features={features} />
        </Box>
      </Box>

      {/* FOOTER */}
      <Typography
        sx={{
          mt: 2,
          fontSize: isMobile ? 18 : 25,
          textAlign: "center",
          px: 2,
        }}
      >
        {footerText}
      </Typography>
    </Grid>
  );
};

export default PersonalTrainer;
