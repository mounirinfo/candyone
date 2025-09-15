"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Avatar,
} from "@mui/material";
import {
  SportsGymnastics as ClubIcon,
  CardMembership as PlanIcon,
  Email as MailIcon,
  CalendarToday as CalendarIcon,
  Phone as PhoneIcon,
  LocationOn as MapPinIcon,
  Person as UserIcon,
} from "@mui/icons-material";

import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";

const primaryColor = "#FB98F6";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Erreur récupération profil:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

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

  const { client, adresses, contrat, club, abonnement, formule, options } = profile;

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
                {client.prenom} {client.nom}
              </Typography>
              <Stack direction="row" justifyContent="center" spacing={1} mt={1}>
                <MailIcon fontSize="small" />
                <Typography>{client.email}</Typography>
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
              {/* Infos perso */}
              <Stack spacing={3} flex={1}>
                <Stack direction="row" spacing={2}>
                  <Avatar>
                    <CalendarIcon sx={{ color: primaryColor }} />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="500">Date de naissance</Typography>
                    <Typography>{client.date_naissance}</Typography>
                  </Box>
                </Stack>
              </Stack>

              <Stack spacing={3} flex={1}>
                {adresses?.length > 0 && (
                  <Stack direction="row" spacing={2}>
                    <Avatar>
                      <MapPinIcon sx={{ color: primaryColor }} />
                    </Avatar>
                    <Box>
                      <Typography fontWeight="500">Adresse</Typography>
                      <Typography>
                        {adresses[0].adresse.ligne1}, {adresses[0].adresse.ville}{" "}
                        {adresses[0].adresse.code_postal}
                      </Typography>
                    </Box>
                  </Stack>
                )}
                <Stack direction="row" spacing={2}>
                  <Avatar>
                    <PhoneIcon sx={{ color: primaryColor }} />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="500">Téléphone</Typography>
                    <Typography>{client.telephone}</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Card>

          {/* Section Abonnement */}
          {abonnement && (
            <Card sx={{ mb: 4, p: 4 }}>
              <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
                Mon Abonnement
              </Typography>
              <Stack spacing={3}>
                <Chip label={abonnement.statut} color="success" />
                <Typography>
                  Début : {new Date(abonnement.date_debut).toLocaleDateString()}
                </Typography>
                {abonnement.date_fin && (
                  <Typography>
                    Fin : {new Date(abonnement.date_fin).toLocaleDateString()}
                  </Typography>
                )}
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                {club && (
                  <Card sx={{ flex: 1, p: 2 }}>
                    <ClubIcon sx={{ color: primaryColor }} />
                    <Typography variant="h6">{club.nom}</Typography>
                    {club.email_contact && <Typography>{club.email_contact}</Typography>}
                    {club.telephone && <Typography>{club.telephone}</Typography>}
                  </Card>
                )}

                {formule && (
                  <Card sx={{ flex: 1, p: 2 }}>
                    <PlanIcon sx={{ color: primaryColor }} />
                    <Typography variant="h6">{formule.nom}</Typography>
                    <Typography color={primaryColor}>
                      {(formule.prix_cents / 100).toFixed(2)} {formule.devise}
                    </Typography>
                    <Typography>{formule.description}</Typography>
                  </Card>
                )}
              </Stack>

              {options?.length > 0 && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6">Options supplémentaires</Typography>
                  <Stack direction="row" spacing={2} flexWrap="wrap" mt={1}>
                    {options.map((o: any) => (
                      <Chip
                        key={o.option.id}
                        label={`${o.option.libelle} - ${(o.option.prix_cents / 100).toFixed(2)} ${formule?.devise}`}
                        sx={{ borderColor: primaryColor }}
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </>
              )}
            </Card>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
}
