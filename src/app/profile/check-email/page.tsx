"use client";

import React from "react";
import { Mail, Heart, ArrowLeft } from "lucide-react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import Link from "next/link";
import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";

export default function CheckEmailPage() {
  return (
    <>
      <Header />

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
            backgroundColor: "rgba(255, 102, 204, 0.1)",
            backdropFilter: "blur(3px)",
          },
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={10}
            sx={{
              borderRadius: 4,
              p: 5,
              bgcolor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 20px 40px rgba(255, 102, 204, 0.25)",
              border: "1px solid rgba(255, 102, 204, 0.2)",
              position: "relative",
              zIndex: 1,
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "6px",
                background: "linear-gradient(90deg, #ff66cc, #ff99dd)",
              },
            }}
          >
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ff99dd, #ff66cc)",
                  color: "white",
                  mb: 3,
                  boxShadow: "0 4px 12px rgba(255, 102, 204, 0.4)",
                }}
              >
                <Mail size={32} fill="white" />
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Link href="/login">
                <Button
                  startIcon={<ArrowLeft size={20} />}
                  sx={{
                    color: "#ff66cc",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "rgba(255, 102, 204, 0.1)",
                    },
                  }}
                >
                  Retour
                </Button>
              </Link>
            </Box>

            <Box textAlign="center" mb={4}>
              <Typography
                variant="h3"
                fontWeight="800"
                sx={{
                  background: "linear-gradient(135deg, #ff66cc, #ff99dd)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                📩 Vérifiez vos emails
              </Typography>
              
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ mb: 2, lineHeight: 1.6 }}
              >
                Nous vous avons envoyé un lien pour réinitialiser votre mot de passe.  
                Cliquez dessus pour continuer.
              </Typography>
              
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  fontStyle: 'italic',
                  color: 'rgba(0, 0, 0, 0.6)',
                  lineHeight: 1.5
                }}
              >
                (Si vous ne voyez pas l'email, vérifiez vos spams.)
              </Typography>
            </Box>

            <Stack spacing={2} sx={{ mt: 4 }}>
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #ff66cc, #ff99dd)",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: 2,
                  py: 1.5,
                  fontSize: "1rem",
                  boxShadow: "0 6px 12px rgba(255, 102, 204, 0.4)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #ff4dc4, #ff80d5)",
                    boxShadow: "0 8px 16px rgba(255, 102, 204, 0.5)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
                onClick={() => window.location.reload()}
              >
                Rafraîchir la page
              </Button>

              <Link href="/login" style={{ textDecoration: 'none' }}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: "bold",
                    borderColor: "rgba(255, 102, 204, 0.3)",
                    color: "#ff66cc",
                    "&:hover": {
                      borderColor: "#ff66cc",
                      bgcolor: "rgba(255, 102, 204, 0.05)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Retour à la connexion
                </Button>
              </Link>
            </Stack>

            <Box textAlign="center" mt={4}>
              <Typography variant="body2" color="text.secondary">
                Vous n'avez pas reçu l'email ?{" "}
                <Link
                  href="/forgot-password"
                  style={{
                    color: "#ff66cc",
                    fontWeight: "bold",
                  }}
                >
                  Réessayer
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>

      <Footer />
    </>
  );
}