"use client";

import Header from "@/components/organismes/Header";
import Footer from "@/components/organismes/Footer";
import {
  Box,
  Typography,
  Container,
  Divider,
  Paper,
} from "@mui/material";

const LegalMentionsPage = () => {
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* PAGE CONTENT */}
      <Container
        maxWidth={false}
        sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", p: 0 }}
      >
        {/* HERO */}
        <Box
          sx={{
            position: "relative",
            height: "350px",
            backgroundImage: "url(/.jpg)", // 👉 mets une image légale (par ex. balance de justice)
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
            <Typography
              variant="h2"
              sx={{ fontWeight: "bold", letterSpacing: 2 }}
            >
              MENTIONS LÉGALES
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Informations légales relatives au site CandyBody.
            </Typography>
          </Box>
        </Box>

        {/* CONTENT */}
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
            {/* Section 1 */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              ÉDITEUR DU SITE
            </Typography>
            <Typography variant="body1" paragraph>
              Le site internet{" "}
              <a
                href="http://www.candybody.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.candybody.com
              </a>{" "}
              est édité par la société CandyBody France, société par actions
              simplifiée, immatriculée au Registre du commerce et des sociétés de
              Lille Métropole, dont le siège social est situé 7 rue des
              Précurseurs, 59290 Wasquehal, France.
              <br />
              Numéro de TVA intracommunautaire : FR2798233011
              <br />
              Adresse e-mail :{" "}
              <a href="mailto:contact@candybody.com">
                contact@candybody.com
              </a>
            </Typography>

            <Divider sx={{ my: 4 }} />

            {/* Section 2 */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              HÉBERGEMENT
            </Typography>
            <Typography variant="body1" paragraph>
              Le site est hébergé par : Salesforce Commerce Cloud Platform, SFDC
              Netherlands B.V., Gustav Mahlerlaan 2970, 1081 LA Amsterdam –
              Pays-Bas. <br />
              Tél. : +31 (0)30-7671000 <br />
              Site internet :{" "}
              <a
                href="https://www.salesforce.com/eu"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.salesforce.com/eu
              </a>
            </Typography>

            <Divider sx={{ my: 4 }} />

            {/* Section 3 */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              LÉGISLATION APPLICABLE
            </Typography>
            <Typography variant="body1" paragraph>
              Le site{" "}
              <a
                href="http://www.candybody.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.candybody.com
              </a>{" "}
              est régi par le droit français. Les présentes mentions légales
              peuvent être modifiées à tout moment, sans préavis. Il est donc
              recommandé de les consulter régulièrement.
            </Typography>

            <Divider sx={{ my: 4 }} />

            {/* Section 4 */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              PROPRIÉTÉ INTELLECTUELLE
            </Typography>
            <Typography variant="body1" paragraph>
              L’ensemble des éléments accessibles sur le site (textes, images,
              graphismes, logo, icônes, sons, logiciels, bases de données, ainsi
              que la structure générale) est la propriété exclusive de CandyBody
              ou fait l’objet d’un droit d’utilisation concédé. Toute
              reproduction, représentation, modification, publication,
              transmission, dénaturation, totale ou partielle du site ou de ses
              éléments, sans autorisation écrite préalable, est interdite et
              constitue une contrefaçon sanctionnée par le Code de la propriété
              intellectuelle.
            </Typography>

            <Divider sx={{ my: 4 }} />

            {/* Section 5 */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              RESPONSABILITÉ
            </Typography>
            <Typography variant="body1" paragraph>
              CandyBody s’efforce de fournir des informations aussi précises que
              possible sur le site. Toutefois, aucune garantie n’est donnée quant
              à l’exactitude, la complétude ou l’actualité des informations
              publiées. L’accès au site peut être interrompu pour des raisons
              techniques ou de maintenance. CandyBody ne saurait être tenue
              responsable des interruptions ou conséquences pouvant en découler.
            </Typography>
            <Typography variant="body1" paragraph>
              L’utilisateur reconnaît utiliser le site sous sa seule
              responsabilité. CandyBody ne pourra être tenue responsable des
              dommages directs ou indirects résultant de l’utilisation du site ou
              des sites tiers accessibles via des liens hypertextes.
            </Typography>
          </Paper>
        </Container>
      </Container>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default LegalMentionsPage;
