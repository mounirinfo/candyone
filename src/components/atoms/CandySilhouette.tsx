"use client";

import React from "react";
import { Box } from "@mui/material";
import { Cyan, Pink } from "./Colors";

const CandySilhouette: React.FC<{ size?: number }> = ({ size = 140 }) => (
  <Box component="svg" width={size} height={size * 1.4} viewBox="0 0 90 130" aria-hidden>
    <defs>
      <linearGradient id="lolli" x1="0" x2="1">
        <stop offset="0%" stopColor={Cyan} />
        <stop offset="100%" stopColor={Pink} />
      </linearGradient>
    </defs>
    <circle cx="45" cy="28" r="18" fill="#000" />
    <rect x="22" y="48" width="46" height="66" rx="20" fill="#000" />
    {/* Lollipop */}
    <g transform="translate(54,30)">
      <rect x="-1" y="10" width="2" height="28" fill="#000" />
      <circle cx="0" cy="6" r="8" fill="url(#lolli)" />
      <text x="-8" y="7" fontSize="4" fontWeight="900">CANDY</text>
    </g>
  </Box>
);

export default CandySilhouette;