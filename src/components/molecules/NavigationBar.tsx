"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { label: "Nos clubs", href: "/checkout", type: "link" },
    { label: "Les confiseries", href: "#confiseries", type: "scroll" },
    { label: "Les coachs", href: "#coachs", type: "scroll" },
  ];

  // ✅ Fonction pour récupérer l'utilisateur
  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
        cache: "no-store", // ✅ Empêcher le cache
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      });

      if (!res.ok) {
        console.log("❌ Pas d'utilisateur connecté");
        setUser(null);
        setRole(null);
        return;
      }

      const data = await res.json();
      console.log("✅ Utilisateur chargé:", data.user);
      
      setUser(data.user);
      setRole(data.user.role);
    } catch (err) {
      console.error("❌ Erreur fetch user:", err);
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Charger l'utilisateur au montage ET à chaque changement de route
  useEffect(() => {
    fetchUser();
  }, [pathname]); // ✅ Recharger quand la route change

  // ✅ Déconnexion améliorée
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { // ✅ Bon chemin
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        // ✅ Nettoyer l'état local
        setUser(null);
        setRole(null);

        // ✅ Nettoyer le localStorage
        localStorage.clear();
        sessionStorage.clear();

        // ✅ Nettoyer les cookies côté client
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
        });

        // ✅ Redirection forcée avec reload
        window.location.href = "/";
      } else {
        console.error("❌ Erreur déconnexion:", await res.text());
      }
    } catch (err) {
      console.error("❌ Erreur déconnexion:", err);
      // Rediriger quand même
      window.location.href = "/";
    }
  };

  const handleNavClick = (link: { href: string; type: string }) => {
    if (link.type === "link") {
      router.push(link.href);
    } else if (link.type === "scroll") {
      const el = document.querySelector(link.href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push("/" + link.href);
      }
    }
    setDrawerOpen(false);
  };

  const buttonStyles = {
    width: "200px",
    height: "40px",
    fontWeight: "bold",
    letterSpacing: "1px",
    fontSize: "1rem",
  };

  // ✅ Afficher un état de chargement pour éviter le flash
  const displayName = loading 
    ? "..." 
    : user 
      ? `${user.prenom || "Utilisateur"} ${user.nom || ""}`.trim()
      : "";

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
          {/* Logo → Home */}
          <Link href="/" passHref>
            <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
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
          </Link>

          {/* Links Desktop */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 10,
            }}
          >
            {navLinks.map((link) => (
              <Typography
                key={link.label}
                onClick={() => handleNavClick(link)}
                sx={{
                  cursor: "pointer",
                  fontFamily: '"Brush Script MT", "Comic Sans MS", cursive',
                  fontSize: "2.5rem",
                  fontWeight: 100,
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                  "&:hover": { color: "#ffb3f5" },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Box>

          {/* Boutons conditionnels */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {!user && !loading ? (
              <>
                <Link href="/login" passHref>
                  <Button
                    variant="outlined"
                    sx={{
                      ...buttonStyles,
                      borderColor: "white",
                      color: "white",
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
                      ...buttonStyles,
                      backgroundColor: "#ff66cc",
                      color: "white",
                      borderRadius: 0,
                      "&:hover": { backgroundColor: "#e755b5" },
                    }}
                  >
                    S'INSCRIRE
                  </Button>
                </Link>
              </>
            ) : user ? (
              <>
                <Button
                  sx={{
                    backgroundColor: "white",
                    color: "#4dd7e0",
                    fontWeight: "bold",
                    px: 3,
                    "&:hover": { backgroundColor: "#d6f7f9" },
                  }}
                  onClick={() =>
                    router.push(role === "client" ? "/profile" : "/dashboard")
                  }
                >
                  Bonjour, {displayName}
                </Button>
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
            ) : null}
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
            {navLinks.map((link) => (
              <ListItem key={link.label} disablePadding>
                <ListItemButton onClick={() => handleNavClick(link)}>
                  <ListItemText
                    primary={link.label}
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
            {/* Boutons auth mobile */}
            {!user && !loading ? (
              <>
                <ListItem disablePadding>
                  <Link href="/login" passHref>
                    <ListItemButton
                      sx={{
                        mt: 2,
                        py: 1.5,
                        border: "2px solid #53d0fc",
                        justifyContent: "center",
                        ...buttonStyles,
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
                      sx={{
                        mt: 2,
                        py: 1.5,
                        backgroundColor: "#ff66cc",
                        ...buttonStyles,
                      }}
                    >
                      <ListItemText
                        primary="S'INSCRIRE"
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
            ) : user ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ mt: 2, py: 1.5 }}
                    onClick={() =>
                      router.push(role === "client" ? "/profile" : "/dashboard")
                    }
                  >
                    <ListItemText
                      primary={`Bonjour, ${displayName}`}
                      primaryTypographyProps={{
                        sx: {
                          fontWeight: "bold",
                          color: "#53d0fc",
                          textAlign: "center",
                        },
                      }}
                    />
                  </ListItemButton>
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
            ) : null}
          </List>
        </Box>
      </Drawer>
    </>
  );
}