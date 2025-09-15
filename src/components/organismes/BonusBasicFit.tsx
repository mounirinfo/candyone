"use client"
import React from "react";
import { Box, Stack, styled } from "@mui/material";
import RoundedImage from "@/components/atoms/RoundedImage";
import BonusBullet from "@/components/molecules/BonusBullet";
import NeonTitle from "@/components/atoms//NeonTitle";
import PromoRowComponent from "@/components/molecules/PromoRow";

const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
    alignItems: "start",
  },
}));

export type BonusBasicFitProps = {
  leftImageUrl: string;
  rightImageUrl: string;
  bullets: { strong: string; sub?: string }[];
};

export const BonusBasicFit: React.FC<BonusBasicFitProps> = ({ leftImageUrl, rightImageUrl, bullets }) => (
  <Stack spacing={4} sx={{ p: { xs: 2, md: 4 } }}>
    <Grid>
      <RoundedImage>
        <img src={leftImageUrl} alt="Bonbons" />
      </RoundedImage>

      <Stack spacing={2}>
        {bullets.map((b, i) => (
          <BonusBullet key={i} strong={b.strong} sub={b.sub} />
        ))}
      </Stack>

      <Stack spacing={1}>
        <NeonTitle variant="h2">EN BONUS</NeonTitle>
        <PromoRowComponent />
      </Stack>

      <RoundedImage>
        <img src={rightImageUrl} alt="Anniversaire enfants" />
      </RoundedImage>
    </Grid>
  </Stack>
);

export default BonusBasicFit;