"use client"
import React from "react";
import { Stack, Rating } from "@mui/material";
import QuoteMark from "../atoms/QuoteMark";
import BigName from "../atoms/BigName";
import Lead from "../atoms/Lead";
import Cta from "../atoms/Cta";

export type TestimonialBodyProps = {
  name: string;
  rating?: number;
  paragraphs: string[];
  ctaLabel?: string;
  onCta?: () => void;

};

export const TestimonialBody: React.FC<TestimonialBodyProps> = ({ name, rating = 5, paragraphs, ctaLabel = "VOIR TOUS LES AVIS", onCta }) => (
  <Stack spacing={1.5}>
    <QuoteMark />
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <BigName>{name}</BigName>
      <Rating readOnly value={rating} precision={0.5} />
    </Stack>
    {paragraphs.map((p, i) => (
      <Lead key={i}>{p}</Lead>
    ))}
    <Cta onClick={onCta}>{ctaLabel}</Cta>
  </Stack>
);

export default TestimonialBody;