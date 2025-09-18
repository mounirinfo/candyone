"use client";
import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import FeatureBox from "../atoms/FeatureBox";
import ContactBtn from "../atoms/ContactBtn";

export type FeatureListProps = {
  features: string[];
};

export const FeatureList: React.FC<FeatureListProps> = ({ features }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        overflow: "hidden",
        boxShadow: "0 12px 30px rgba(0,0,0,.2)",
        width: isMobile ? "100%" : 650, // ✅ pleine largeur sur mobile, fixe sur PC
        maxWidth: "100%", // ✅ sécurité pour ne jamais dépasser l’écran
        height: isMobile ? "auto" : 735, // ✅ auto sur mobile, fixe sur PC
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {features.map((f, i) => (
        <FeatureBox key={i}>{f}</FeatureBox>
      ))}
      <ContactBtn>Contacter</ContactBtn>
    </Box>
  );
};

export default FeatureList;
