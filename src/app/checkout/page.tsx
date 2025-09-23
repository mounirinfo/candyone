// src/app/checkout/club-selection/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
} from "@mui/material";

import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";
import ClubSelectorHero from "@/components/organismes/ClubSelectorHero";
import { useCheckoutStore } from "@/stores/useCheckoutStore";

const primaryColor = "#FB98F6";
const secondaryColor = "#2D3748";

const steps = [
  "Choix de la salle",
  "Choix de l'abonnement",
  "Choix des options",
  "Coordonnées",
];

const ClubSelectionPage = () => {
  const router = useRouter();
  const { step, setStep, updateData } = useCheckoutStore();

  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await fetch("/api/clubs");
        const json = await res.json();
        setClubs(json);
      } catch (err) {
        console.error("Erreur chargement clubs :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const handleClubSelect = (clubId: string) => {
    updateData({ clubId });
    setStep(2);
    router.push("/checkout/abonnement-selection");
  };

  const handleBack = () => {
    setStep(0);
    router.push("/");
  };

  return (
    <>
      <Header />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: 'url("/About/about.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: { xs: 4, md: 8 },
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.9)",
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            backgroundColor: "rgba(255,255,255,0.97)",
            borderRadius: 4,
            boxShadow: 3,
            p: { xs: 2, sm: 3, md: 6 },
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Stepper */}
          <Stepper
            activeStep={step - 1}
            alternativeLabel
            sx={{
              mb: { xs: 3, md: 6 },
              "& .MuiStepLabel-label": {
                fontWeight: 600,
                fontSize: { xs: "0.65rem", sm: "0.8rem", md: "0.95rem" },
                color: secondaryColor,
                whiteSpace: "nowrap",
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Clubs */}
          {loading ? (
            <p style={{ textAlign: "center" }}>Chargement des clubs...</p>
          ) : (
            <ClubSelectorHero
              backgroundUrl="salle4.jpg"
              partnerNote="PARTENAIRE OFFICIEL BASIC-FIT"
              clubs={clubs.map((club) => ({
                id: club.id,
                address1: club.nom,
                address2: "",
                accent: "pink",
                onClick: () => handleClubSelect(club.id),
              }))}
              sx={{
                "& .MuiCard-root": {
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                  p: { xs: 1.5, sm: 2, md: 3 },
                },
                "& .MuiTypography-root": {
                  textAlign: "center",
                },
              }}
            />
          )}

          {/* Bouton Retour */}
          <Box
            sx={{
              mt: { xs: 4, md: 6 },
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Button
              variant="outlined"
              onClick={handleBack}
              aria-label="Retour à l'accueil"
              sx={{
                borderRadius: 2,
                px: { xs: 3, md: 4 },
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "1rem" },
                borderColor: primaryColor,
                color: primaryColor,
                "&:hover": {
                  borderColor: "#f06292",
                  color: "#f06292",
                },
              }}
            >
              ← Retour
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default ClubSelectionPage;
