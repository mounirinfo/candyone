"use client";

import React from "react";
import { useRouter } from "next/navigation"; // 👈 à importer
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
  const router = useRouter();

  const handleClubSelect = () => {
    router.push(`/checkout`);
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
        onSelectPlan={function (planId: string): void {
          throw new Error("Function not implemented.");
        }}
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
            onClick: () => handleClubSelect(),
          },
          {
            id: "ermont-2",
            address1: "258 BOULEVARD DU HAVRE",
            address2: "95120 ERMONT",
            accent: "blue",
            onClick: () => handleClubSelect(), 
          },
        ]}
      />

      <BonusBasicFit
        leftImageUrl="/bonbon.png"
        rightImageUrl="/party.png"
        bullets={[
          { strong: "Coaching personnalisé : jusqu’à 60 séances* adaptées à ton rythme", sub: "Des séances tout au long de l’année" },
          { strong: "Plan d’entraînement individualisé", sub: "Un programme évolutif, mis à jour chaque mois" },
          { strong: "Rendez-vous avec ton coach expert dédié", sub: "Des suivis réguliers pour avancer sereinement" },
          { strong: "Analyse corporel : Muscle ou graisse ?", sub: "Analyse précise pour optimiser tes résultats." },
        ]}
      />

      <GourmetTestimonial
        imageUrl="avis1.png"
        name="Maëlys Sbg"
        rating={5}
        paragraphs={[
          "Pendant 6 mois Eduin m’a accompagné dans mes entraînements que ce soit pour le haut du corps comme le bas du corps.",
          "Merci pour ton aide et l’évolution musculaire que j’ai pu recevoir grâce à ton coaching.",
          "Merci pour tes disponibilités et ton adaptabilité.",
        ]}
        bgColor="#ddf9ff"
      />
      <GourmetTestimonial
        imageUrl="avis2.png"
        name="Maëlys Sbg"
        rating={5}
        paragraphs={[
          "Pendant 6 mois Eduin m’a accompagné dans mes entraînements que ce soit pour le haut du corps comme le bas du corps.",
          "Merci pour ton aide et l’évolution musculaire que j’ai pu recevoir grâce à ton coaching.",
          "Merci pour tes disponibilités et ton adaptabilité.",
        ]}
        bgColor="#f9cfe7"
      />
      <GourmetTestimonial
        imageUrl="avis3.png"
        name="Maëlys Sbg"
        rating={5}
        paragraphs={[
          "Pendant 6 mois Eduin m’a accompagné dans mes entraînements que ce soit pour le haut du corps comme le bas du corps.",
          "Merci pour ton aide et l’évolution musculaire que j’ai pu recevoir grâce à ton coaching.",
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

      <Box mt={4}>
        <PersonalTrainer
          name="GLORIA"
          role="PERSONAL TRAINER"
          imageUrl="GLORIA.jpg"
          features={[
            "Perte de poids",
            "Renforcement musculaire",
            "Remise en forme",
            "Anglais – Français – LSF",
            "Coach diplômé d’état (BPJEPS)",
            "Disponible sur Ermont & Pierrelaye",
          ]}
          footerText="Découvrez Gloria : Une personnalité pétillante qui saura vous orienter et vous permettra d’atteindre tout vos objectifs."
        />
      </Box>

      <Box mt={4}>
        <PersonalTrainer
          name="EDUIN"
          role="PERSONAL TRAINER"
          imageUrl="EDUINE.jpg"
          features={[
            "Perte de poids",
            "Renforcement musculaire",
            "Remise en forme",
            "Anglais – Français – LSF",
            "Coach diplômé d’état (BPJEPS)",
            "Disponible sur Ermont & Pierrelaye",
          ]}
          footerText="Découvrez Gloria : Une personnalité pétillante qui saura vous orienter et vous permettra d’atteindre tout vos objectifs."
        />
      </Box>

      <Box mt={4}>
        <PersonalTrainer
          name="QUENTIN"
          role="PERSONAL TRAINER"
          imageUrl="QUENTIN.jpg"
          features={[
            "Perte de poids",
            "Renforcement musculaire",
            "Remise en forme",
            "Anglais – Français – LSF",
            " Coach diplomé d’état (CQP)",
            "Disponible sur Ermont & Pierrelaye",
          ]}
          footerText="Découvrez Gloria : Une personnalité pétillante qui saura vous orienter et vous permettra d’atteindre tout vos objectifs."
        />
      </Box>

      <RecipeSection
        imageUrl="recette.png"
        features={[
          { icon: <CheckBoxOutlinedIcon />, title: "Une confiserie sur mesure", desc: "Un programme sportif sur-mesure qui répond à votre objectif." },
          { icon: <PersonIcon />, title: "Confiseur individuel" },
          { icon: <HandshakeIcon />, title: "Un dosage unique", desc: "Formule adaptée aux personnes à mobilité réduite ou en rééducation." },
          { icon: <WhatshotIcon />, title: "Une cuisson parfaite", desc: "Des résultats à portée de main." },
          { icon: <SchoolIcon />, title: "Des experts" },
        ]}
      />

<ContactFormSection imageUrl="formulaire.png" />


      <Container maxWidth="lg" sx={{ mt: 4, minHeight: "70vh" }}>
      </Container>

      <Footer />
    </>
  );
}
