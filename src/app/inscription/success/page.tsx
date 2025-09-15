"use client";

import Link from "next/link";
import { Box, Paper, Typography, Button, Divider } from "@mui/material";
import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";

export default function EmailLanding() {
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* CONTENU */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
          px: 2,
          backgroundImage: 'url("/fmacaron.jpg")', 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(236, 72, 153, 0.05)",
            backdropFilter: "blur(2px)",
          }
        }}
      >
        <Paper
          elevation={8}
          sx={{
            maxWidth: 450,
            width: "100%",
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            bgcolor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(8px)",
            position: "relative",
            zIndex: 1,
            boxShadow: "0 20px 40px rgba(236, 72, 153, 0.15)",
            border: "1px solid rgba(236, 72, 153, 0.1)",
          }}
        >
          {/* Icône avec effet plus doux */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2.5,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #fce7f3, #fbcfe8)",
              mb: 3,
              boxShadow: "0 8px 16px rgba(236, 72, 153, 0.2)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "#be185d" }}
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </Box>

          {/* Titre */}
          <Typography variant="h4" fontWeight="700" gutterBottom sx={{ 
            color: "#831843",
            background: "linear-gradient(135deg, #db2777, #ec4899)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2
          }}>
            Confirmation requise
          </Typography>

          <Divider
            sx={{
              mx: "auto",
              width: 80,
              height: 5,
              borderRadius: 2,
              background: "linear-gradient(90deg, #f9a8d4, #ec4899, #be185d)",
              mb: 4,
            }}
          />

          {/* Message */}
          <Typography variant="body1" color="text.secondary" mb={2} sx={{ fontSize: "1.1rem" }}>
            Nous avons envoyé un{" "}
            <Box component="span" fontWeight="700" sx={{ 
              color: "transparent",
              background: "linear-gradient(135deg, #db2777, #ec4899)",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              lien de confirmation
            </Box>{" "}
            à votre adresse email.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 4, px: 2, lineHeight: 1.6 }}
          >
            Cliquez sur le lien reçu pour finaliser votre inscription et accéder
            à votre compte.
          </Typography>

          {/* Bouton avec effet amélioré */}
          <Button
            component={Link}
            href="/login"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(135deg, #ec4899, #db2777)",
              color: "white",
              fontWeight: "bold",
              py: 1.5,
              mb: 3,
              borderRadius: 2,
              fontSize: "1.1rem",
              boxShadow: "0 6px 12px rgba(236, 72, 153, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #db2777, #be185d)",
                boxShadow: "0 8px 16px rgba(236, 72, 153, 0.4)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Se connecter
          </Button>

          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: "italic" }}>
            Pas reçu ? Vérifiez vos spams ou contactez le support
          </Typography>
        </Paper>
      </Box>

      {/* FOOTER */}
      <Footer />
    </>
  );
}