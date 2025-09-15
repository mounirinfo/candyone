"use client";

import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";
import { Box, Typography, Container, Paper, Divider } from "@mui/material";

const GeneralConditionsPage = () => {
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* PAGE CONTAINER */}
      <Container
        maxWidth={false}
        sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", p: 0 }}
      >
        {/* HERO */}
        <Box
          sx={{
            position: "relative",
            height: "350px",
            backgroundImage: "url(/general-conditions.jpg)", // 👉 Mets ton image ici
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "white",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.5)",
            }}
          />
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Typography variant="h2" sx={{ fontWeight: "bold", letterSpacing: 2 }}>
              CONDITIONS GÉNÉRALES
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Version applicable au 5 mai 2025
            </Typography>
          </Box>
        </Box>

        {/* CONTENT */}
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
            {/* Article 1 */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              ARTICLE 1. DÉFINITIONS
            </Typography>
            <Typography variant="body1" paragraph>
              Si vous êtes Membre chez nous ou que vous voulez le devenir et que vous utilisez nos
              services ou produits, cela doit se faire selon des accords clairs et transparents. En
              vous inscrivant, vous déclarez avoir pris connaissance et accepter ces conditions
              générales ainsi que le règlement intérieur de Basic-Fit et agir conformément à ceux-ci.
              Les conditions générales et le règlement intérieur se trouvent sur{" "}
              <a
                href="http://www.basic-fit.com/fr-fr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.basic-fit.com/fr-fr/
              </a>{" "}
              et sont consultables à l'accueil des Clubs Basic-Fit. Les présentes Conditions
              Générales entrent en vigueur à compter du 5 mai 2025 et sont valables pour tout nouvel
              abonnement souscrit à compter de cette date.
            </Typography>

            {/* ... définitions */}
            <Typography variant="body1" paragraph>
              <strong>Ami :</strong> si vous avez un abonnement Premium ou Ultimate, vous pouvez être
              accompagnés d'un ami. Cet ami ne peut pas venir seul et doit être enregistré avant
              d'obtenir l'accès au Club, comme décrit à l’article 6.c.
              <br />
              <strong>Basic-Fit :</strong> Basic-Fit France, une société par actions simplifiées au
              capital de 399.200.000 euros...
            </Typography>

            {/* Divider */}
            <Divider sx={{ my: 4 }} />

            {/* Article 2 */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              ARTICLE 2. DEVENIR MEMBRE ET ACCÈS – DROIT DE RÉTRACTATION
            </Typography>
            <Typography variant="body1" paragraph>
              a. Vous pouvez souscrire à un abonnement selon l’une des manières suivantes : sur le
              site internet de Basic-Fit, en complétant le formulaire d'inscription en ligne ; ou
              dans n’importe quel Club, en complétant le formulaire d'inscription sur l’une de nos
              Bornes Self-Service...
            </Typography>

            <Typography variant="body1" paragraph>
              b. Si vous vous inscrivez par le biais du site internet de Basic-Fit, vous avez le
              droit de vous rétracter, sans motivation, dans les 14 jours à compter de la date de
              votre inscription, par email à{" "}
              <a href="mailto:service.clientele@basic-fit.fr">
                service.clientele@basic-fit.fr
              </a>
              ...
            </Typography>

            {/* etc. Tu continues à copier/coller les autres articles du texte original ici */}
          </Paper>
        </Container>
      </Container>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default GeneralConditionsPage;
