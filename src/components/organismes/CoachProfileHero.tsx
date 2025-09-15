"use client";

import React from "react";
import { Box, Stack, styled, useTheme, useMediaQuery } from "@mui/material";
import RoundedImage from "../atoms/RoundedImage";
import CoachHeader from "../molecules/CoachHeader";
import CoachFeatureList from "../molecules/CoachFeatureList";

export type CoachProfileHeroProps = {
  name: string;
  role: string;
  photoUrl: string;
  features: Array<{ text: string; strong?: boolean }>;
  ctaLabel: string;
  onCta?: () => void;
  intro?: React.ReactNode;
};

const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1.1fr 1fr",
    alignItems: "start",
  },
}));

export const CoachProfileHero: React.FC<CoachProfileHeroProps> = ({ 
  name, 
  role, 
  photoUrl, 
  features, 
  ctaLabel, 
  onCta, 
  intro 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  return (
    <Stack spacing={isMobile ? 1 : 2}>
      <Grid>
        <Stack spacing={isMobile ? 1 : 2}>
          <CoachHeader name={name} role={role} />
          <Box sx={{ 
            display: 'flex', 
            justifyContent: isMobile ? 'center' : 'flex-start',
            width: '100%'
          }}>
            <RoundedImage>
              <img 
                src={photoUrl} 
                alt={name} 
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  maxWidth: isMobile ? '280px' : '100%'
                }} 
              />
            </RoundedImage>
          </Box>
        </Stack>

        <CoachFeatureList 
          items={features} 
          ctaLabel={ctaLabel} 
          onCta={onCta} 
        />
      </Grid>
      {intro && (
        <Box sx={{ 
          mt: isMobile ? 1 : 2,
          px: isMobile ? 1 : 0
        }}>
          {intro}
        </Box>
      )}
    </Stack>
  );
};

export default CoachProfileHero;