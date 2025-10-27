"use client";

import React, { FormEvent, useState } from "react";
import { Mail, ArrowRight, Heart } from "lucide-react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
  Alert,
} from "@mui/material";
import Link from "next/link";
import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";
import { supabase } from "@/lib/supabaseBrowserClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/profile/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("✅ Un lien de réinitialisation a été envoyé à ton adresse email.");
    }

    setLoading(false);
  };

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
            {/* Icône décorative */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 1.5,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ff99dd, #ff66cc)",
                  color: "white",
                  mb: 2,
                  boxShadow: "0 4px 12px rgba(255, 102, 204, 0.4)",
                }}
              >
                <Heart size={28} fill="white" />
              </Box>
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
                  mb: 1,
                }}
              >
                Mot de passe oublié
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Entre ton adresse email pour recevoir un lien de réinitialisation
              </Typography>
            </Box>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                  border: "1px solid #ff66cc",
                }}
              >
                {error}
              </Alert>
            )}

            {message && (
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                  border: "1px solid #4caf50",
                }}
              >
                {message}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  required
                  label="Adresse Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} color="#ff66cc" />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={loading}
                  endIcon={<ArrowRight size={20} />}
                  sx={{
                    background: "linear-gradient(135deg, #ff66cc, #ff99dd)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #ff4db8, #ff80d5)",
                    },
                  }}
                >
                  {loading ? "Envoi en cours..." : "Envoyer le lien"}
                </Button>
              </Stack>
            </form>

            <Box textAlign="center" mt={3}>
              <Typography variant="body2" color="text.secondary">
                Retour à la{" "}
                <Link
                  href="/login"
                  style={{
                    color: "#ff66cc",
                    fontWeight: "bold",
                  }}
                >
                  connexion
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