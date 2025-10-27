"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, CheckCircle, Heart } from "lucide-react";
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
import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";
import { supabase } from "@/lib/supabaseBrowserClient";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [validLink, setValidLink] = useState(false);

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");

    if (accessToken) {
      setValidLink(true);
    } else {
      setError("Lien invalide ou expiré ❌");
    }
  }, []);

  const handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setMessage("✅ Ton mot de passe a bien été réinitialisé !");
      setTimeout(() => router.push("/login"), 2000);
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
                Nouveau mot de passe
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Choisis un nouveau mot de passe sécurisé
              </Typography>
            </Box>

            {!validLink && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                  border: "1px solid #ff66cc",
                }}
              >
                {error || "Lien invalide ou expiré."}
              </Alert>
            )}

            {error && validLink && (
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

            {validLink && (
              <form onSubmit={handleReset}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    required
                    label="Nouveau mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock size={20} color="#ff66cc" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button 
                    type="submit" 
                    variant="contained" 
                    disabled={loading}
                    endIcon={<CheckCircle size={20} />}
                    sx={{
                      background: "linear-gradient(135deg, #ff66cc, #ff99dd)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #ff4db8, #ff80d5)",
                      },
                    }}
                  >
                    {loading ? "Mise à jour..." : "Changer le mot de passe"}
                  </Button>
                </Stack>
              </form>
            )}
          </Paper>
        </Container>
      </Box>

      <Footer />
    </>
  );
}