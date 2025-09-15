"use client";

import React, { FormEvent, useState } from "react";
import { Mail, Lock, Eye, EyeOff, Heart } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
  Divider,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Échec de la connexion");
        return;
      }

      // ✅ Connexion réussie : redirection vers le tableau de bord
      window.location.href = "/profile";
    } catch (err) {
      setError("Erreur réseau, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* HEADER */}
      <Header />

      {/* BACKGROUND + FORM */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: 'url("fmacaron.jpg")',
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
                Rejoignez Candy Body
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Commencez votre parcours fitness dès aujourd&apos;hui
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

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  required
                  name="email"
                  label="Adresse Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} color="#ff66cc" />
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

                <TextField
                  fullWidth
                  required
                  name="password"
                  label="Mot de Passe"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
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
                  {loading ? "Connexion..." : "Se connecter"}
                </Button>
              </Stack>
            </form>

            <Divider
              sx={{
                my: 4,
                color: "text.secondary",
                "&::before, &::after": {
                  borderColor: "rgba(255, 102, 204, 0.3)",
                },
              }}
            >
              ou
            </Divider>

            {/* Google login (désactivé) */}
            <Box textAlign="center" sx={{ opacity: 0.7, pointerEvents: "none" }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FcGoogle size={20} />}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  fontWeight: "bold",
                  bgcolor: "white",
                  color: "text.primary",
                  borderColor: "rgba(255, 102, 204, 0.3)",
                  "&:hover": {
                    borderColor: "#ff66cc",
                    bgcolor: "rgba(255, 102, 204, 0.05)",
                  },
                }}
              >
                Connexion avec Google (désactivée)
              </Button>
            </Box>

            <Box textAlign="center" mt={3}>
              <Typography variant="body2" color="text.secondary">
                Pas encore inscrit ?{" "}
                <Link
                  href="/signup"
                  style={{
                    color: "#ff66cc",
                    fontWeight: "bold",
                  }}
                >
                  Créer un compte
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
