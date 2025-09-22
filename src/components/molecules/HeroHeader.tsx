"use client";

import React from "react";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import GradientPill from "../atoms/GradientPill";
import BigWord from "../atoms/BigWord";
import CandyOne from "../atoms/CandyOne";

export type HeroHeaderProps = {
  title: string;
  subtitle: string;
};

export const HeroHeader: React.FC<HeroHeaderProps> = ({ title, subtitle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      spacing={1}
      alignItems={isMobile ? "center" : "flex-start"}
      sx={{
        textAlign: isMobile ? "center" : "left",
        mt: isMobile ? 4 : 0, 
        px: isMobile ? 4 : 0, 
      }}
    >
      <Image
        src="/logo.png"
        alt="Logo"
        width={isMobile ? 550 : 500} 
        height={isMobile ? 550 : 500}
        style={{
          maxWidth: "100%",
          height: "auto",
          marginBottom: isMobile ? -70 : "-150px",
          marginTop: isMobile ? -25 : "-230px",
        }}
      />

      <GradientPill>
        <BigWord
          component="span"
          style={{
            fontSize: isMobile ? "3rem" : undefined,
                      marginLeft: isMobile ? -30 : 0,

          }}
        >
          {title}
        </BigWord>
      </GradientPill>

      <CandyOne
        style={{
          fontSize: isMobile ? "3rem" : undefined, 
          marginTop: isMobile ? 4 : 0,
          marginLeft: isMobile ? -50 : 0,
        }}
      >
        {subtitle}
      </CandyOne>
    </Stack>
  );
};

export default HeroHeader;
