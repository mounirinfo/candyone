"use client";

import { Box, Typography, Button, Paper } from "@mui/material";

interface ClubCardProps {
  address: string;
  city: string;
  color: string;
}

export default function ClubCard({ address, city, color }: ClubCardProps) {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 6,
        pb: 4,
        borderRadius: 16, 
        maxWidth: 800,
        width: 700, 
        height: 300,
        textAlign: "center",
        bgcolor: "white",
        position: "relative",
        overflow: "visible",
        border: `8px solid ${color}`,
      }}
    >
      <Typography
        variant="h3" 
        sx={{ fontWeight: "bold", mb: 3 }} 
      >
        <Box
          component="span"
          sx={{
            bgcolor: "black",
            color: "white",
            px: 2,
            borderRadius: 1,
            mr: 1,
          }}
        >
          CANDY
        </Box>
        <Box component="span" sx={{ color: "black" }}>
          B
        </Box>
        <Box
          component="span"
          sx={{ color: color, fontWeight: "bold" }}
        >
          🍭
        </Box>
        <Box component="span" sx={{ color: "black" }}>
          DY
        </Box>
      </Typography>

      <Typography
        variant="h5" 
        sx={{ color: color, fontWeight: "600", mb: 2 }}
      >
        {address}
      </Typography>

      <Typography variant="h6" sx={{ color: "black", fontWeight: "bold", mb: 4 }}>
        {city}
      </Typography>

      <Button
        variant="contained"
        sx={{
          bgcolor: "#000000ff", 
          color: color,
          borderRadius: "30px",
          px: 6, 
          py: 2, 
          fontSize: "1.2rem",
          fontWeight: "bold",
          "&:hover": { bgcolor: color, opacity: 0.9 },
          border: `2px solid ${color}`,
          position: "absolute",
          bottom: -25, 
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Choisir ce club
      </Button>
    </Paper>
  );
}