"use client"
import React from "react";
import { Box,Stack, Typography, styled } from "@mui/material";
import Stamp from "@/components/atoms/Stamp";
import BigWeeks from "@/components/atoms/BigWeeks";

const PromoRow = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  gap: theme.spacing(1.5),
}));

export const PromoRowComponent: React.FC = () => (
  <PromoRow>
    <Typography sx={{ fontWeight: 900, fontSize: 34 }}>ON T’OFFRE</Typography>
    <Stamp>
      <Typography variant="caption" sx={{ fontWeight: 700 }}>L’ABONNEMENT</Typography>
      <Box component="img" src="/assets/basicfit-stamp.png" alt="BASIC-FIT" sx={{ height: 24 }} />
    </Stamp>
    <Typography sx={{ fontWeight: 900, fontSize: 28 }}>PENDANT</Typography>
    <BigWeeks>58 SEMAINES</BigWeeks>
  </PromoRow>
);

export default PromoRowComponent;