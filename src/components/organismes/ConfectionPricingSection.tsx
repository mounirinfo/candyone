"use client";

import React from "react";
import { Box, styled, useTheme, useMediaQuery } from "@mui/material";
import OfferCardPop from "@/components/molecules/OfferCard";
import CandyOne from "@/components/atoms/CandyOne"; // ✅ ton titre stylisé

interface ConfectionPricingSectionProps {
  onSelectPlan: (planId: string) => void;
  selectedPlan: string | null;
}

const SectionRoot = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(4),
  marginTop: theme.spacing(6),
  background: "#f8f4f4",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
  },
}));

const CardsColumn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    justifyContent: "center",
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    order: 1,
    marginLeft: theme.spacing(-10),
  },
}));

const ConfectionPricingSection: React.FC<ConfectionPricingSectionProps> = ({
  selectedPlan = null,
  onSelectPlan,
}) => {
  const [formules, setFormules] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    const fetchFormules = async () => {
      try {
        const res = await fetch("/api/formules");
        const data = await res.json();
        setFormules(data);
      } catch (err) {
        console.error("Erreur chargement formules :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFormules();
  }, []);

  const safeSelect = (planId: string) => {
    if (typeof onSelectPlan === "function") onSelectPlan(planId);
  };

  if (loading) return <p>Chargement des formules...</p>;

  return (
    <SectionRoot>
      {/* ✅ Titre affiché uniquement sur mobile, légèrement décalé à gauche */}
      {isMobile && (
        <Box
          sx={{
            gridColumn: "1 / -1",
            textAlign: "left", 
            ml: 2, 
            mb: 2,
          }}
        >
          <CandyOne sx={{ fontSize: 30 }}>Les confiseries</CandyOne>
        </Box>
      )}

      <CardsColumn sx={isMobile ? { alignItems: "flex-start", ml: 2 } : {}}>
        {formules.map((f) => (
          <OfferCardPop
            key={f.id}
            price={`€${(f.prix_cents / 100).toFixed(2)}`}
            period={`/ ${f.recurrence} semaines`}
            imageSrc="/3.png"
            ribbonText={f.nom}
            ribbonSubText={f.description?.split("\n")[0] || ""}
            features={f.description?.split("\n") || []}
            buttonText={`CHOISIR ${f.nom.toUpperCase()}`}
            onClick={() => safeSelect(f.id)}
            selected={selectedPlan === f.id}
          />
        ))}
      </CardsColumn>

      {/* ✅ Image masquée sur mobile */}
      {!isMobile && (
        <ImageContainer>
          <Box
            component="img"
            src="/silhouette.png"
            alt="Illustration"
            sx={{ maxWidth: "70%", height: "auto", marginLeft: "20px" }}
          />
        </ImageContainer>
      )}
    </SectionRoot>
  );
};

export default ConfectionPricingSection;
