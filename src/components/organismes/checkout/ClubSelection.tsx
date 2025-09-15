"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  styled,
} from "@mui/material";

import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";
import ClubSelectorHero from "@/components/organismes/ClubSelectorHero";
import { useCheckoutStore } from "@/stores/useCheckoutStore";

const steps = ["Choix de la salle", "Choix de l'abonnement", "Choix des options", "Coordonnées"];

const primaryColor = "#FB98F6";

const GradientButton = styled(Button)({
  background: `linear-gradient(45deg, ${primaryColor} 30%, #F06292 90%)`,
  border: 0,
  borderRadius: 25,
  color: "white",
  padding: "12px 40px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(251, 152, 246, 0.3)",
  },
});

const ClubSelection = () => {
  const router = useRouter();
  const { step, data, setStep, updateData } = useCheckoutStore();

  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedClub = data.clubId;

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
  };

  const handleContinue = () => {
    if (!selectedClub) return;
    setStep(2);
    router.push("/checkout/abonnement-selection");
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
          py: 8,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.97)",
            borderRadius: 4,
            boxShadow: 3,
            p: { xs: 3, md: 6 },
            backdropFilter: "blur(10px)",
          }}
        >
          <Stepper activeStep={step - 1} alternativeLabel sx={{ mb: 6 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {loading ? (
            <p>Chargement des clubs...</p>
          ) : (
            <ClubSelectorHero
              backgroundUrl="salle4.jpg"
              partnerNote="PARTENAIRE OFFICIEL BASIC-FIT"
              clubs={clubs.map((club) => ({
               id: club.id,          // ← ID exact de la DB
                address1: club.nom, 
                address2: "", 
                accent: "pink", 
                onClick: () => handleClubSelect(club.id),
              }))}
            />
          )}

          <Box
            sx={{
              mt: 6,
              display: "flex",
              justifyContent: "center",
              position: "sticky",
              bottom: 40,
              zIndex: 1,
            }}
          >
            <GradientButton
              onClick={handleContinue}
              disabled={!selectedClub}
              sx={{
                fontSize: "1.1rem",
                fontWeight: 700,
                "&.Mui-disabled": {
                  background: "#eee",
                  color: "#999",
                },
              }}
            >
              Continuer vers l'abonnement
              <Box component="span" sx={{ ml: 1, fontSize: "1.2rem" }}>
                ➔
              </Box>
            </GradientButton>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default ClubSelection;
