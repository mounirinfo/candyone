"use client";
import React, { useMemo } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ClubCard, ClubCardProps } from "../molecules/ClubCard";

const Hero = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bg",
})<{ bg: string }>(({ theme, bg }) => ({
  position: "relative",
  minHeight: "auto", 
  flexDirection: "column", 
    alignItems: "center",
  padding: theme.spacing(5), 
  backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  overflow: "hidden",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
    minHeight: "70vh", 
  },
  [theme.breakpoints.up("md")]: {
    minHeight: "100vh", 
    padding: theme.spacing(4),
    display: "grid", 
    placeItems: "center",
  },
}));

const CardsGrid = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "100%", 
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2), 
  [theme.breakpoints.up("sm")]: {
    maxWidth: 800, 
    gap: theme.spacing(3),
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: 1200, 
    display: "grid", 
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(4),
  },
}));

const PartnerBar = styled(Box)(({ theme }) => ({
  position: "relative", 
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1.5, 2), 
  color: theme.palette.common.white,
  fontWeight: 800,
  letterSpacing: 1,
  textTransform: "uppercase",
  textAlign: "center", 
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(2, 2.5),
  },
  [theme.breakpoints.up("md")]: {
    position: "absolute", 
    left: 0,
    right: 0,
    bottom: 0,
    padding: theme.spacing(2.5, 3),
    textAlign: "left", 
  },
}));

export type Club = {
  id: string;
  address1: string;
  address2?: string;
  accent?: "pink" | "blue";
  onClick?: () => void;
};

export type ClubSelectorHeroProps = {
  backgroundUrl: string;
  clubs: Club[];
  partnerNote?: string;
  sx?: any; 
};

export const ClubSelectorHero: React.FC<ClubSelectorHeroProps> = ({
  backgroundUrl,
  clubs,
  partnerNote,
  sx,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const firstTwo = useMemo(() => clubs.slice(0, 2), [clubs]);

  return (
    <Hero bg={backgroundUrl} sx={sx}>
      <CardsGrid>
        {firstTwo.map((c) => (
          <ClubCard
            key={c.id}
            address1={c.address1}
            address2={c.address2}
            accent={c.accent}
            onClick={c.onClick}
           
          />
        ))}
      </CardsGrid>

     {partnerNote && (
  <PartnerBar>
    <Typography
      component="span"
      sx={{
        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
        fontWeight: 700,
      }}
    >
      Partenaire officiel
    </Typography>

    <Box
      component="img"
      src="/basicfit.svg"   
      alt="BasicFit"
      sx={{
        height: { xs: 24, sm: 32, md: 40 },
        objectFit: "contain",
      }}
    />
  </PartnerBar>
)}

    </Hero>
  );
};

export default ClubSelectorHero;
