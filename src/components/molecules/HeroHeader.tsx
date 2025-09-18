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
        marginLeft: isMobile ? 0 : "20px",
        textAlign: isMobile ? "center" : "left",
        marginTop: isMobile ? "-120px" : 0, 
      }}
    >
      {!isMobile && (
        <Image
          src="/logo.png"
          alt="Logo"
          width={500}
          height={500}
          style={{
            marginBottom: "-150px",
            marginTop: "-230px",
            maxWidth: "100%",
            height: "auto",
          }}
        />
      )}
      {isMobile && (
        <Image
          src="/logo.png"
          alt="Logo"
          width={500}
          height={500}
          style={{
            marginBottom: "-110px",
            marginTop: "10px",
            maxWidth: "100%",
            height: "auto",
          }}
        />
      )}

      <GradientPill>
        <BigWord  style={{
          marginLeft: isMobile ? "-10px" : 0, 
        }} component="span">{title}</BigWord>
      </GradientPill>

      <CandyOne
        style={{
          marginLeft: isMobile ? "-50px" : 0,
        }}
      >
        {subtitle}
      </CandyOne>
    </Stack>
  );
};

export default HeroHeader;
