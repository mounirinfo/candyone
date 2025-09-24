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
} from "@mui/material";

import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";
import ConfectionPricingSection from "@/components/organismes/ConfectionPricingSection";
import { JSX } from "react";
import { useCheckoutStore } from "@/stores/useCheckoutStore";

const primaryColor = "#FB98F6";
const secondaryColor = "#2D3748";

const steps: string[] = [
  "Choix de la salle",
  "Choix de l'abonnement",
  "Choix des options",
  "Coordonnées",
];

export default function AbonnementSelection(): JSX.Element {
  const router = useRouter();
  const { step, setStep, data, updateData } = useCheckoutStore();

  const selectedPlan = data.abonnementId ?? null;

  const handleBack = () => {
    setStep(1);
    router.push("/checkout/club-selection");
  };

  const handleSelectPlan = (id: string) => {
    updateData({ abonnementId: id });
    setStep(3);
    router.push("/checkout/option-selection");
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
          {/* Stepper harmonisé */}
          <Stepper
            activeStep={step }
            alternativeLabel
            sx={{
              mb: { xs: 3, md: 6 },
              "& .MuiStep-root": {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              },
              "& .MuiStepLabel-root": {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              },
              "& .MuiStepLabel-iconContainer": {
                zIndex: 2,
                padding: 0,
              },
              "& .MuiStepLabel-label": {
                fontWeight: 600,
                fontSize: { xs: "0.65rem", sm: "0.8rem", md: "0.95rem" },
                color: secondaryColor,
                mt: 1,
                textAlign: "center",
              },
              "& .MuiStepIcon-root": {
                color: "#e0e0e0",
                width: { xs: 24, sm: 28, md: 32 },
                height: { xs: 24, sm: 28, md: 32 },
                "&.Mui-active": {
                  color: primaryColor,
                  boxShadow: `0 0 0 4px ${primaryColor}20`,
                },
                "&.Mui-completed": {
                  color: primaryColor,
                },
                "& .MuiStepIcon-text": {
                  fill: secondaryColor,
                  fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem" },
                  fontWeight: 600,
                },
              },
              "& .MuiStepConnector-root": {
                position: "absolute",
                top: { xs: 12, sm: 14, md: 16 },
              },
              "& .MuiStepConnector-line": {
                borderColor: primaryColor,
                borderTopWidth: 3,
                borderRadius: 2,
              },
              "& .MuiStep-root:first-of-type .MuiStepConnector-root": {
                display: "none",
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Titre */}
          <Box textAlign="center" mb={{ xs: 4, md: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: primaryColor,
                mb: 2,
                fontSize: { xs: "1.6rem", sm: "2rem", md: "2.75rem" },
                textTransform: "uppercase",
                lineHeight: 1.2,
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
                fontSize: { xs: "0.85rem", sm: "1rem", md: "1.1rem" },
                lineHeight: 1.4,
              }}
            >
              Découvrez nos offres premium adaptées à tous les besoins sportifs
            </Typography>
          </Box>

          {/* Section prix */}
          <ConfectionPricingSection
            onSelectPlan={handleSelectPlan}
            selectedPlan={selectedPlan}
          />

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
              aria-label="Retour à l'étape précédente"
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
}
