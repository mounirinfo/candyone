"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import BonusTitle from "../atoms/BonusTitle";
import Highlight from "../atoms/Highlight";

export type BonusPromoTextProps = {
  title: string;
  highlights: { text: string; pink?: boolean }[];
  badgeText: string;
  partnerText: string;
};

const BonusPromoText: React.FC<BonusPromoTextProps> = ({ title, highlights, badgeText, partnerText }) => (
  <Stack spacing={1}>
    <BonusTitle>{title}</BonusTitle>
    <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
      {highlights.map((h, i) => (
        <Highlight key={i} pink={h.pink}>{h.text}</Highlight>
      ))}
    </Typography>
    <Typography variant="subtitle1" sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
      <Box sx={{ px: 1, py: 0.5, bgcolor: "#000", color: "#fff", borderRadius: 1 }}>{badgeText}</Box>
      <Box sx={{ fontWeight: 900, color: "#f60", fontSize: 20 }}>{partnerText}</Box>
    </Typography>
  </Stack>
);

export default BonusPromoText;