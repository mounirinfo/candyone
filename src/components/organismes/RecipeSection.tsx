"use client";

import React from "react";
import { Box, Stack, styled } from "@mui/material";
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
  gap: theme.spacing(3),
  background: Sky,
  padding: theme.spacing(4),
  borderRadius: 24,
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
  },
}));

export const RecipeSection: React.FC<RecipeSectionProps> = ({ imageUrl, features }) => (
  <Grid>
    <Stack spacing={1}>
      <SectionTitle>NOTRE RECETTE</SectionTitle>
      <RoundedImage>
        <img src={imageUrl} alt="Notre recette" />
      </RoundedImage>
    </Stack>

    <Stack spacing={1}>
      {features.map((f, i) => (
        <RecipeFeature key={i} icon={f.icon} title={f.title} desc={f.desc} />
      ))}
    </Stack>
  </Grid>
);

export default RecipeSection;