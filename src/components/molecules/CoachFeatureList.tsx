"use client";

import React from "react";
import { Box, Stack, Typography, Divider, styled } from "@mui/material";
import ListRow from "../atoms/ListRow";
import GhostCTA from "../atoms/GhostCTA";

const Cyan = "#40a2ff";
const Sky = "#b4e8ff";
const Gradient = `linear-gradient(90deg, ${Cyan} 0%, ${Sky} 100%)`;

export type CoachFeatureListProps = {
  items: Array<{ text: string; strong?: boolean }>;
  ctaLabel: string;
  onCta?: () => void;
};

const FeaturePanel = styled(Box)(({ theme }) => ({
  borderRadius: 2,
  background: Gradient,
  overflow: "hidden",
  boxShadow: "0 20px 50px rgba(0,0,0,.25)",
}));

export const CoachFeatureList: React.FC<CoachFeatureListProps> = ({ items, ctaLabel, onCta }) => (
  <FeaturePanel>
    <Stack divider={<Divider sx={{ opacity: 0.35, borderColor: "rgba(255,255,255,.6)" }} />}>
      {items.map((it, i) => (
        <ListRow key={i}>
          <Typography sx={{ fontWeight: it.strong ? 900 : 700 }}>{it.text}</Typography>
        </ListRow>
      ))}
      <ListRow>
        <GhostCTA onClick={onCta}>{ctaLabel}</GhostCTA>
      </ListRow>
    </Stack>
  </FeaturePanel>
);

export default CoachFeatureList;
