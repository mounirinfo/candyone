"use client";

import React from "react";
import { Box, Stack, styled, useMediaQuery, useTheme } from "@mui/material";
import RoundedImage from "../atoms/RoundedImage";
import SectionTitle from "../atoms/SectionTitle";
import RecipeFeature from "../molecules/RecipeFeature";

export type RecipeFeatureProps = {
  icon: React.ReactNode;
  title: string;
  desc?: string;
};

export type RecipeSectionProps = {
  imageUrl: string;
  features: RecipeFeatureProps[];
};

const Sky = "#ddf9ff";

const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(4),
  background: Sky,
  padding: theme.spacing(4),
  borderRadius: 24,
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    gap: theme.spacing(6),
    padding: theme.spacing(6),
  },
}));

export const RecipeSection: React.FC<RecipeSectionProps> = ({
  imageUrl,
  features,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid>
      {/* Partie image + titre */}
      <Stack spacing={2} alignItems={isMobile ? "center" : "flex-start"}>
        <SectionTitle>NOTRE RECETTE</SectionTitle>

        {/* On masque l’image si mobile */}
        {!isMobile && (
          <RoundedImage>
            <img
              src={imageUrl}
              alt="Notre recette"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </RoundedImage>
        )}
      </Stack>

      {/* Partie features */}
      <Stack spacing={isMobile ? 3 : 4}>
        {features.map((f, i) => (
          <RecipeFeature
            key={i}
            icon={f.icon}
            title={f.title}
            desc={f.desc}
          />
        ))}
      </Stack>
    </Grid>
  );
};

export default RecipeSection;
