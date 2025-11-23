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
import { supabase } from "@/lib/supabaseBrowserClient";

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
  const [googleLoading, setGoogleLoading] = useState(false);

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

      console.log("Utilisateur :", data.user);
      console.log("Rôle :", data.role);

      if (data.access_token && data.refresh_token) {
        document.cookie = `sb-access-token=${data.access_token}; path=/; max-age=3600; SameSite=Lax`;
        document.cookie = `sb-refresh-token=${data.refresh_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        console.log("🍪 Tokens stockés dans les cookies");
      }

      window.location.href = data.redirectTo || "/profile";
    } catch (err) {
      setError("Erreur réseau, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ✅ Flow Implicit pour Google OAuth
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError(null);

    try {
      console.log("🚀 Démarrage connexion Google...");
      
      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          skipBrowserRedirect: false,
        },
      });

      if (oauthError) {
        console.error("❌ Erreur OAuth:", oauthError);
        setError("Impossible de se connecter avec Google");
        setGoogleLoading(false);
        return;
      }

      console.log("✅ Redirection vers Google...", data);
      // L'utilisateur sera redirigé automatiquement
    } catch (err) {
      console.error("💥 Erreur inattendue:", err);
      setError("Une erreur est survenue lors de la connexion avec Google");
      setGoogleLoading(false);
    }
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
                          onClick={togglePasswordVisibility}
                          edge="end"
                          sx={{ color: "#ff66cc" }}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box textAlign="right" mt={1}>
                  <Typography variant="body2" color="text.secondary">
                    <Link
                      href="/profile/forgot-password"
                      style={{
                        color: "#ff66cc",
                        fontWeight: "500",
                        textDecoration: "none",
                      }}
                    >
                      Mot de passe oublié ?
                    </Link>
                  </Typography>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading || googleLoading}
                  sx={{
                    background: "linear-gradient(135deg, #ff66cc, #ff99dd)",
                    color: "white",
                    fontWeight: "bold",
                    py: 1.5,
                    borderRadius: 2,
                    "&:hover": {
                      background: "linear-gradient(135deg, #ff4db8, #ff66cc)",
                    },
                  }}
                >
                  {loading ? "Connexion..." : "Se connecter"}
                </Button>
              </Stack>
            </form>

            <Divider sx={{ my: 4 }}>ou</Divider>

            <Box textAlign="center">
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FcGoogle size={20} />}
                disabled={googleLoading || loading}
                onClick={handleGoogleLogin}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  fontWeight: "bold",
                  bgcolor: "white",
                  border: "2px solid #e0e0e0",
                  color: "#333",
                  "&:hover": {
                    border: "2px solid #ff66cc",
                    bgcolor: "rgba(255, 102, 204, 0.05)",
                  },
                  "&:disabled": {
                    bgcolor: "#f5f5f5",
                    color: "#999",
                  },
                }}
              >
                {googleLoading
                  ? "Redirection vers Google..."
                  : "Connexion avec Google"}
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
                    textDecoration: "none",
                  }}
                >
                  Créer un compte
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