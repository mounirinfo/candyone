"use client"
import React from 'react';
import { Stack, Typography } from '@mui/material';

const Pink = "#ff48b0";
const Blue = "#40a2ff";

export const AddressText: React.FC<{
  line1: string;
  line2?: string;
  accent?: "pink" | "blue";
}> = ({ line1, line2, accent = "pink" }) => (
  <Stack spacing={0.5} alignItems="center" textAlign="center">
    <Typography
      sx={{
        fontWeight: 800,
        fontSize: 22,
        textTransform: "uppercase",
        color: accent === "pink" ? Pink : Blue,
      }}
    >
      {line1}
    </Typography>
    {line2 && (
      <Typography sx={{ fontWeight: 800, fontSize: 16 }}>
        {line2}
      </Typography>
    )}
  </Stack>
);
