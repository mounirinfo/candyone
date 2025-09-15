"use client"
import React from "react";
import { Box, Stack, styled } from "@mui/material";
import SoftPanel from "../atoms/SoftPanel";
import RoundedImage2 from "../atoms/RoundedImage2";
import Title from "../atoms/Title";
import Title2 from "../atoms/Title2";

import TestimonialBody from "../molecules/TestimonialBody";

export type GourmetTestimonialProps = {
  imageUrl: string;
  name: string;
  rating?: number;
  paragraphs: string[];
  bgColor?: string; // Nouvelle prop pour la couleur de fond
};

const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1.1fr 1fr",
    alignItems: "center",
  },
}));

export const GourmetTestimonial: React.FC<GourmetTestimonialProps> = ({ imageUrl, name, rating = 5, paragraphs, bgColor }) => (
  <SoftPanel bgColor={bgColor}>
    <Grid>
      <RoundedImage2>
        <img src={imageUrl} alt={name} />
      </RoundedImage2>

      <Stack spacing={0}>
        <Stack spacing={0}>
  <Title sx={{ mb: 0 }}>L’AVIS</Title>
  <Title2 sx={{ mt: -5 }}>D’UN GOURMET</Title2>
</Stack>

        <TestimonialBody name={name} rating={rating} paragraphs={paragraphs} />
      </Stack>
    </Grid>
  </SoftPanel>
);

export default GourmetTestimonial;