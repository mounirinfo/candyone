"use client";

import React from "react";
import { Box, Stack, styled } from "@mui/material";
import RoundedImage from "../atoms/RoundedImage";
import ContactFormHeader from "../molecules/ContactFormHeader";
import ContactFormFields from "../molecules/ContactFormFields";

export type ContactFormSectionProps = {
  imageUrl: string;
  onSubmit?: (values: Record<string, string>) => void;
};

const Sky = "#ffffffff";

const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(3),
  background: Sky,
  borderRadius: 16,
  overflow: "hidden",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
    alignItems: "stretch",
  },
}));

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  imageUrl,
  onSubmit,
}) => (
  <Grid>
    <Stack spacing={2}  sx={{ p: 3 }}>
      <RoundedImage>
        <img src={imageUrl} alt="contact visual" />
      </RoundedImage>
    </Stack>

    <Box sx={{ mt: 4, p: 3 }}>
      <ContactFormFields onSubmit={onSubmit} />
    </Box>
  </Grid>   
);

export default ContactFormSection;
