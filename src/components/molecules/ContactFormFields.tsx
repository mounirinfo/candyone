"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

export type ContactFormFieldsProps = {
  initialValues?: {
    prenom?: string;
    nom?: string;
    telephone?: string;
    email?: string;
  };
  clientId?: string | null;
  onSuccess?: (data: any) => void;
};

const ContactFormFields: React.FC<ContactFormFieldsProps> = ({
  initialValues,
  clientId,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    prenom: initialValues?.prenom || "",
    nom: initialValues?.nom || "",
    telephone: initialValues?.telephone || "",
    email: initialValues?.email || "",
    coach: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/callbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          clientId: clientId || null,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi du formulaire");

      const data = await res.json();
      if (onSuccess) onSuccess(data);

      // Reset form après succès
      setFormData({
        prenom: initialValues?.prenom || "",
        nom: initialValues?.nom || "",
        telephone: initialValues?.telephone || "",
        email: initialValues?.email || "",
        coach: "",
        message: "",
      });
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Prénom"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Téléphone"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          select
          label="Choisir un coach"
          name="coach"
          value={formData.coach}
          onChange={handleChange}
          fullWidth
          required
        >
          <MenuItem value="Gloria">Gloria</MenuItem>
          <MenuItem value="Eduin">Eduin</MenuItem>
          <MenuItem value="Quentin">Quentin</MenuItem>
        </TextField>

        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Envoi..." : "Envoyer"}
        </Button>
      </Stack>
    </Box>
  );
};

export default ContactFormFields;
