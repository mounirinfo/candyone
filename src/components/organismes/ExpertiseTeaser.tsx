"use client";

import React from "react";
import { Box, Stack, styled, useMediaQuery, useTheme } from "@mui/material";
import RoundedImage3 from "../atoms/RoundedImage3";
import HugeTitle from "../atoms/HugeTitle";
import SoftSubtitle from "../atoms/SoftSubtitle";
import ExpertiseCard from "../molecules/ExpertiseCard";
import PillCTA from "../atoms/PillCTA";
import Panel from "../atoms/Panel";

export type ExpertiseTeaserProps = {
  title: string;
  subtitle: string;
  leftImageUrl: string;
  rightImageUrl: string;
  card: {
    ribbonTop: string;
    ribbonMid?: string;
    ribbonBottom?: string;
    bullets: { text: string; strong?: boolean }[];
  };
  ctaLabel: string;
  onCta?: () => void;
};

const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 0.9fr 1fr",
    alignItems: "center",
  },
}));

export const ExpertiseTeaser: React.FC<ExpertiseTeaserProps> = ({
  title,
  subtitle,
  leftImageUrl,
  rightImageUrl,
  card,
  ctaLabel,
  onCta,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 

  return (
    <Panel>
      <Grid>
        {!isMobile && (
          <RoundedImage3>
            <img src={leftImageUrl} alt="expertise left" />
          </RoundedImage3>
        )}

        <Stack
          spacing={2}
          alignItems={{ xs: "flex-start", md: "flex-start" }}
          textAlign={{ xs: "left", md: "left" }}
          sx={{
            pl: { xs: 0, md: 0 },      
            ml: { xs: "-30px", md: 0 }, 
          }}
        >
          <HugeTitle>{title}</HugeTitle>
          <SoftSubtitle>{subtitle}</SoftSubtitle>
          <ExpertiseCard {...card} />
          <PillCTA onClick={onCta}>{ctaLabel}</PillCTA>
        </Stack>

        {!isMobile && (
          <RoundedImage3>
            <img src={rightImageUrl} alt="expertise right" />
          </RoundedImage3>
        )}
      </Grid>
    </Panel>
  );
};

export default ExpertiseTeaser;
