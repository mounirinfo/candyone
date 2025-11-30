// app/not-found.tsx
"use client";

import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Home, FitnessCenter, SportsGymnastics } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";

const primaryColor = "#FB98F6";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <>
      <Header />
      
      <Box
        sx={{
          minHeight: "calc(100vh - 200px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FB98F6 0%, #F06292 100%)",
          position: "relative",
          overflow: "hidden",
          py: 6,
        }}
      >
        {/* Bonbons flottants en arrière-plan */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.15,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='8'/%3E%3Ccircle cx='60' cy='60' r='6'/%3E%3Ccircle cx='40' cy='70' r='4'/%3E%3Ccircle cx='70' cy='30' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
            animation: "float 20s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": {
                transform: "translateY(0px)",
              },
              "50%": {
                transform: "translateY(-20px)",
              },
            },
          }}
        />

        {/* Haltères décoratifs */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "5%",
            animation: "rotate 8s linear infinite",
            opacity: 0.2,
            "@keyframes rotate": {
              from: { transform: "rotate(0deg)" },
              to: { transform: "rotate(360deg)" },
            },
          }}
        >
          <FitnessCenter sx={{ fontSize: 80, color: "white" }} />
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            animation: "rotate 10s linear infinite reverse",
            opacity: 0.2,
          }}
        >
          <FitnessCenter sx={{ fontSize: 100, color: "white" }} />
        </Box>

        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              borderRadius: 6,
              p: { xs: 4, md: 6 },
              boxShadow: "0 20px 60px rgba(251, 152, 246, 0.4)",
              border: "3px solid rgba(255, 255, 255, 0.8)",
            }}
          >
            {/* Icône sport avec effet rebond */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 3,
                position: "relative",
              }}
            >
              {/* Cercle de fond rose */}
              <Box
                sx={{
                  position: "absolute",
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${primaryColor} 0%, #F06292 100%)`,
                  opacity: 0.2,
                  animation: "pulse 2s ease-in-out infinite",
                  "@keyframes pulse": {
                    "0%, 100%": {
                      transform: "scale(1)",
                      opacity: 0.2,
                    },
                    "50%": {
                      transform: "scale(1.1)",
                      opacity: 0.3,
                    },
                  },
                }}
              />
              
              <SportsGymnastics
                sx={{
                  fontSize: 120,
                  color: primaryColor,
                  zIndex: 1,
                  animation: "bounce 2s infinite",
                  filter: "drop-shadow(0 4px 8px rgba(251, 152, 246, 0.3))",
                  "@keyframes bounce": {
                    "0%, 100%": {
                      transform: "translateY(0)",
                    },
                    "50%": {
                      transform: "translateY(-20px)",
                    },
                  },
                }}
              />
            </Box>

            {/* Code 404 style bonbon */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "5rem", md: "8rem" },
                fontWeight: "bold",
                background: `linear-gradient(135deg, ${primaryColor} 0%, #F06292 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
                textShadow: "4px 4px 8px rgba(251, 152, 246, 0.2)",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              404
            </Typography>

            {/* Emoji bonbons */}
            <Typography
              variant="h3"
              sx={{
                mb: 2,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              🍬 🍭 🍫
            </Typography>

            {/* Message principal */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#333",
                mb: 2,
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Oups ! Cette salle n'existe pas ! 🏋️
            </Typography>

            {/* Message secondaire */}
            <Typography
              variant="body1"
              sx={{
                color: "#666",
                mb: 4,
                fontSize: "1.1rem",
                lineHeight: 1.6,
              }}
            >
              On dirait que vous cherchez un abonnement qui n'est pas dans notre menu ! 🎯
              <br />
              Pas de panique, revenez vers nos offres sucrées et nos programmes sportifs ! 💪
            </Typography>

            {/* Barre de séparation style bonbon */}
            <Box
              sx={{
                width: 60,
                height: 4,
                background: `linear-gradient(90deg, ${primaryColor} 0%, #F06292 100%)`,
                borderRadius: 2,
                margin: "0 auto 3rem",
              }}
            />

            {/* Boutons d'action */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<Home />}
                onClick={() => router.push("/")}
                sx={{
                  background: `linear-gradient(135deg, ${primaryColor} 0%, #F06292 100%)`,
                  color: "#fff",
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(251, 152, 246, 0.4)",
                  "&:hover": {
                    background: `linear-gradient(135deg, #F06292 0%, ${primaryColor} 100%)`,
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 16px rgba(251, 152, 246, 0.5)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Retour à l'accueil 🏠
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => router.push("/checkout")}
                sx={{
                  borderColor: primaryColor,
                  color: primaryColor,
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: 3,
                  borderWidth: 2,
                  "&:hover": {
                    borderColor: primaryColor,
                    borderWidth: 2,
                    backgroundColor: "rgba(251, 152, 246, 0.1)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Voir nos offres 💪
              </Button>
            </Box>

            {/* Message d'aide style fun */}
            <Box
              sx={{
                mt: 4,
                p: 2,
                borderRadius: 3,
                bgcolor: "rgba(251, 152, 246, 0.1)",
                border: "2px dashed rgba(251, 152, 246, 0.3)",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: primaryColor,
                  fontWeight: "600",
                }}
              >
                💡 Besoin d'aide ? Notre équipe est là pour vous guider vers l'abonnement parfait !
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}