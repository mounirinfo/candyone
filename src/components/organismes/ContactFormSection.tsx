"use client";

import React from "react";
import { Box, Stack, styled } from "@mui/material";
import RoundedImage from "../atoms/RoundedImage";
import ContactFormFields from "../molecules/ContactFormFields";

export type ContactFormSectionProps = {
  imageUrl: string;
  currentUser?: {
    id: string;
    prenom: string;
    nom: string;
    telephone: string;
    email: string;
  } | null;
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
  currentUser,
}) => (
  <Grid>
    <Stack spacing={2} sx={{ p: 3 }}>
      <RoundedImage>
        <img src={imageUrl} alt="contact visual" />
      </RoundedImage>
    </Stack>

    <Box sx={{ mt: 4, p: 3 }}>
      <ContactFormFields
        initialValues={{
          prenom: currentUser?.prenom,
          nom: currentUser?.nom,
          telephone: currentUser?.telephone,
          email: currentUser?.email,
        }}
        clientId={currentUser?.id || null}
        onSuccess={(cb) => console.log("✅ Callback créé :", cb)}
      />
    </Box>
  </Grid>
);

export default ContactFormSection;
