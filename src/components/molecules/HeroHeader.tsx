"use client";

import React from "react";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import GradientPill from "../atoms/GradientPill";
import BigWord from "../atoms/BigWord";
import CandyOne from "../atoms/CandyOne";

export type HeroHeaderProps = {
  title: string;
  subtitle: string;
};

export const HeroHeader: React.FC<HeroHeaderProps> = ({ title, subtitle }) => (
  <Stack
    spacing={1}
    alignItems="flex-start" 
    sx={{
      marginLeft: "20px",   
    }}
  >
    <Image 
      src="/logo.png" 
      alt="Logo" 
      width={500} 
      height={500} 
      style={{ marginBottom: '-150px', marginTop: '-230px' }} 
    />
    <GradientPill>
  <BigWord component="span">{title}</BigWord>
    </GradientPill>
    <CandyOne>{subtitle}</CandyOne>
  </Stack>
);

export default HeroHeader;