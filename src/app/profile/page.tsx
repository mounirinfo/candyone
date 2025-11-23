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
  Warning as WarningIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import SubmitButton from "@/components/atoms/SubmitButton";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";

const primaryColor = "#FB98F6";
const warningColor = "#fbbf24";
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;

// Composant pour afficher les données manquantes
const MissingData = ({ text = "À renseigner" }: { text?: string }) => (
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: 0.5,
      color: warningColor,
      fontStyle: "italic",
    }}
  >
    <WarningIcon sx={{ fontSize: 16 }} />
    <Typography variant="body2">{text}</Typography>
  </Box>
);

// Composant pour afficher une donnée ou le message manquant
const DataDisplay = ({ value, fallback = "À renseigner" }: { value?: string | null; fallback?: string }) => {
  return value ? (
    <Typography>{value}</Typography>
  ) : (
    <MissingData text={fallback} />
  );
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCallback, setShowCallback] = useState(false);
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
        
        console.log("📊 Données profil reçues:", data);
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
      setFeedbackMessage("⚠️ Merci de valider le reCAPTCHA avant d'envoyer.");
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
      setShowCallback(false);
    } catch (err) {
      console.error("Erreur fetch callback:", err);
      setFeedbackMessage("❌ Erreur lors de l'envoi, veuillez réessayer ultérieurement.");
      setFeedbackType("error");
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#FFF5FB" }}>
          <Typography color={primaryColor} fontWeight="bold">Chargement...</Typography>
        </Box>
        <Footer />
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Header />
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#FFF5FB" }}>
          <Typography>Aucun profil trouvé</Typography>
        </Box>
        <Footer />
      </>
    );
  }

  const { client, adresses, club, abonnement, formule, options } = profile;

  // Compter les données manquantes (SEULEMENT celles qui ne viennent pas de Google)
  const missingFields = [
    !client?.date_naissance,
    !client?.telephone,
    !adresses?.length,
  ].filter(Boolean).length;

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          py: 8,
          backgroundImage: 'url("/fmacaron.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Container maxWidth="lg">
          {/* Alerte données manquantes */}
          {missingFields > 0 && (
            <Alert 
              severity="warning" 
              sx={{ 
                mb: 3,
                bgcolor: "rgba(251, 191, 36, 0.1)",
                borderLeft: `4px solid ${warningColor}`,
              }}
              action={
                <Button 
                  color="inherit" 
                  size="small" 
                  startIcon={<EditIcon />}
                  sx={{ color: warningColor }}
                >
                  Compléter
                </Button>
              }
            >
              <strong>{missingFields} information{missingFields > 1 ? 's' : ''} manquante{missingFields > 1 ? 's' : ''}</strong> - 
              Complétez votre profil pour une meilleure expérience
            </Alert>
          )}

          {/* Section Profil */}
          <Card
            sx={{
              mb: 4,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(12px)",
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(251, 152, 246, 0.15)",
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
                {client?.prenom && client?.nom 
                  ? `${client.prenom} ${client.nom}` 
                  : "Mon Profil"}
              </Typography>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mt={1}>
                <MailIcon fontSize="small" />
                <Typography>{client?.email || "Email non disponible"}</Typography>
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
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: client?.date_naissance ? primaryColor : warningColor }}>
                    <CalendarIcon />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="600" color="text.secondary" fontSize="0.875rem">
                      Date de naissance
                    </Typography>
                    <DataDisplay 
                      value={client?.date_naissance ? new Date(client.date_naissance).toLocaleDateString('fr-FR') : null} 
                      fallback="Date non renseignée" 
                    />
                  </Box>
                </Stack>
              </Stack>

              <Stack spacing={3} flex={1}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: adresses?.length > 0 ? primaryColor : warningColor }}>
                    <MapPinIcon />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="600" color="text.secondary" fontSize="0.875rem">
                      Adresse
                    </Typography>
                    {adresses?.length > 0 && adresses[0]?.adresse ? (
                      <Typography>
                        {adresses[0].adresse.ligne1}
                        {adresses[0].adresse.ville && adresses[0].adresse.code_postal 
                          ? `, ${adresses[0].adresse.ville} ${adresses[0].adresse.code_postal}`
                          : ''}
                      </Typography>
                    ) : (
                      <MissingData text="Adresse non renseignée" />
                    )}
                  </Box>
                </Stack>
                
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: client?.telephone ? primaryColor : warningColor }}>
                    <PhoneIcon />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="600" color="text.secondary" fontSize="0.875rem">
                      Téléphone
                    </Typography>
                    <DataDisplay value={client?.telephone} fallback="Téléphone non renseigné" />
                  </Box>
                </Stack>
              </Stack>
            </Box>

            <Stack 
              direction={{ xs: "column", sm: "row" }}
              spacing={2} 
              justifyContent="center" 
              sx={{ mb: 3, px: 2 }}
            >
              <Button
                variant="contained"
                sx={{
                  background: `linear-gradient(135deg, ${primaryColor} 0%, #F06292 100%)`,
                  color: "white",
                  fontWeight: "bold",
                  px: 3,
                  py: 1.2,
                  '&:hover': {
                    background: `linear-gradient(135deg, #F06292 0%, ${primaryColor} 100%)`,
                    transform: "translateY(-2px)",
                    boxShadow: `0 6px 20px rgba(251, 152, 246, 0.4)`,
                  },
                  transition: "all 0.3s ease",
                }}
                onClick={() => (window.location.href = "/checkout/paiement")}
              >
                Payer mon abonnement
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: primaryColor,
                  color: primaryColor,
                  fontWeight: "bold",
                  px: 3,
                  py: 1.2,
                  '&:hover': {
                    borderColor: primaryColor,
                    bgcolor: `rgba(251, 152, 246, 0.1)`,
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
                onClick={() => setShowCallback(prev => !prev)}
              >
                Être rappelé par un coach
              </Button>
              <Button
                variant="outlined"
                startIcon={<LockIcon />}
                sx={{
                  borderColor: primaryColor,
                  color: primaryColor,
                  fontWeight: "bold",
                  px: 3,
                  py: 1.2,
                  '&:hover': {
                    borderColor: primaryColor,
                    bgcolor: `rgba(251, 152, 246, 0.1)`,
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
                onClick={() => (window.location.href = "/profile/change-password")}
              >
                Changer mon mot de passe
              </Button>
            </Stack>
          </Card>

          {/* Section Abonnement */}
          <Card 
            sx={{ 
              mb: 4, 
              p: 4,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(12px)",
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(251, 152, 246, 0.15)",
            }}
          >
            <Typography 
              variant="h4" 
              textAlign="center" 
              fontWeight="bold" 
              mb={3}
              sx={{
                background: `linear-gradient(135deg, ${primaryColor}, #F06292)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mon Abonnement
            </Typography>
            
            {abonnement ? (
              <>
                <Stack spacing={3} alignItems="center">
                  <Chip 
                    label={abonnement.statut === "ACTIF" ? "Actif" : "En attente de paiement"} 
                    color={abonnement.statut === "ACTIF" ? "success" : "warning"}
                    sx={{ fontWeight: "bold" }}
                  />
                  <Box textAlign="center">
                    <Typography fontWeight="600" color="text.secondary" fontSize="0.875rem">
                      Début de l'abonnement
                    </Typography>
                    <DataDisplay 
                      value={abonnement.date_debut ? new Date(abonnement.date_debut).toLocaleDateString('fr-FR') : null}
                      fallback="Date de début non définie"
                    />
                  </Box>
                  {abonnement.date_fin && (
                    <Box textAlign="center">
                      <Typography fontWeight="600" color="text.secondary" fontSize="0.875rem">
                        Fin de l'abonnement
                      </Typography>
                      <Typography fontWeight="bold">
                        {new Date(abonnement.date_fin).toLocaleDateString('fr-FR')}
                      </Typography>
                    </Box>
                  )}
                </Stack>

                <Divider sx={{ my: 4 }} />

                <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                  {/* Carte Club */}
                  <Card 
                    sx={{ 
                      flex: 1, 
                      p: 3,
                      border: !club ? `2px dashed ${warningColor}` : `1px solid ${primaryColor}`,
                      bgcolor: !club ? 'rgba(251, 191, 36, 0.05)' : `rgba(251, 152, 246, 0.05)`,
                      borderRadius: 3,
                    }}
                  >
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ClubIcon sx={{ color: club ? primaryColor : warningColor, fontSize: 28 }} />
                        <Typography variant="h6" fontWeight="bold">Mon Club</Typography>
                      </Box>
                      {club ? (
                        <>
                          <Typography variant="h6" color={primaryColor} fontWeight="bold">
                            {club.nom}
                          </Typography>
                          <DataDisplay value={club.email_contact} fallback="Email non disponible" />
                          <DataDisplay value={club.telephone} fallback="Téléphone non disponible" />
                        </>
                      ) : (
                        <MissingData text="Aucun club associé" />
                      )}
                    </Stack>
                  </Card>

                  {/* Carte Formule */}
                  <Card 
                    sx={{ 
                      flex: 1, 
                      p: 3,
                      border: !formule ? `2px dashed ${warningColor}` : `1px solid ${primaryColor}`,
                      bgcolor: !formule ? 'rgba(251, 191, 36, 0.05)' : `rgba(251, 152, 246, 0.05)`,
                      borderRadius: 3,
                    }}
                  >
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PlanIcon sx={{ color: formule ? primaryColor : warningColor, fontSize: 28 }} />
                        <Typography variant="h6" fontWeight="bold">Ma Formule</Typography>
                      </Box>
                      {formule ? (
                        <>
                          <Typography variant="h6" color={primaryColor} fontWeight="bold">
                            {formule.nom}
                          </Typography>
                          <Typography variant="h5" fontWeight="bold" color={primaryColor}>
                            {formule.prix_cents ? `${(formule.prix_cents / 100).toFixed(2)} ${formule.devise || '€'}` : 'Prix non défini'}
                          </Typography>
                          <DataDisplay value={formule.description} fallback="Pas de description" />
                        </>
                      ) : (
                        <MissingData text="Aucune formule associée" />
                      )}
                    </Stack>
                  </Card>
                </Stack>

                {/* Options */}
                <Divider sx={{ my: 4 }} />
                <Typography variant="h6" mb={2} fontWeight="bold">
                  Options supplémentaires
                </Typography>
                {options?.length > 0 ? (
                  <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
                    {options.map((o: any) => (
                      <Chip
                        key={o?.option?.id ?? Math.random()}
                        label={
                          o?.option?.libelle && o?.option?.prix_cents
                            ? `${o.option.libelle} - ${(o.option.prix_cents / 100).toFixed(2)} ${formule?.devise || '€'}`
                            : "Option sans détails"
                        }
                        sx={{ 
                          borderColor: primaryColor,
                          color: primaryColor,
                          fontWeight: "600",
                        }}
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                ) : (
                  <Box 
                    sx={{ 
                      p: 3, 
                      border: '2px dashed #e0e0e0', 
                      borderRadius: 3,
                      textAlign: 'center',
                      bgcolor: '#fafafa',
                    }}
                  >
                    <Typography color="text.secondary" fontWeight="500">
                      Aucune option supplémentaire
                    </Typography>
                  </Box>
                )}
              </>
            ) : (
              <Box 
                sx={{ 
                  p: 4, 
                  border: `3px dashed ${warningColor}`, 
                  borderRadius: 3,
                  textAlign: 'center',
                  bgcolor: 'rgba(251, 191, 36, 0.05)',
                }}
              >
                <WarningIcon sx={{ fontSize: 56, color: warningColor, mb: 2 }} />
                <Typography variant="h6" color={warningColor} mb={1} fontWeight="bold">
                  Aucun abonnement actif
                </Typography>
                <Typography color="text.secondary" mb={3}>
                  Souscrivez à un abonnement pour profiter de nos services
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{
                    background: `linear-gradient(135deg, ${primaryColor} 0%, #F06292 100%)`,
                    color: "white",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      background: `linear-gradient(135deg, #F06292 0%, ${primaryColor} 100%)`,
                    }
                  }}
                >
                  Découvrir nos offres
                </Button>
              </Box>
            )}
          </Card>

          {/* Formulaire Callback */}
          {showCallback && (
            <Card 
              sx={{ 
                mb: 4, 
                p: 4,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(12px)",
                borderRadius: "16px",
                boxShadow: "0 8px 32px rgba(251, 152, 246, 0.15)",
              }}
            >
              <Typography variant="h5" mb={3} fontWeight="bold" color={primaryColor}>
                Votre coach va vous contacter
              </Typography>
              <Stack spacing={3}>
                <TextField
                  required
                  label="Prénom"
                  variant="outlined"
                  fullWidth
                  value={formValues.prenom ?? ""}
                  onChange={handleFormChange("prenom")}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: primaryColor,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: primaryColor,
                    },
                  }}
                />
                <TextField
                  required
                  label="Nom"
                  variant="outlined"
                  fullWidth
                  value={formValues.nom ?? ""}
                  onChange={handleFormChange("nom")}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: primaryColor,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: primaryColor,
                    },
                  }}
                />
                <TextField
                  required
                  label="Téléphone"
                  variant="outlined"
                  fullWidth
                  value={formValues.telephone ?? ""}
                  onChange={handleFormChange("telephone")}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: primaryColor,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: primaryColor,
                    },
                  }}
                />
                <TextField
                  required
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={formValues.email ?? ""}
                  onChange={handleFormChange("email")}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: primaryColor,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: primaryColor,
                    },
                  }}
                />
                <TextField
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  value={formValues.message ?? ""}
                  onChange={handleFormChange("message")}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: primaryColor,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: primaryColor,
                    },
                  }}
                />

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