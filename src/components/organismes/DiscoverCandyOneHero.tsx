"use client";

import React from "react";
import { Box, Stack, styled } from "@mui/material";
import HeroHeader from "../molecules/HeroHeader";
import ScriptPrice from "../atoms/ScriptPrice";
import ReserveBtn from "../atoms/ReserveBtn";
import ClipRight from "../atoms/ClipRight";
import { Sky } from "../atoms/Colors";
import { useRouter } from "next/navigation";

export type DiscoverCandyOneHeroProps = {
  rightImageUrl: string;
  onReserve?: () => void;
  onReserveHref?: string;
  bgColor?: string;
};

const Grid = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<{ bgColor?: string }>(({ theme, bgColor }) => ({
  background: bgColor || Sky,
  borderRadius: 16,
  padding: theme.spacing(4),
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1.1fr 1fr",
    alignItems: "center",
  },
}));

export const DiscoverCandyOneHero: React.FC<DiscoverCandyOneHeroProps> = ({ rightImageUrl, onReserve, onReserveHref, bgColor }) => 
  {
    const router = useRouter();
    return (
  <Grid bgColor={bgColor}>
    <Stack spacing={1}>
      <HeroHeader title="DÉCOUVREZ" subtitle="Candy One" />
      <ScriptPrice>A partir de 9,99€ / 4 semaines</ScriptPrice>
      {onReserveHref ? (
        <ReserveBtn onClick={() =>router.push(onReserveHref)}>RÉSERVEZ</ReserveBtn>
      ) : (
        <ReserveBtn onClick={onReserve}>RÉSERVEZ</ReserveBtn>
      )}
    </Stack>

    <ClipRight>
      <img src={rightImageUrl} alt="visuel Candy One" />
    </ClipRight>
  </Grid>
    
);
  }

export default DiscoverCandyOneHero;