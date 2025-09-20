"use client";

import React from "react";
import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";
import { CssBaseline, Container, Box } from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import PersonIcon from "@mui/icons-material/Person";
import HandshakeIcon from "@mui/icons-material/Handshake";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SchoolIcon from "@mui/icons-material/School";
import { ClubSelectorHero } from "@/components/organismes/ClubSelectorHero";
import BonusBasicFit from "@/components/organismes/BonusBasicFit";
import GourmetTestimonial from "@/components/organismes/GourmetTestimonial";
import ExpertiseTeaser from "@/components/organismes/ExpertiseTeaser";
import PersonalTrainer from "@/components/organismes/PersonalTrainer";
import DiscoverCandyOneHero from "@/components/organismes/DiscoverCandyOneHero";
import RecipeSection from "@/components/organismes/RecipeSection";
import ContactFormSection from "@/components/organismes/ContactFormSection";
import ConfectionPricingSection from "@/components/organismes/ConfectionPricingSection";

export default function HomePage() {
  // Fonction appelée à la soumission du formulaire
  const handleContactSubmit = async (values: Record<string, string>) => {
    try {
      const res = await fetch("/api/callbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Erreur serveur");

      alert("✅ Votre demande a bien été envoyée !");
    } catch (err) {
      console.error(err);
      alert("❌ Une erreur est survenue.");
    }
  };

  return (
    <>
      <CssBaseline />
      <Header />

      <DiscoverCandyOneHero
        rightImageUrl="/13.png"
        onReserveHref="/checkout"
      />

      <ConfectionPricingSection
        onSelectPlan={(planId: string) => console.log("Plan choisi:", planId)}
        selectedPlan={null}
      />

      <ClubSelectorHero
        backgroundUrl="salle1.jpg"
        partnerNote="PARTENAIRE OFFICIEL BASIC-FIT"
        clubs={[
          {
            id: "ermont-1",
            address1: "1 AVENUE GEORGES POMPIDOU",
            address2: "95120 ERMONT",
            accent: "pink",
            onClick: () => alert("Club Ermont Pompidou"),
          },
          {
            id: "ermont-2",
            address1: "258 BOULEVARD DU HAVRE",
            address2: "95120 ERMONT",
            accent: "blue",
            onClick: () => alert("Club Ermont Havre"),
          },
        ]}
      />

      {/* autres sections ClubSelectorHero */}
      <ClubSelectorHero
        backgroundUrl="salle2.jpg"
        partnerNote="PARTENAIRE OFFICIEL BASIC-FIT"
        clubs={[
          {
            id: "ermont-1",
            address1: "1 AVENUE GEORGES POMPIDOU",
            address2: "95120 ERMONT",
            accent: "pink",
            onClick: () => alert("Club Ermont Pompidou"),
          },
          {
            id: "ermont-2",
            address1: "258 BOULEVARD DU HAVRE",
            address2: "95120 ERMONT",
            accent: "blue",
            onClick: () => alert("Club Ermont Havre"),
          },
        ]}
      />

      <ClubSelectorHero
        backgroundUrl="salle3.jpg"
        partnerNote="PARTENAIRE OFFICIEL BASIC-FIT"
        clubs={[
          {
            id: "ermont-1",
            address1: "1 AVENUE GEORGES POMPIDOU",
            address2: "95120 ERMONT",
            accent: "pink",
            onClick: () => alert("Club Ermont Pompidou"),
          },
          {
            id: "ermont-2",
            address1: "258 BOULEVARD DU HAVRE",
            address2: "95120 ERMONT",
            accent: "blue",
            onClick: () => alert("Club Ermont Havre"),
          },
        ]}
      />

      <ClubSelectorHero
        backgroundUrl="salle4.jpg"
        partnerNote="PARTENAIRE OFFICIEL BASIC-FIT"
        clubs={[
          {
            id: "ermont-1",
            address1: "1 AVENUE GEORGES POMPIDOU",
            address2: "95120 ERMONT",
            accent: "pink",
            onClick: () => alert("Club Ermont Pompidou"),
          },
          {
            id: "ermont-2",
            address1: "258 BOULEVARD DU HAVRE",
            address2: "95120 ERMONT",
            accent: "blue",
            onClick: () => alert("Club Ermont Havre"),
          },
        ]}
      />

      <BonusBasicFit
        leftImageUrl="/bonbon.png"
        rightImageUrl="/party.png"
        bullets={[
          {
            strong: "Coaching personnalisé : jusqu’à 60 séances* adaptées à ton rythme",
            sub: "Des séances tout au long de l’année",
          },
          {
            strong: "Plan d’entraînement individualisé",
            sub: "Un programme évolutif, mis à jour chaque mois",
          },
          {
            strong: "Rendez-vous avec ton coach expert dédié",
            sub: "Des suivis réguliers pour avancer sereinement",
          },
          {
            strong: "Analyse corporel : Muscle ou graisse ?",
            sub: "Analyse précise pour optimiser tes résultats.",
          },
        ]}
      />

      {/* Témoignages */}
      <GourmetTestimonial
        imageUrl="avis1.png"
        name="Maëlys Sbg"
        rating={5}
        paragraphs={[
          "Pendant 6 mois Eduin m’a accompagné dans mes entraînements...",
          "Merci pour ton aide et l’évolution musculaire...",
          "Merci pour tes disponibilités et ton adaptabilité.",
        ]}
        bgColor="#ddf9ff"
      />

      <ExpertiseTeaser
        title="L’EXPERTISABLE"
        subtitle="Goûter à notre best seller pour seulement 25€"
        leftImageUrl="expertise.png"
        rightImageUrl="expert.png"
        card={{
          ribbonTop: "UNE SÉANCE D’EXPERTISE COMPLÈTE",
          ribbonMid: "PENDANT 1 HEURE",
          ribbonBottom: "SANS ENGAGEMENT",
          bullets: [
            { text: "Prévention des blessures" },
            { text: "Un professionnel qui s’adapte" },
            { text: "Analyse morpho anatomique", strong: true },
            { text: "Sélection d’un parcours d’exercices" },
            { text: "Valable pour 1 personne" },
            { text: "1 heure d’expertise avec un coach" },
            { text: "Indispensable pour s’assurer du résultat", strong: true },
          ],
        }}
        ctaLabel="JE VEUX GOÛTER"
        onCta={() => alert("Expertisable – CTA")}
      />

      {/* Personal Trainers */}
      <Box mt={4}>
        <PersonalTrainer
          name="GLORIA"
          role="PERSONAL TRAINER"
          imageUrl="GLORIA.jpg"
          features={["Perte de poids", "Renforcement musculaire", "Remise en forme"]}
          footerText="Découvrez Gloria : ..."
        />
      </Box>

      <Box mt={4}>
        <PersonalTrainer
          name="EDUIN"
          role="PERSONAL TRAINER"
          imageUrl="EDUINE.jpg"
          features={["Perte de poids", "Renforcement musculaire", "Remise en forme"]}
          footerText="Découvrez Eduin : ..."
        />
      </Box>

      <Box mt={4}>
        <PersonalTrainer
          name="QUENTIN"
          role="PERSONAL TRAINER"
          imageUrl="QUENTIN.jpg"
          features={["Perte de poids", "Renforcement musculaire", "Remise en forme"]}
          footerText="Découvrez Quentin : ..."
        />
      </Box>

      {/* Recette */}
      <RecipeSection
        imageUrl="recette.png"
        features={[
          { icon: <CheckBoxOutlinedIcon />, title: "Une confiserie sur mesure", desc: "..." },
          { icon: <PersonIcon />, title: "Confiseur individuel" },
          { icon: <HandshakeIcon />, title: "Un dosage unique", desc: "..." },
          { icon: <WhatshotIcon />, title: "Une cuisson parfaite", desc: "..." },
          { icon: <SchoolIcon />, title: "Des experts" },
        ]}
      />

      {/* Formulaire de contact */}
      <ContactFormSection
  imageUrl="formulaire.png"
  currentUser={null}
/>


      <Container maxWidth="lg" sx={{ mt: 4, minHeight: "70vh" }} />

      <Footer />
    </>
  );
}
