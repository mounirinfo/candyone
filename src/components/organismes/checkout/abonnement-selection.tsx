"use client";

import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  styled,
} from "@mui/material";
import StarsIcon from "@mui/icons-material/Stars";

import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";
import ConfectionPricingSection from "@/components/organismes/ConfectionPricingSection";
import { JSX } from "react";
import { useCheckoutStore } from "@/stores/useCheckoutStore";

const primaryColor = "#FB98F6";
const secondaryColor = "#2D3748";

const GradientButton = styled(Button)(() => ({
  background: `linear-gradient(45deg, ${primaryColor} 0%, #F06292 100%)`,
  border: 0,
  borderRadius: 25,
  color: "white",
  padding: "12px 40px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(251, 152, 246, 0.3)",
  },
}));

const steps: string[] = [
  "Choix de la salle",
  "Choix de l'abonnement",
  "Options",
  "Coordonnées",
];

export default function AbonnementSelection(): JSX.Element {
  const router = useRouter();
  const { step, setStep, data, updateData } = useCheckoutStore();

  const selectedPlan = data.abonnementId ?? null;

  const handleNext = () => {
    if (!selectedPlan) return;
    setStep(3);
    router.push("/checkout/option-selection");
  };

  const handleBack = () => {
    setStep(1);
    router.push("/checkout/club-selection");
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
            p: { xs: 3, md: 6 },
            backdropFilter: "blur(12px)",
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
                      color: secondaryColor,
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box textAlign="center" mb={6}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: primaryColor,
                mb: 2,
                fontSize: { xs: "2rem", md: "2.75rem" },
                textTransform: "uppercase",
              }}
            >
              Choisissez Votre Abonnement
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 600,
                mx: "auto",
                fontSize: "1.1rem",
              }}
            >
              Découvrez nos offres premium adaptées à tous les besoins sportifs
            </Typography>
          </Box>

          {/* --- Important : on envoie bien onSelectPlan et selectedPlan --- */}
         <ConfectionPricingSection
  onSelectPlan={(id: string) => updateData({ abonnementId: id })}
  selectedPlan={selectedPlan}
/>

          <Box
            sx={{
              mt: 6,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleBack}
              aria-label="Retour à l'étape précédente"
              sx={{
                borderRadius: 2,
                px: 4,
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
            <GradientButton
              onClick={handleNext}
              aria-label="Continuer à l'étape suivante"
              disabled={!selectedPlan}
              sx={{
                px: 6,
                fontSize: "1.1rem",
                fontWeight: 700,
              }}
            >
              Continuer
              <StarsIcon sx={{ ml: 1.5, fontSize: "1.2rem" }} />
            </GradientButton>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
