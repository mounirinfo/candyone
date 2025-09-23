"use client";
import React from "react";
import { Stack, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import LollipopBullet from "@/components/atoms/LollipopBullet";

const Pink = "#ff48b0";

const BulletRow = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "flex-start",
  gap: theme.spacing(1.25),
}));

export const BonusBullet: React.FC<{
  strong: string;
  sub?: string;
}> = ({ strong, sub }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack spacing={0.25}>
      <BulletRow>
        <LollipopBullet />
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: isMobile ? 18 : 25, 
          }}
        >
          {strong}
        </Typography>
      </BulletRow>
      {sub && (
        <Typography
          sx={{
            color: Pink,
            opacity: 0.9,
            ml: isMobile ? 3 : 3.8, 
            fontWeight: 550,
            fontSize: isMobile ? 15 : 20, 
          }}
        >
          {sub}
        </Typography>
      )}
    </Stack>
  );
};

export default BonusBullet;
