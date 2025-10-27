"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  Box,
  Chip,
  Divider,
  Stack,
  Button,
  Avatar,
  TextField,
  MenuItem,
  Alert,
} from "@mui/material";
import {
  SportsGymnastics as ClubIcon,
  CardMembership as PlanIcon,
  Email as MailIcon,
  CalendarToday as CalendarIcon,
  Phone as PhoneIcon,
  LocationOn as MapPinIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import SubmitButton from "@/components/atoms/SubmitButton";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";

const primaryColor = "#FB98F6";
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCallback, setShowCallback] = useState(false);

  // Formulaire callback states
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [formLoading, setFormLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        setProfile(data);

        // Pré-remplir formulaire si client dispo
        if (data.client) {
          setFormValues({
            prenom: data.client.prenom ?? "",
            nom: data.client.nom ?? "",
            telephone: data.client.telephone ?? "",
            email: data.client.email ?? "",
            message: "Vous allez être contacté par votre coach.",
            coach: "",
          });
        }
      } catch (err) {
        console.error("Erreur récupération profil:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleFormChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleFormSubmit = async () => {
    if (!captchaToken) {
      setFeedbackMessage("⚠️ Merci de valider le reCAPTCHA avant d’envoyer.");
      setFeedbackType("error");
      return;
    }

    setFormLoading(true);
    setFeedbackMessage(null);
    setFeedbackType(null);

    try {
      const res = await fetch("/api/callbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: `${formValues.prenom} ${formValues.nom}`.trim(),
          telephone: formValues.telephone,
          email: formValues.email,
          message: formValues.message,
          notes_interne: formValues.coach || "Admin",
          recaptcha: captchaToken,
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      setFeedbackMessage("✅ Envoyé avec succès !");
      setFeedbackType("success");
      setShowCallback(false); // fermer formulaire si succès
    } catch (err) {
      console.error("Erreur fetch callback:", err);
      setFeedbackMessage("❌ Erreur lors de l’envoi, veuillez réessayer ultérieurement.");
      setFeedbackType("error");
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography>Chargement...</Typography>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography>Aucun profil trouvé</Typography>
      </Box>
    );
  }

  const { client, adresses, club, abonnement, formule, options } = profile;

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          py: 8,
          backgroundImage: 'url("fmacaron.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Container maxWidth="lg">
          {/* Section Profil */}
          <Card
            sx={{
              mb: 4,
              background: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(12px)",
              borderRadius: "16px",
            }}
          >
            <Box
              sx={{
                background: `linear-gradient(135deg, ${primaryColor} 0%, #F06292 100%)`,
                p: 4,
                color: "white",
                textAlign: "center",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              }}
            >
              <Typography variant="h3" fontWeight="bold">
                {client?.prenom && client?.nom ? `${client.prenom} ${client.nom}` : "use client"}
              </Typography>
              <Stack direction="row" justifyContent="center" spacing={1} mt={1}>
                <MailIcon fontSize="small" />
                <Typography>{client?.email ?? "use client"}</Typography>
              </Stack>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                p: 4,
                gap: 3,
              }}
            >
              <Stack spacing={3} flex={1}>
                <Stack direction="row" spacing={2}>
                  <Avatar>
                    <CalendarIcon sx={{ color: primaryColor }} />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="500">Date de naissance</Typography>
                    <Typography>{client?.date_naissance ?? "use client"}</Typography>
                  </Box>
                </Stack>
              </Stack>

              <Stack spacing={3} flex={1}>
                {adresses?.length > 0 ? (
                  <Stack direction="row" spacing={2}>
                    <Avatar>
                      <MapPinIcon sx={{ color: primaryColor }} />
                    </Avatar>
                    <Box>
                      <Typography fontWeight="500">Adresse</Typography>
                      <Typography>
                        {adresses[0]?.adresse?.ligne1 && adresses[0]?.adresse?.ville && adresses[0]?.adresse?.code_postal
                          ? `${adresses[0].adresse.ligne1}, ${adresses[0].adresse.ville} ${adresses[0].adresse.code_postal}`
                          : "use client"}
                      </Typography>
                    </Box>
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={2}>
                    <Avatar>
                      <MapPinIcon sx={{ color: primaryColor }} />
                    </Avatar>
                    <Box>
                      <Typography fontWeight="500">Adresse</Typography>
                      <Typography>use client</Typography>
                    </Box>
                  </Stack>
                )}
                <Stack direction="row" spacing={2}>
                  <Avatar>
                    <PhoneIcon sx={{ color: primaryColor }} />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="500">Téléphone</Typography>
                    <Typography>{client?.telephone ?? "use client"}</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>

            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => (window.location.href = "/checkout/paiement")}
              >
                Payer mon abonnement
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setShowCallback(prev => !prev)}
              >
                Être rappelé par un coach
              </Button>
              <Button
                variant="outlined"
                startIcon={<LockIcon />}
                onClick={() => (window.location.href = "/profile/change-password")}
              >
                Changer mon mot de passe
              </Button>
            </Stack>
          </Card>

          {abonnement ? (
            <Card sx={{ mb: 4, p: 4 }}>
              <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
                Mon Abonnement
              </Typography>
              <Stack spacing={3}>
                <Chip label="En attente de paiement" color="warning" />
                <Typography>
                  Début : {abonnement?.date_debut ? new Date(abonnement.date_debut).toLocaleDateString() : "use client"}
                </Typography>
                {abonnement?.date_fin ? (
                  <Typography>
                    Fin : {new Date(abonnement.date_fin).toLocaleDateString()}
                  </Typography>
                ) : (
                  <Typography>Fin : use client</Typography>
                )}
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                {club ? (
                  <Card sx={{ flex: 1, p: 2 }}>
                    <ClubIcon sx={{ color: primaryColor }} />
                    <Typography variant="h6">{club?.nom ?? "use client"}</Typography>
                    <Typography>{club?.email_contact ?? "use client"}</Typography>
                    <Typography>{club?.telephone ?? "use client"}</Typography>
                  </Card>
                ) : (
                  <Card sx={{ flex: 1, p: 2 }}>
                    <ClubIcon sx={{ color: primaryColor }} />
                    <Typography variant="h6">use client</Typography>
                    <Typography>use client</Typography>
                    <Typography>use client</Typography>
                  </Card>
                )}

                {formule ? (
                  <Card sx={{ flex: 1, p: 2 }}>
                    <PlanIcon sx={{ color: primaryColor }} />
                    <Typography variant="h6">{formule?.nom ?? "use client"}</Typography>
                    <Typography color={primaryColor}>
                      {formule?.prix_cents ? (formule.prix_cents / 100).toFixed(2) : "use client"} {formule?.devise ?? "use client"}
                    </Typography>
                    <Typography>{formule?.description ?? "use client"}</Typography>
                  </Card>
                ) : (
                  <Card sx={{ flex: 1, p: 2 }}>
                    <PlanIcon sx={{ color: primaryColor }} />
                    <Typography variant="h6">use client</Typography>
                    <Typography color={primaryColor}>use client</Typography>
                    <Typography>use client</Typography>
                  </Card>
                )}
              </Stack>

              {options?.length > 0 ? (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6">Options supplémentaires</Typography>
                  <Stack direction="row" spacing={2} flexWrap="wrap" mt={1}>
                    {options.map((o: any) => (
                      <Chip
                        key={o?.option?.id ?? Math.random()}
                        label={
                          o?.option?.libelle && o?.option?.prix_cents && formule?.devise
                            ? `${o.option.libelle} - ${(o.option.prix_cents / 100).toFixed(2)} ${formule.devise}`
                            : "use client"
                        }
                        sx={{ borderColor: primaryColor }}
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </>
              ) : (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6">Options supplémentaires</Typography>
                  <Typography>use client</Typography>
                </>
              )}
            </Card>
          ) : (
            <Card sx={{ mb: 4, p: 4 }}>
              <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
                Mon Abonnement
              </Typography>
              <Typography>use client</Typography>
            </Card>
          )}

          {showCallback && (
            <Card sx={{ mb: 4, p: 4 }}>
              <Typography variant="h5" mb={2}>
                Votre coach va vous contacter
              </Typography>
              <Stack spacing={2}>
                <TextField
                  required
                  label="Prénom"
                  variant="outlined"
                  fullWidth
                  value={formValues.prenom ?? ""}
                  onChange={handleFormChange("prenom")}
                />
                <TextField
                  required
                  label="Nom"
                  variant="outlined"
                  fullWidth
                  value={formValues.nom ?? ""}
                  onChange={handleFormChange("nom")}
                />
                <TextField
                  required
                  label="Téléphone"
                  variant="outlined"
                  fullWidth
                  value={formValues.telephone ?? ""}
                  onChange={handleFormChange("telephone")}
                />
                <TextField
                  required
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={formValues.email ?? ""}
                  onChange={handleFormChange("email")}
                />
                <TextField
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  value={formValues.message ?? ""}
                  onChange={handleFormChange("message")}
                />
                <TextField
                  select
                  label="Coach souhaité"
                  fullWidth
                  value={formValues.coach ?? ""}
                  onChange={handleFormChange("coach")}
                >
                  <MenuItem value="GLORIA">Gloria</MenuItem>
                  <MenuItem value="EDUIN">Eduin</MenuItem>
                  <MenuItem value="QUENTIN">Quentin</MenuItem>
                </TextField>

                <ReCAPTCHA sitekey={SITE_KEY} onChange={setCaptchaToken} />

                <SubmitButton onClick={handleFormSubmit} disabled={formLoading}>
                  {formLoading ? "Envoi en cours..." : "Envoyer"}
                </SubmitButton>

                {feedbackMessage && feedbackType && (
                  <Alert severity={feedbackType} sx={{ mt: 2 }}>
                    {feedbackMessage}
                  </Alert>
                )}
              </Stack>
            </Card>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
}