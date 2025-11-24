// app/checkout/complete-profile/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  InputAdornment,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  LocationOn as MapPinIcon,
  CalendarToday as CalendarIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";

import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";
import CheckoutStepper from "@/components/organismes/CheckoutStepper";
import { useCheckoutStore } from "@/stores/useCheckoutStore";

const primaryColor = "#FB98F6";

export default function CompleteProfilePage() {
  const router = useRouter();
  const { data: checkoutData } = useCheckoutStore();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: "onChange",
    defaultValues: {
      telephone: "",
      date_naissance: "",
      numero: "",
      rue: "",
      codePostal: "",
      ville: "",
    },
  });

  // Vérifier l'utilisateur au chargement
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/checkout/check-user");
        const data = await res.json();

        if (!data.isConnected) {
          // Pas connecté → rediriger vers inscription normale
          router.push("/checkout/personal-informations");
          return;
        }

        setUserInfo(data);
        setMissingFields(data.missingFields || []);

        // Si rien ne manque, rediriger directement vers création abonnement
        if (!data.needsCompletion) {
          await createSubscription({});
        }
      } catch (err) {
        console.error("Erreur vérification utilisateur:", err);
        setError("Impossible de vérifier votre profil");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const createSubscription = async (profileData: any) => {
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        clubId: checkoutData.clubId,
        abonnementId: checkoutData.abonnementId,
        options: checkoutData.options || [],
        telephone: profileData.telephone || null,
        date_naissance: profileData.date_naissance || null,
        adresse: (profileData.numero && profileData.rue) ? {
          numero: profileData.numero,
          rue: profileData.rue,
          codePostal: profileData.codePostal,
          ville: profileData.ville,
        } : null,
        prereservation: false, // Pour l'instant on passe directement au paiement
      };

      const res = await fetch("/api/checkout/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Erreur lors de la création de l'abonnement");
      }

      // Rediriger vers le profil
      router.push("/profile?success=true");

    } catch (err: any) {
      console.error("Erreur création abonnement:", err);
      setError(err.message || "Une erreur est survenue");
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmit = async (formData: any) => {
    await createSubscription(formData);
  };

  const handleBack = () => {
    router.push("/checkout/option-selection");
  };

  if (loading) {
    return (
      <>
        <Header />
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: "url(/macaron.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <CircularProgress sx={{ color: primaryColor }} />
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <Container
        maxWidth={false}
        sx={{
          minHeight: "100vh",
          backgroundImage: "url(/macaron.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 1,
          },
          "& > *": {
            position: "relative",
            zIndex: 2,
          },
        }}
      >
        <Container maxWidth="md">
          <Card sx={{ borderRadius: 3, boxShadow: 3, backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
            <CardContent sx={{ p: 4 }}>
              <CheckoutStepper activeStep={3} />

              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Compléter votre profil
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Bonjour {userInfo?.user?.prenom} ! Complétez les informations manquantes
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Alert severity="info" sx={{ mb: 3 }}>
                Vous êtes connecté avec votre compte Google. Veuillez compléter les informations suivantes pour finaliser votre abonnement.
              </Alert>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  
                  {/* Téléphone */}
                  {missingFields.includes("telephone") && (
                    <Controller
                      name="telephone"
                      control={control}
                      rules={{
                        required: "Le téléphone est requis",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Numéro invalide (10 chiffres)"
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          label="Téléphone *"
                          placeholder="0612345678"
                          error={!!errors.telephone}
                          helperText={errors.telephone?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  )}

                  {/* Date de naissance */}
                  {missingFields.includes("date_naissance") && (
                    <Controller
                      name="date_naissance"
                      control={control}
                      rules={{ required: "La date de naissance est requise" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          type="date"
                          label="Date de naissance *"
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.date_naissance}
                          helperText={errors.date_naissance?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CalendarIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  )}

                  {/* Adresse */}
                  {missingFields.includes("adresse") && (
                    <>
                      <Divider sx={{ my: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Adresse
                        </Typography>
                      </Divider>

                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Controller
                          name="numero"
                          control={control}
                          rules={{ required: "Le numéro est requis" }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              required
                              label="N° *"
                              sx={{ width: "30%" }}
                              error={!!errors.numero}
                              helperText={errors.numero?.message}
                            />
                          )}
                        />
                        <Controller
                          name="rue"
                          control={control}
                          rules={{ required: "La rue est requise" }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              required
                              label="Rue *"
                              sx={{ flex: 1 }}
                              error={!!errors.rue}
                              helperText={errors.rue?.message}
                            />
                          )}
                        />
                      </Box>

                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Controller
                          name="codePostal"
                          control={control}
                          rules={{ 
                            required: "Le code postal est requis",
                            pattern: {
                              value: /^[0-9]{5}$/,
                              message: "Code postal invalide"
                            }
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              required
                              label="Code Postal *"
                              placeholder="75001"
                              sx={{ width: "40%" }}
                              error={!!errors.codePostal}
                              helperText={errors.codePostal?.message}
                            />
                          )}
                        />
                        <Controller
                          name="ville"
                          control={control}
                          rules={{ required: "La ville est requise" }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              required
                              label="Ville *"
                              sx={{ flex: 1 }}
                              error={!!errors.ville}
                              helperText={errors.ville?.message}
                            />
                          )}
                        />
                      </Box>
                    </>
                  )}
                </Box>

                {/* Boutons */}
                <Box sx={{ display: "flex", gap: 2, mt: 4, justifyContent: "space-between" }}>
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    startIcon={<ArrowBackIcon />}
                    disabled={submitting}
                    sx={{
                      borderColor: primaryColor,
                      color: primaryColor,
                      "&:hover": {
                        borderColor: primaryColor,
                        backgroundColor: "rgba(251, 152, 246, 0.1)",
                      },
                    }}
                  >
                    Retour
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!isValid || submitting}
                    startIcon={submitting ? <CircularProgress size={20} /> : <CheckIcon />}
                    sx={{
                      background: `linear-gradient(45deg, ${primaryColor} 0%, #F06292 100%)`,
                      color: "white",
                      px: 4,
                      "&:hover": {
                        background: `linear-gradient(45deg, #F06292 0%, ${primaryColor} 100%)`,
                      },
                      "&.Mui-disabled": {
                        background: "#eee",
                        color: "#999",
                      },
                    }}
                  >
                    {submitting ? "Création en cours..." : "Finaliser mon abonnement"}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Container>

      <Footer />
    </>
  );
}