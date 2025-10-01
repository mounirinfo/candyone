"use client";

import React, { FormEvent, useState } from "react";
import { Lock, Heart, Eye, EyeOff, ArrowLeft } from "lucide-react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";
import { resetPasswordAction } from "@/actions/reset-password";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!password) {
      setError("Veuillez saisir votre nouveau mot de passe.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("password", password);

      await resetPasswordAction(formData);
      
      setMessage("Votre mot de passe a été réinitialisé avec succès !");
      setPassword("");
    } catch (err) {
      setError("Une erreur est survenue lors de la réinitialisation. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                <Lock size={28} fill="white" />
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Link href="/login">
                <IconButton
                  sx={{
                    color: "#ff66cc",
                    "&:hover": {
                      backgroundColor: "rgba(255, 102, 204, 0.1)",
                    },
                  }}
                >
                  <ArrowLeft size={20} />
                </IconButton>
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
                  mb: 1,
                }}
              >
                Nouveau mot de passe
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Choisissez un nouveau mot de passe sécurisé
              </Typography>
            </Box>

            {error && (
              <Typography
                color="error"
                align="center"
                mb={2}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "rgba(255, 102, 204, 0.1)",
                  border: "1px solid #ff66cc",
                }}
              >
                {error}
              </Typography>
            )}

            {message && (
              <Typography
                color="success.main"
                align="center"
                mb={2}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "rgba(76, 175, 80, 0.1)",
                  border: "1px solid #4caf50",
                }}
              >
                {message}
              </Typography>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  required
                  name="password"
                  label="Nouveau mot de passe"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={20} color="#ff66cc" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                          sx={{ color: "#ff66cc" }}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#ff66cc",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ff66cc",
                        boxShadow: "0 0 0 2px rgba(255, 102, 204, 0.2)",
                      },
                    },
                  }}
                />

                <Button
  type="submit"
  variant="contained"
  disabled={loading}
  sx={{
    background: "linear-gradient(135deg, #ff66cc, #ff99dd)",
    color: "white",
    fontWeight: "bold",
    borderRadius: 2,
    py: 1.5,
    fontSize: "1.1rem",
    boxShadow: "0 6px 12px rgba(255, 102, 204, 0.4)",
    "&:hover": {
      background: "linear-gradient(135deg, #ff4dc4, #ff80d5)",
      boxShadow: "0 8px 16px rgba(255, 102, 204, 0.5)",
      transform: "translateY(-2px)",
    },
    transition: "all 0.3s ease",
  }}
>
  {loading ? "Changement en cours..." : "Changer le mot de passe"}
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

            <Box textAlign="center" mt={1}>
              <Typography variant="body2" color="text.secondary">
                Besoin d'aide ?{" "}
                <Link
                  href="/contact"
                  style={{
                    color: "#ff66cc",
                    fontWeight: "bold",
                  }}
                >
                  Contactez-nous
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