"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import FeatureRow from "../atoms/FeatureRow";
import { LollipopIcon } from "../atoms/LollipopIcon";
import { Pink } from "../atoms/color";

export type BonusFeatureProps = {
  title: string;
  subtitle: string;
};

export const BonusFeature: React.FC<BonusFeatureProps> = ({ title, subtitle }) => (
  <FeatureRow>
    <LollipopIcon />
    <Box>
      <Typography sx={{ fontWeight: 700, fontSize: 16 }}>{title}</Typography>
      <Typography sx={{ fontSize: 14, color: Pink, fontWeight: 400 }}>{subtitle}</Typography>
    </Box>
  </FeatureRow>
);

export default BonusFeature;