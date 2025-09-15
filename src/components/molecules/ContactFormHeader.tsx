"use client";

import React from "react";
import { Box, Stack } from "@mui/material";
import SectionTitle from "../atoms/SectionTitle";
import Subtitle from "../atoms/SubTitle";

export type ContactFormHeaderProps = {
  title: string;
  subtitle: string;
};

export const ContactFormHeader: React.FC<ContactFormHeaderProps> = ({ title, subtitle }) => (
  <Box>
    <SectionTitle>{title}</SectionTitle>
    <Subtitle>{subtitle}</Subtitle>
  </Box>
);

export default ContactFormHeader;