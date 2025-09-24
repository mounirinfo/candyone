"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  CardMedia,
  styled,
  CircularProgress,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";
import { useCheckoutStore } from "@/stores/useCheckoutStore";
import CheckoutStepper from "@/components/organismes/CheckoutStepper"; // ✅ import du Stepper réutilisable

const primaryColor = "#FB98F6";

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
});

interface Option {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

const OptionSelectionPage = () => {
  const router = useRouter();
  const { step, setStep, data, updateData } = useCheckoutStore();
  const selected = data.options || [];

  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch("/api/options");
        const json = await res.json();

        const localImages: string[] = [
          "/coaching.png",
          "/nutrition.png",
          "/spa.png",
          "/cours.png",
        ];

        const optionsWithImages = json.map((opt: Option, index: number) => ({
          ...opt,
          image: localImages[index] || "/default.png",
        }));

        setOptions(optionsWithImages);
      } catch (error) {
        console.error("Erreur chargement options :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const toggleOption = (optionId: number) => {
    const optionIdStr = optionId.toString();
    if (selected.includes(optionIdStr)) {
      updateData({
        options: selected.filter((id) => id !== optionIdStr),
      });
    } else {
      updateData({
        options: [...selected, optionIdStr],
      });
    }
  };

  const handleNext = () => {
    setStep(4);
    router.push("/checkout/personal-informations");
  };

  const handleBack = () => {
    setStep(2);
    router.push("/checkout/abonnement-selection");
  };

  return (
    <>
      <Header />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: "url(/macaron.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
          py: { xs: 6, md: 10 },
          "&:before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 1,
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 2,
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: 4,
            boxShadow: 3,
            p: { xs: 3, md: 6 },
            backdropFilter: "blur(12px)",
            mb: { xs: 12, md: 8 },
          }}
        >
          {/* ✅ Stepper réutilisable */}
          <CheckoutStepper activeStep={step - 1} />

          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 800,
              color: primaryColor,
              mb: 4,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Personnalisation Premium
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{
              color: "text.secondary",
              mb: 6,
              fontSize: { xs: "0.9rem", md: "1rem" },
            }}
          >
            Améliorez votre expérience sportive avec nos options exclusives
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                justifyContent: "center",
              }}
            >
              {options.map((option) => {
                const isSelected = selected.includes(option.id.toString());
                return (
                  <Box
                    key={option.id}
                    sx={{
                      width: { xs: "100%", sm: "45%", md: "22%" },
                      minWidth: 250,
                    }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 3,
                        border: `2px solid ${
                          isSelected ? primaryColor : "#eee"
                        }`,
                        transition: "all 0.3s ease",
                        boxShadow: isSelected ? 6 : 2,
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={option.image}
                        alt={option.name}
                        sx={{ height: 200, width: "100%", objectFit: "cover" }}
                      />
                      <CardContent
                        sx={{ flexGrow: 1, p: 3, backgroundColor: "white" }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                          {option.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ mb: 2, color: primaryColor }}
                        >
                          {option.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", mb: 2 }}
                        >
                          {option.description}
                        </Typography>
                        <Button
                          fullWidth
                          variant={isSelected ? "contained" : "outlined"}
                          onClick={() => toggleOption(option.id)}
                          sx={{
                            borderRadius: 2,
                            borderColor: primaryColor,
                            backgroundColor: isSelected
                              ? primaryColor
                              : "transparent",
                            color: isSelected ? "white" : primaryColor,
                            "&:hover": {
                              backgroundColor: isSelected
                                ? "#f06292"
                                : "#f8f8f8",
                            },
                          }}
                        >
                          {isSelected ? "✓ SÉLECTIONNÉ" : "Ajouter cette option"}
                        </Button>
                      </CardContent>
                    </Card>
                  </Box>
                );
              })}
            </Box>
          )}

          {/* Boutons desktop */}
          <Box
            sx={{
              mt: 6,
              display: { xs: "none", sm: "flex" },
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              sx={{
                borderRadius: 2,
                px: 4,
                borderColor: primaryColor,
                color: primaryColor,
              }}
            >
              Retour
            </Button>
            <GradientButton
              onClick={handleNext}
              sx={{
                px: 6,
                "&.Mui-disabled": {
                  background: "#eee",
                  color: "#999",
                },
              }}
            >
              Finaliser ma sélection ({selected.length})
              <CheckIcon sx={{ ml: 1.5 }} />
            </GradientButton>
          </Box>
        </Container>
      </Box>

      {/* Sticky button mobile */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          backgroundColor: "white",
          boxShadow: "0 -4px 10px rgba(0,0,0,0.1)",
          display: { xs: "flex", sm: "none" },
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <GradientButton
          onClick={handleNext}
          fullWidth
          sx={{
            py: 2,
            "&.Mui-disabled": {
              background: "#eee",
              color: "#999",
            },
          }}
        >
          Finaliser ma sélection ({selected.length})
          <CheckIcon sx={{ ml: 1.5 }} />
        </GradientButton>
      </Box>

      <Footer />
    </>
  );
};

export default OptionSelectionPage;
