"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  MenuItem,
  CircularProgress,
  Divider,
  styled,
} from "@mui/material";
import {
  Email as MailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
  Security as ShieldIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";
import CheckoutStepper from "@/components/organismes/CheckoutStepper";
import { useCheckoutStore } from "@/stores/useCheckoutStore";

const primaryColor = "#FB98F6";

// ✅ Schéma de validation stricte
const schema = yup.object().shape({
  email: yup.string().email("Email invalide").required("L'email est requis"),
  password: yup.string().min(8, "Minimum 8 caractères").required("Mot de passe requis"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe doivent correspondre")
    .required("Confirmation requise"),
  nom: yup.string().required("Le nom est requis"),
  prenom: yup.string().required("Le prénom est requis"),
  telephone: yup
    .string()
    .matches(/^[0-9]+$/, "Numéro invalide")
    .min(10, "Numéro trop court")
    .required("Le téléphone est requis"),
  anniversaire: yup.string().required("La date de naissance est requise"),
  codePostal: yup.string().required("Le code postal est requis"),
  numero: yup.string().required("Le numéro de rue est requis"),
  rue: yup.string().required("La rue est requise"),
  ville: yup.string().required("La ville est requise"),
  genre: yup.string().required("Le genre est requis"),
  acceptMarketing: yup.boolean(),
  acceptContact: yup.boolean(),
});

const GradientButton = styled(Button)({
  background: `linear-gradient(45deg, ${primaryColor} 0%, #F06292 100%)`,
  border: 0,
  borderRadius: 25,
  color: "white",
  padding: "12px 40px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(251, 152, 246, 0.3)",
  },
  "&.Mui-disabled": {
    background: "#eee",
    color: "#999",
  },
});

export default function CoordonneesPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { updateData, setStep } = useCheckoutStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      acceptMarketing: false,
      acceptContact: false,
      genre: "",
    },
  });

  const onSubmit = async (formData: any) => {
    setIsLoading(true);
    updateData({ coordonnees: formData });
    const fullState = useCheckoutStore.getState();

    try {
      const res = await fetch("/api/checkout/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullState.data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Erreur lors de l'inscription");
        return;
      }

      router.push("/inscription/success");
    } catch (error) {
      alert("Impossible de contacter le serveur");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep(2);
    router.back();
  };

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
              {/* ✅ Stepper uniformisé */}
              <CheckoutStepper activeStep={3} />

              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Inscription
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Créez votre compte
                </Typography>
              </Box>

              {/* FORM */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
                  {/* Colonne gauche */}
                  <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          type="email"
                          label="Email *"
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MailIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          type="password"
                          label="Mot de passe *"
                          error={!!errors.password}
                          helperText={errors.password?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          type="password"
                          label="Confirmez le mot de passe *"
                          error={!!errors.confirmPassword}
                          helperText={errors.confirmPassword?.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <ShieldIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="prenom"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          label="Prénom *"
                          error={!!errors.prenom}
                          helperText={errors.prenom?.message}
                        />
                      )}
                    />
                    <Controller
                      name="nom"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          label="Nom *"
                          error={!!errors.nom}
                          helperText={errors.nom?.message}
                        />
                      )}
                    />
                  </Box>

                  {/* Colonne droite */}
                  <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Controller
                      name="telephone"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          label="Téléphone *"
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
                    <Controller
                      name="anniversaire"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          type="date"
                          label="Date de naissance *"
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.anniversaire}
                          helperText={errors.anniversaire?.message}
                        />
                      )}
                    />
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Controller
                        name="numero"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="N° *"
                            error={!!errors.numero}
                            helperText={errors.numero?.message}
                          />
                        )}
                      />
                      <Controller
                        name="rue"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Rue *"
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
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Code Postal *"
                            error={!!errors.codePostal}
                            helperText={errors.codePostal?.message}
                          />
                        )}
                      />
                      <Controller
                        name="ville"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            required
                            label="Ville *"
                            error={!!errors.ville}
                            helperText={errors.ville?.message}
                          />
                        )}
                      />
                    </Box>
                    <Controller
                      name="genre"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          select
                          fullWidth
                          label="Genre *"
                          error={!!errors.genre}
                          helperText={errors.genre?.message}
                        >
                          <MenuItem value="Homme">Homme</MenuItem>
                          <MenuItem value="Femme">Femme</MenuItem>
                          <MenuItem value="Autre">Autre</MenuItem>
                        </TextField>
                      )}
                    />
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Options */}
                <Box sx={{ mb: 3 }}>
                  <Controller
                    name="acceptMarketing"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label="J'accepte de recevoir des offres"
                      />
                    )}
                  />
                  <br />
                  <Controller
                    name="acceptContact"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label="J'accepte d'être contacté"
                      />
                    )}
                  />
                </Box>

                {/* Boutons */}
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                  <Button variant="outlined" onClick={handleBack} startIcon={<ArrowBackIcon />}>
                    Retour
                  </Button>
                  <GradientButton type="submit" disabled={!isValid || isLoading}>
                    {isLoading ? (
                      <>
                        <CircularProgress size={20} sx={{ mr: 1, color: "white" }} /> Inscription en cours...
                      </>
                    ) : (
                      "S'inscrire"
                    )}
                  </GradientButton>
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
