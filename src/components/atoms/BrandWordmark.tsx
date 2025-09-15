"use client"
import React from 'react';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LollipopIcon } from './LollipopIcon';

const BrandRow = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  gap: theme.spacing(2),
}));

const CandyPill = styled('div')(({ theme }) => ({
  background: "#000",
  color: "#fff",
  borderRadius: 8,
  padding: theme.spacing(1.2, 2),
  letterSpacing: 6,
  fontWeight: 800,
  fontSize: 22,
  fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
}));

const BodyWord = styled('div')(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.2),
  fontWeight: 800,
  fontSize: 32,
  letterSpacing: 6,
}));

export const BrandWordmark: React.FC = () => (
  <BrandRow direction="row">
    <CandyPill>CANDY</CandyPill>
    <BodyWord>
      <span>B</span>
      <LollipopIcon />
      <span>DY</span>
    </BodyWord>
  </BrandRow>
);
