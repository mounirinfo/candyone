"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import FeatureRow from "../atoms/FeatureRow";

export type RecipeFeatureProps = {
  icon: React.ReactNode;
  title: string;
  desc?: string;
};

export const RecipeFeature: React.FC<RecipeFeatureProps> = ({ icon, title, desc }) => (
  <FeatureRow>
    <Box sx={{ fontSize: 55 }}>{icon}</Box>
    <Typography sx={{ fontWeight: 800, fontSize: 30 }}>{title}</Typography>
    {desc && <Typography sx={{ fontSize: 15 }}>{desc}</Typography>}
  </FeatureRow>
);

export default RecipeFeature;