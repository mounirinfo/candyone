"use client";

import React from "react";
import { Box, Typography, Stack, useTheme, useMediaQuery } from "@mui/material";
import FeatureRow from "../atoms/FeatureRow";

export type RecipeFeatureProps = {
  icon: React.ReactNode;
  title: string;
  desc?: string;
};

export const RecipeFeature: React.FC<RecipeFeatureProps> = ({ icon, title, desc }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <FeatureRow>
      {/* Icône bien visible */}
      <Box
        sx={{
          fontSize: isMobile ? 80 : 150, // 40px sur mobile, 55px sur desktop
          color: "#FB98F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: isMobile ? 70 : 150, // espace réservé
        }}
      >
        {icon}
      </Box>

      {/* Titre + Description empilés */}
      <Stack spacing={0.5}>
        <Typography
          sx={{
            fontWeight: 900,
            fontSize: isMobile ? 30 : 45, // adaptatif
          }}
        >
          {title}
        </Typography>
        {desc && (
          <Typography
            sx={{
              fontSize: isMobile ? 13 : 15,
              color: "text.secondary",
            }}
          >
            {desc}
          </Typography>
        )}
      </Stack>
    </FeatureRow>
  );
};

export default RecipeFeature;
