"use client";

import { useEffect, useState } from "react";
import { Box, Button, Typography, Stack, Paper } from "@mui/material";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setOpen(true);
    }
  }, []);

  const handleConsent = (choice: "accepted" | "rejected") => {
    localStorage.setItem("cookie-consent", choice);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Paper
      elevation={6}
      sx={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: 500,
        p: 3,
        borderRadius: 3,
        backgroundColor: "white",
        zIndex: 1300,
      }}
    >
      <Stack spacing={2}>
        <Typography variant="body1">
          Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez accepter ou refuser.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleConsent("rejected")}
          >
            Refuser
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleConsent("accepted")}
          >
            Accepter
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
