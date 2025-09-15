"use client";

import React from "react";
import { Box, Stack, styled } from "@mui/material";
import BonusFeature from "../molecules/BonusFeature";
import BonusPromoText from "../molecules/BonusPromoText";
import BonusTextBlock from "../atoms/BonusTextBlock";

export type BonusFeatureProps = {
  title: string;
  subtitle: string;
};

export type BonusSectionProps = {
  imageTop: string;
  imageBottom: string;
  features: BonusFeatureProps[];
  bgColor?: string;
};

const Root = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<{ bgColor?: string }>(({ theme, bgColor }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(4),
  background: bgColor || "transparent",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
  },
}));

export const BonusSection: React.FC<BonusSectionProps> = ({ imageTop, imageBottom, features, bgColor }) => (
  <Root bgColor={bgColor}>
    <Box component="img" src={imageTop} alt="bonus haut" sx={{ width: "100%", borderRadius: 2 }} />

    <Stack spacing={2}>
      {features.map((f, i) => (
        <BonusFeature key={i} {...f} />
      ))}
    </Stack>

    <Box component="img" src={imageBottom} alt="bonus bas" sx={{ width: "100%", borderRadius: 2, gridColumn: { md: "span 1" } }} />

    <BonusTextBlock>
      <BonusPromoText
        title="EN BONUS"
        highlights={[
          { text: "ON T’OFFRE" },
          { text: "PENDANT" },
          { text: "58 SEMAINES", pink: true },
        ]}
        badgeText="L’ABONNEMENT"
        partnerText="BASIC-FIT"
      />
    </BonusTextBlock>
  </Root>
);

export default BonusSection;