"use client";

import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import Link from "next/link";

export default function NavigationBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const links = ["Nos clubs", "Les confiseries", "Les coachs"];

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error("Erreur fetch user:", err);
      setUser(null);
    }
  };
  fetchUser();
}, []);


  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setUser(null);
    } catch (err) {
      console.error("Erreur déconnexion :", err);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #7deaf1, #4dd7e0)",
          boxShadow: "none",
          height: "60px",
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 2, sm: 6 },
            justifyContent: "space-between",
            height: "100%",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                backgroundColor: "black",
                color: "white",
                px: 1.5,
                py: 0.5,
                letterSpacing: "4px",
                fontSize: "1.4rem",
              }}
            >
              CANDY
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "black",
                fontSize: "1.4rem",
                ml: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              B
              <Image
                src="/sucette.png"
                alt="Candy Logo"
                width={35}
                height={35}
                style={{ margin: "0 4px" }}
              />
              DY
            </Typography>
          </Box>

          {/* Links Desktop */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 10,
            }}
          >
            {links.map((link) => (
              <Typography
                key={link}
                sx={{
                  fontFamily: '"Brush Script MT", "Comic Sans MS", cursive',
                  fontSize: "2.5rem",
                  fontWeight: 100,
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                  "&:hover": { color: "#ffb3f5" },
                }}
              >
                {link}
              </Typography>
            ))}
          </Box>

          {/* Boutons conditionnels */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {!user ? (
              <>
                <Link href="/login" passHref>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                      "&:hover": { borderColor: "#ff66cc", color: "#ff66cc" },
                    }}
                  >
                    SE CONNECTER
                  </Button>
                </Link>
                <Link href="/checkout" passHref>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#ff66cc",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      letterSpacing: "2px",
                      color: "white",
                      borderRadius: 0,
                      px: 3,
                      py: 1,
                      height: "60%",
                      "&:hover": { backgroundColor: "#e755b5" },
                    }}
                  >
                    S’INSCRIRE
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/profile" passHref>
                  <Button
                    sx={{
                      backgroundColor: "white",
                      color: "#4dd7e0",
                      fontWeight: "bold",
                      px: 3,
                      "&:hover": { backgroundColor: "#d6f7f9" },
                    }}
                  >
                    Bonjour, {user.email?.split("@")[0]}
                  </Button>
                </Link>
                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{
                    borderColor: "white",
                    color: "white",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    "&:hover": { borderColor: "#ff4d4d", color: "#ff4d4d" },
                  }}
                >
                  SE DÉCONNECTER
                </Button>
              </>
            )}
          </Box>

          {/* Menu Mobile */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { sm: "none" }, ml: 1 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer Mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 260, p: 2 }} role="presentation">
          <List>
            {links.map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      sx: {
                        fontFamily: '"Dancing Script", cursive',
                        fontSize: "1.5rem",
                        color: "#53d0fc",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            {!user ? (
              <>
                <ListItem disablePadding>
                  <Link href="/login" passHref>
                    <ListItemButton
                      sx={{
                        mt: 2,
                        py: 1.5,
                        border: "2px solid #53d0fc",
                        justifyContent: "center",
                      }}
                    >
                      <ListItemText
                        primary="SE CONNECTER"
                        primaryTypographyProps={{
                          sx: {
                            fontWeight: "bold",
                            color: "#53d0fc",
                            textAlign: "center",
                            letterSpacing: "2px",
                          },
                        }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href="/checkout" passHref>
                    <ListItemButton
                      sx={{ mt: 2, py: 1.5, backgroundColor: "#ff66cc" }}
                    >
                      <ListItemText
                        primary="S’INSCRIRE"
                        primaryTypographyProps={{
                          sx: {
                            fontWeight: "bold",
                            color: "white",
                            textAlign: "center",
                            letterSpacing: "2px",
                          },
                        }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem disablePadding>
                  <Link href="/profile" passHref>
                    <ListItemButton sx={{ mt: 2, py: 1.5 }}>
                      <ListItemText
                        primary={`Bonjour, ${user.email?.split("@")[0]}`}
                        primaryTypographyProps={{
                          sx: {
                            fontWeight: "bold",
                            color: "#53d0fc",
                            textAlign: "center",
                          },
                        }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={handleLogout}
                    sx={{
                      mt: 2,
                      py: 1.5,
                      border: "2px solid red",
                      justifyContent: "center",
                    }}
                  >
                    <ListItemText
                      primary="SE DÉCONNECTER"
                      primaryTypographyProps={{
                        sx: {
                          fontWeight: "bold",
                          color: "red",
                          textAlign: "center",
                          letterSpacing: "2px",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
