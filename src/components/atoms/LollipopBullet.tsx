"use client"
import React from "react";
import { styled } from "@mui/material/styles";

const Pink = "#ff48b0";

const LollipopBullet: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
    <g stroke={Pink} fill="none" strokeWidth="2" strokeLinecap="round">
      <circle cx="9" cy="9" r="5" fill={Pink} opacity={0.15} />
      <path d="M13.5 13.5 L21 21" />
    </g>
  </svg>
);

export default LollipopBullet;