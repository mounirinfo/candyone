"use client";

import React from "react";
import { CheckCircle, Heart, Star, PartyPopper } from "lucide-react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";
import Confetti from 'react-confetti';

export default function Success() {
  return (
    <>
      {/* CONFETTI ANIMATION */}
      <Confetti
        width={typeof window !== 'undefined' ? window.innerWidth : 1200}
        height={typeof window !== 'undefined' ? window.innerHeight : 800}
        recycle={false}
        numberOfPieces={200}
        colors={['#ff66cc', '#ff99dd', '#ff4dc4', '#ff80d5', '#ffffff']}
      />

      {/* HEADER */}
      <Header />

      {/* BACKGROUND + CONTENT */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: 'url("/fmacaron.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: 6,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 102, 204, 0.15)",
            backdropFilter: "blur(8px)",
          },
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={16}
            sx={{
              borderRadius: 6,
              p: 6,
              bgcolor: "rgba(255, 255, 255, 0.97)",
              backdropFilter: "blur(20px)",
              boxShadow: `
                0 25px 50px rgba(255, 102, 204, 0.3),
                0 0 100px rgba(255, 102, 204, 0.2)
              `,
              border: "2px solid rgba(255, 102, 204, 0.3)",
              position: "relative",
              zIndex: 1,
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "8px",
                background: "linear-gradient(90deg, #ff66cc, #ff99dd, #ff4dc4, #ff80d5)",
                backgroundSize: "200% 100%",
                animation: "shimmer 3s ease-in-out infinite",
              },
              "@keyframes shimmer": {
                "0%": { backgroundPosition: "-200% 0" },
                "100%": { backgroundPosition: "200% 0" },
              },
            }}
          >
            {/* ÉTOILES TOURNANTES */}
            <Box
              sx={{
                position: "absolute",
                top: -20,
                right: -20,
                animation: "spin 4s linear infinite",
                "@keyframes spin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              }}
            >
              <Star size={60} fill="#ff66cc" color="#ff99dd" />
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: -15,
                left: -15,
                animation: "spin 6s linear infinite reverse",
              }}
            >
              <PartyPopper size={50} color="#ff4dc4" />
            </Box>

            {/* CONTENU PRINCIPAL */}
            <Box sx={{ textAlign: "center", mb: 4, position: "relative" }}>
              {/* ICÔNE SUCCÈS ANIMÉE */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ff66cc, #ff99dd)",
                  color: "white",
                  mb: 4,
                  boxShadow: `
                    0 8px 25px rgba(255, 102, 204, 0.5),
                    0 0 30px rgba(255, 102, 204, 0.3)
                  `,
                  animation: "pulse 2s ease-in-out infinite",
                  "@keyframes pulse": {
                    "0%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.05)" },
                    "100%": { transform: "scale(1)" },
                  },
                }}
              >
                <CheckCircle size={48} fill="white" />
              </Box>

              <Typography
                variant="h2"
                fontWeight="900"
                sx={{
                  background: "linear-gradient(135deg, #ff66cc, #ff4dc4, #ff99dd)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% 200%",
                  animation: "gradientShift 3s ease-in-out infinite",
                  mb: 3,
                  fontSize: { xs: "2rem", md: "3rem" },
                  "@keyframes gradientShift": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                  },
                }}
              >
                🎉 Paiement Réussi !
              </Typography>

              <Typography
                variant="h4"
                fontWeight="700"
                sx={{
                  color: "#ff66cc",
                  mb: 3,
                  textShadow: "0 2px 10px rgba(255, 102, 204, 0.3)",
                }}
              >
                Merci infiniment ! 🙏
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.8,
                  maxWidth: "600px",
                  mx: "auto",
                  mb: 1,
                }}
              >
                Votre aventure <strong>Candy Body</strong> commence maintenant ! 
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.6,
                  maxWidth: "500px",
                  mx: "auto",
                  mb: 4,
                }}
              >
                Un email de confirmation avec tous les détails de votre abonnement 
                vous a été envoyé. Préparez-vous à transformer votre corps et votre esprit ! ✨
              </Typography>
            </Box>

            {/* BADGES DE RÉCOMPENSE */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 5, justifyContent: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 2,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, rgba(255, 102, 204, 0.1), rgba(255, 153, 221, 0.1))",
                  border: "1px solid rgba(255, 102, 204, 0.2)",
                }}
              >
                <Heart size={20} color="#ff66cc" fill="#ff66cc" />
                <Typography variant="body2" fontWeight="600" color="#ff66cc">
                  Bienvenue dans la famille !
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 2,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, rgba(255, 102, 204, 0.1), rgba(255, 153, 221, 0.1))",
                  border: "1px solid rgba(255, 102, 204, 0.2)",
                }}
              >
                <Star size={20} color="#ff66cc" fill="#ff66cc" />
                <Typography variant="body2" fontWeight="600" color="#ff66cc">
                  Accès immédiat
                </Typography>
              </Box>
            </Stack>

            {/* BOUTONS D'ACTION */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "center" }}>
              <Link href="/profile" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    background: "linear-gradient(135deg, #ff66cc, #ff99dd)",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    boxShadow: "0 8px 20px rgba(255, 102, 204, 0.4)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #ff4dc4, #ff80d5)",
                      boxShadow: "0 12px 25px rgba(255, 102, 204, 0.6)",
                      transform: "translateY(-3px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  🚀 Commencer mon parcours
                </Button>
              </Link>

              <Link href="/profile" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontWeight: "bold",
                    borderColor: "rgba(255, 102, 204, 0.4)",
                    color: "#ff66cc",
                    fontSize: "1.1rem",
                    "&:hover": {
                      borderColor: "#ff66cc",
                      background: "rgba(255, 102, 204, 0.05)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 15px rgba(255, 102, 204, 0.3)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  👤 Voir mon profil
                </Button>
              </Link>
            </Stack>

            <Box
              sx={{
                textAlign: "center",
                mt: 5,
                p: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg, rgba(255, 102, 204, 0.05), rgba(255, 153, 221, 0.05))",
                border: "1px solid rgba(255, 102, 204, 0.1)",
              }}
            >
              <Typography variant="body2" color="text.secondary" fontStyle="italic">
                "Le plus beau projet sur lequel vous puissiez travailler, c'est vous-même." 
                <br />
                <strong>Bienvenue dans l'aventure Candy Body !</strong> 💖
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>

      <Footer />
    </>
  );
}