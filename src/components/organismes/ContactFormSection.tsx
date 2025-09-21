"use client";

import React from "react";
import { Box, Stack, styled, TextField, MenuItem } from "@mui/material";
import RoundedImage from "../atoms/RoundedImage";
import SubmitButton from "../atoms/SubmitButton";

export type ContactFormSectionProps = {
  imageUrl: string;
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
}) => {
  const [values, setValues] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);

  // 🔹 Pré-remplissage du formulaire
  React.useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch("/api/current-client");
        const data = await res.json();

        if (data.client) {
          setValues({
            prenom: data.client.prenom ?? "",
            nom: data.client.nom ?? "",
            telephone: data.client.telephone ?? "",
            email: data.client.email ?? "",
            message: "",
            coach: "",
          });
        }
      } catch (err) {
        console.error("Erreur récupération client:", err);
      }
    };

    fetchClient();
  }, []);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/callbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: `${values.prenom ?? ""} ${values.nom ?? ""}`.trim(),
          telephone: values.telephone,
          email: values.email,
          message: values.message,
          notes_interne: values.coach,
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text);
      }

      const data = JSON.parse(text);
      alert("✅ Callback créé avec succès !");
      console.log("➡️", data);
    } catch (err) {
      alert("❌ Erreur lors de l’envoi du formulaire");
      console.error("ERREUR FETCH:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid>
      {/* Image à gauche */}
      <Stack spacing={2} sx={{ p: 3 }}>
        <RoundedImage>
          <img src={imageUrl} alt="contact visual" />
        </RoundedImage>
      </Stack>

      {/* Formulaire à droite */}
      <Box sx={{ mt: 2, p: 3 }}>
        <Stack spacing={2}>
          <TextField
            required
            label="Prénom"
            variant="outlined"
            fullWidth
            value={values.prenom ?? ""}
            onChange={handleChange("prenom")}
          />
          <TextField
            required
            label="Nom"
            variant="outlined"
            fullWidth
            value={values.nom ?? ""}
            onChange={handleChange("nom")}
          />
          <TextField
            required
            label="Téléphone"
            variant="outlined"
            fullWidth
            value={values.telephone ?? ""}
            onChange={handleChange("telephone")}
          />
          <TextField
            required
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={values.email ?? ""}
            onChange={handleChange("email")}
          />
          <TextField
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={values.message ?? ""}
            onChange={handleChange("message")}
          />
          <TextField
            select
            label="Coach souhaité"
            fullWidth
            value={values.coach ?? ""}
            onChange={handleChange("coach")}
          >
            <MenuItem value="GLORIA">Gloria</MenuItem>
            <MenuItem value="EDUIN">Eduin</MenuItem>
            <MenuItem value="QUENTIN">Quentin</MenuItem>
          </TextField>
          <SubmitButton onClick={handleSubmit} disabled={loading}>
            {loading ? "Envoi en cours..." : "Envoyer"}
          </SubmitButton>
        </Stack>
      </Box>
    </Grid>
  );
};

export default ContactFormSection;
