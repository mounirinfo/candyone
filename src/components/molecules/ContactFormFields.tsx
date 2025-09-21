"use client";

import React from "react";
import { Stack, TextField } from "@mui/material";
import SubmitButton from "../atoms/SubmitButton";

export type ContactFormFieldsProps = {
  onSubmit?: (values: Record<string, string>) => void;
};

export const ContactFormFields: React.FC<ContactFormFieldsProps> = ({ onSubmit }) => {
  const [values, setValues] = React.useState<Record<string, string>>({});

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    onSubmit?.(values);
  };

  return (
    <Stack spacing={2}>
      <TextField required label="Prénom" variant="outlined" fullWidth onChange={handleChange("prenom")} />
      <TextField required label="Nom" variant="outlined" fullWidth onChange={handleChange("nom")} />
      <TextField required label="Numéro de téléphone" variant="outlined" fullWidth onChange={handleChange("telephone")} />
      <TextField required type="email" label="Email" variant="outlined" fullWidth onChange={handleChange("email")} />
      <TextField required label="Coach souhaité" variant="outlined" fullWidth onChange={handleChange("coach")} />
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
    </Stack>
  );
};

export default ContactFormFields;