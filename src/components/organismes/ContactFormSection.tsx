"use client";

import React from "react";
import {
  Box,
  Stack,
  styled,
  TextField,
  MenuItem,
  Typography,
  Alert,
} from "@mui/material";
import RoundedImage from "../atoms/RoundedImage";
import SubmitButton from "../atoms/SubmitButton";
import ReCAPTCHA from "react-google-recaptcha";

export type ContactFormSectionProps = {
  imageUrl: string;
};

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;

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
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);

  // 🔹 feedback
  const [feedbackMessage, setFeedbackMessage] = React.useState<string | null>(
    null
  );
  const [feedbackType, setFeedbackType] = React.useState<
    "success" | "error" | null
  >(null);

  // Pré-remplissage
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
    if (!captchaToken) {
      setFeedbackMessage("⚠️ Merci de valider le reCAPTCHA avant d’envoyer.");
      setFeedbackType("error");
      return;
    }

    setLoading(true);
    setFeedbackMessage(null);
    setFeedbackType(null);

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
          recaptcha: captchaToken,
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();
      console.log("➡️", data);

      setFeedbackMessage("✅ Envoyé avec succès !");
      setFeedbackType("success");
    } catch (err) {
      console.error("ERREUR FETCH:", err);
      setFeedbackMessage(
        "❌ Erreur lors de l’envoi, veuillez réessayer ultérieurement."
      );
      setFeedbackType("error");
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

          {/* reCAPTCHA */}
          <ReCAPTCHA sitekey={SITE_KEY} onChange={setCaptchaToken} />

          <SubmitButton onClick={handleSubmit} disabled={loading}>
            {loading ? "Envoi en cours..." : "Envoyer"}
          </SubmitButton>

          {feedbackMessage && feedbackType && (
            <Alert severity={feedbackType} sx={{ mt: 2 }}>
              {feedbackMessage}
            </Alert>
          )}
        </Stack>
      </Box>
    </Grid>
  );
};

export default ContactFormSection;
