"use client";

import React from "react";
import { Box, Card, Stack, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const Pink = "#ef77bbff";
const Cyan = "#d6f7ff";

const PriceText = styled(Typography)(() => ({
  fontSize: "2.5rem",
  fontWeight: 900,
  color: Pink,
  textShadow: "0 0 8px rgba(236, 174, 209, 1)",
}));

const PeriodText = styled(Typography)(() => ({
  fontSize: "1.5rem",
  fontWeight: 600,
  marginTop: -6,
}));

const Ribbon = styled(Box)<{ selected?: boolean }>(({ selected }) => ({
  background: selected ? Pink : "#000",
  color: "#fff",
  borderRadius: 999,
  padding: "8px 10px",
  fontWeight: 900,
  textAlign: "center",
  fontSize: "1.1rem",
  width: "100%",
  transition: "all 0.3s",
}));

const FeaturesBox = styled(Box)(() => ({
  background: Cyan,
  borderRadius: 20,
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  fontSize: "1rem",
}));

const FeatureItem = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontWeight: 700,
  fontSize: "1rem",
}));

const CTAButton = styled(Button)<{ selected?: boolean }>(({ selected }) => ({
  textTransform: "none",
  borderRadius: 999,
  background: selected ? Pink : "#000",
  color: "#fff",
  fontWeight: 900,
  fontSize: "1rem",
  padding: "12px 28px",
  width: "100%",
  transition: "all 0.3s",
  ":hover": {
    background: selected ? "#f06292" : "#111",
  },
}));

interface OfferCardPopProps {
  price: string;
  period: string;
  imageSrc: string;
  ribbonText: string;
  ribbonSubText: string;
  features: string[];
  buttonText?: string;
  onClick: () => void; // Make required
  selected?: boolean;
}

const OfferCardPop: React.FC<OfferCardPopProps> = ({
  price,
  period,
  imageSrc,
  ribbonText,
  ribbonSubText,
  features,
  buttonText = "CHOISIR",
  onClick,
  selected = false,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: selected
          ? "0 0 20px rgba(251, 152, 246, 0.6)"
          : "0 2px 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
        maxWidth: 460,
        p: 2,
        position: "relative",
        cursor: "pointer",
        transition: "all 0.3s",
        ":hover": {
          transform: "scale(1.03)",
          boxShadow: "0 8px 20px rgba(251, 152, 246, 0.3)",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Box>
          <PriceText>{price}</PriceText>
          <PeriodText>{period}</PeriodText>
        </Box>
        <Box
          component="img"
          src={imageSrc}
          alt="Illustration"
          sx={{ width: 120, height: 120, objectFit: "cover" }}
        />
      </Box>

      <Stack spacing={1} alignItems="center" sx={{ width: "100%" }}>
        <Ribbon selected={selected}>
          {ribbonText}
          <Typography
            component="span"
            sx={{ fontSize: "0.9rem", opacity: 0.8, display: "block", color: "#fff" }}
          >
            {ribbonSubText}
          </Typography>
        </Ribbon>

        <FeaturesBox>
          {features.map((feature, index) => (
            <FeatureItem key={index}>
              {getFeatureIcon(index)} <span>{feature}</span>
            </FeatureItem>
          ))}
        </FeaturesBox>

        <CTAButton onClick={onClick} selected={selected}>
          {buttonText}
        </CTAButton>
      </Stack>
    </Card>
  );
};

const getFeatureIcon = (index: number) => {
  const icons = ["🎫", "🏋️", "🧭", "🧑‍💻"];
  return icons[index % icons.length] || "🎯";
};

export default OfferCardPop;
