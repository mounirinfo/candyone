"use client";

import { Box, Container, Typography } from "@mui/material";
import ClubCard from "../molecules/ClubssCard";

export default function ClubsSection() {
  return (
    <Box
      sx={{
        py: 24,
        backgroundImage: "url('/clubs-bg.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap", 
            gap: 35,
            px: 0, 
          }}
        >
          <Box  flex={1} minWidth={300} >
            <ClubCard
            
              address="1 AVENUE GEORGES POMPIDOU"
              city="95120 ERMONT"
              color="#ff90d4"
            />
          </Box>

          <Box flex={1} minWidth={300} sx={{ mt: 6 }}>
            <ClubCard
              address="258 BOULEVARD DU HAVRE"
              city="95120 ERMONT"
              color="#60c4ff"
            />
          </Box>
        </Box>

       <Typography
          variant="subtitle2"
          align="center"
          sx={{
            fontWeight: "bold",
            color: "white",
            fontSize: "1.2rem",
            letterSpacing: "1px",
          }}
        >
          PARTENAIRE OFFICIEL{" "}
          <Box component="span" sx={{ color: "#ffb400" }}>
BASIC-FIT          </Box>
        </Typography>
      </Container>
    </Box>
  );
}
