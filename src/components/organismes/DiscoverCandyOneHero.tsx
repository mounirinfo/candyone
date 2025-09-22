"use client";

import React from "react";
import { Box, Stack, styled, useTheme, useMediaQuery } from "@mui/material";
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
  textAlign: "center",
  paddingTop: theme.spacing(0),
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1.1fr 1fr",
    alignItems: "center",
    textAlign: "left",
    paddingTop: theme.spacing(4),
  },
}));

export const DiscoverCandyOneHero: React.FC<DiscoverCandyOneHeroProps> = ({
  rightImageUrl,
  onReserve,
  onReserveHref,
  bgColor,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid bgColor={bgColor}>
      <Stack spacing={2}>
        <HeroHeader title="DÉCOUVREZ" subtitle="Candy One" />
        <ScriptPrice>A partir de 9,99€ / 4 semaines</ScriptPrice>

        {onReserveHref ? (
          <ReserveBtn
            onClick={() => router.push(onReserveHref)}
            style={{
              marginLeft: isMobile ? "-60px" : 0, 
            }}
          >
            RÉSERVEZ
          </ReserveBtn>
        ) : (
          <ReserveBtn
            onClick={onReserve}
            style={{
              marginLeft: isMobile ? "-20px" : 0,
            }}
          >
            RÉSERVEZ
          </ReserveBtn>
        )}
      </Stack>

      {!isMobile && (
        <ClipRight>
          <img
            src={rightImageUrl}
            alt="visuel Candy One"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: 12,
            }}
          />
        </ClipRight>
      )}
    </Grid>
  );
};

export default DiscoverCandyOneHero;
