"use client";
import React from "react";
import { Card, CardContent, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BrandWordmark } from "../atoms/BrandWordmark";
import { AddressText } from "../atoms/AddressText";
import { CtaButton } from "../atoms/CtaButton";

const CardRoot = styled(Card)(({ theme }) => ({
  borderRadius: 28,
  backdropFilter: "saturate(120%) blur(2px)",
  boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
  position: "relative", 
  overflow: "visible", 
  minHeight: "100px",
}));

export type ClubCardProps = {
  address1: string;
  address2?: string;
  ctaLabel?: string;
  onClick?: () => void;
  accent?: "pink" | "blue";
};

export const ClubCard: React.FC<ClubCardProps> = ({
  address1,
  address2,
  ctaLabel = "CHOISIR CE CLUB",
  onClick,
  accent = "pink",
}) => (
  <CardRoot>
    <CardContent sx={{ padding: { xs: 1, md: 2 }, height: "100%" }}>
      <Stack alignItems="center" spacing={3} sx={{ height: "100%", justifyContent: "space-between" }}>
        <BrandWordmark />
        <AddressText line1={address1} line2={address2} accent={accent} />
        <CtaButton
          onClick={onClick}
          accentColor={accent === "pink" ? "#ef77bbff" : "#00aaff"}
          sx={{ bottom:-40 }} 
        >
          {ctaLabel}
        </CtaButton>
      </Stack>
    </CardContent>
  </CardRoot>
);