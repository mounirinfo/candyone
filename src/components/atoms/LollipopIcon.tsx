"use client"
import React from 'react';

const Pink = "#ff48b0"; // rose bonbon

export const LollipopIcon: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = Pink }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <g fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <circle cx="9" cy="9" r="5" fill={color} opacity={0.15} />
      <path d="M13.5 13.5 L21 21" />
      <path d="M7 7c1 .8 2 .8 3 0m-3 4c1 .8 2 .8 3 0M6 9c.7-.3 1.3-.3 2 0m2 0c.7-.3 1.3-.3 2 0" />
    </g>
  </svg>
);
