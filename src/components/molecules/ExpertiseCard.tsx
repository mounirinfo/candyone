"use client";

import React from "react";
import { Box, Stack, Typography, styled } from "@mui/material";
import RibbonBar from "../atoms/RibbonBar";
import BulletItem from "../atoms/BulletItem";

const Lime = "#9cff57";

const DarkCard = styled(Box)(({ theme }) => ({
  background: "#000",
  color: "#fff",
  borderRadius: 8,
  padding: theme.spacing(2.5),
  boxShadow: "0 20px 40px rgba(0,0,0,.35)",
}));

export type ExpertiseCardProps = {
  ribbonTop: string;
  ribbonMid?: string;
  ribbonBottom?: string;
  bullets: { text: string; strong?: boolean }[];
};

export const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ ribbonTop, ribbonMid, ribbonBottom, bullets }) => (
  <Stack spacing={2.25}>
    <RibbonBar>
      <Typography sx={{ fontWeight: 900 }}>{ribbonTop}</Typography>
      {ribbonMid && (
        <Typography sx={{ fontWeight: 900, color: Lime, display: "block" }}>{ribbonMid}</Typography>
      )}
      {ribbonBottom && (
        <Typography sx={{ fontWeight: 900, color: "#000", background: "#fff", px: 1, borderRadius: 1, display: "inline-block", mt: 0.5 }}>{ribbonBottom}</Typography>
      )}
    </RibbonBar>
    <DarkCard>
      <Stack spacing={1.25}>
        {bullets.map((b, i) => (
          <BulletItem key={i} text={b.text} strong={b.strong} />
        ))}
      </Stack>
    </DarkCard>
  </Stack>
);

export default ExpertiseCard;