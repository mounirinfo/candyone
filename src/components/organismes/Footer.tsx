"use client";

import React from "react";
import { AppBar, Box, Typography, Link } from "@mui/material";
import { Email, Phone, LocationOn, Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 1,
    flex: 1,
    minWidth: 200,
  };

  return (
    <AppBar
      position="static"
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor: "#7cd3f2ff",
        boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.2)",
        py: 4,
      }}
    >
      <Box sx={{ px: { xs: 2, sm: 6 }, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {/* Colonne 1 - Logo + Brand */}
        <Box sx={columnStyle}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <img src="/logo.png" alt="CandyBody logo" style={{ height: 148 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "white",
                textShadow: "2px 2px 4px black",
                fontSize: "1.5rem",
              }}
            >
              CandyBody
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "white", opacity: 0.9, fontSize: "1rem", textShadow: "1px 1px 2px black" }}>
            Discover a sweet way to stay fit and healthy with CandyBody. Join our community today!
          </Typography>
        </Box>

        {/* Colonne 2 - Quick Links */}
        <Box sx={columnStyle}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "white", textShadow: "2px 2px 4px black", mb: 2 }}>
            🔗 Quick Links
          </Typography>
          {[
            { href: "/", label: "Home" },
            { href: "/", label: "About Us" },
            { href: "/", label: "Pricing" },
            { href: "/", label: "Schedule" },
            { href: "/", label: "Contact" },
          ].map((item, i) => (
            <Link key={i} href={item.href} color="inherit" underline="none" sx={{ mb: 1, fontSize: "1.1rem", opacity: 0.9, "&:hover": { opacity: 1, color: "#fb9ef5", textDecoration: "underline" } }}>
              {item.label}
            </Link>
          ))}
        </Box>

        {/* Colonne 3 - Services */}
        <Box sx={columnStyle}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "white", textShadow: "2px 2px 4px black", mb: 2 }}>
            💪 Services
          </Typography>
          {[
            { href: "#", label: "Workout Plans" },
            { href: "#", label: "Group Classes" },
            { href: "#", label: "Personal Training" },
            { href: "#", label: "Nutrition Coaching" },
            { href: "#", label: "Fitness Assessment" },
          ].map((item, i) => (
            <Link key={i} href={item.href} color="inherit" underline="none" sx={{ mb: 1, fontSize: "1.1rem", opacity: 0.9, "&:hover": { opacity: 1, color: "#fb9ef5", textDecoration: "underline" } }}>
              {item.label}
            </Link>
          ))}
        </Box>

        {/* Colonne 4 - Contact */}
        <Box sx={columnStyle}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "white", textShadow: "2px 2px 4px black", mb: 2 }}>
            📞 Contact Us
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <LocationOn fontSize="small" />
            <Typography variant="body2" sx={{ color: "white", fontSize: "1.1rem" }}>
              123 Sweet Street, Candy City
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Email fontSize="small" />
            <Typography variant="body2" sx={{ color: "white", fontSize: "1.1rem" }}>
              info@candybody.com
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Phone fontSize="small" />
            <Typography variant="body2" sx={{ color: "white", fontSize: "1.1rem" }}>
              Mon - Fri: 8am - 9pm
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "white", fontSize: "1.1rem" }}>
            Sat - Sun: 9am - 6pm
          </Typography>

          <Box display="flex" gap={2} mt={2}>
            <Link href="https://facebook.com" color="inherit"><Facebook sx={{ color: "white", "&:hover": { color: "#fb9ef5" } }} /></Link>
            <Link href="https://twitter.com" color="inherit"><Twitter sx={{ color: "white", "&:hover": { color: "#fb9ef5" } }} /></Link>
            <Link href="https://instagram.com" color="inherit"><Instagram sx={{ color: "white", "&:hover": { color: "#fb9ef5" } }} /></Link>
          </Box>
        </Box>
      </Box>

      {/* Copyright */}
      <Box textAlign="center" sx={{ pt: 3, borderTop: "1px solid rgba(255,255,255,0.2)" }}>
        <Typography variant="body2" sx={{ color: "white", fontSize: "1rem", opacity: 0.9 }}>
          © {currentYear} CandyBody. All rights reserved.
        </Typography>
      </Box>
    </AppBar>
  );
};

export default Footer;
