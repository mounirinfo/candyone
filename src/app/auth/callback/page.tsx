"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseBrowserClient";
import { Box, CircularProgress, Typography, Alert } from "@mui/material";

export default function AuthCallback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        console.log("🔍 Traitement du callback OAuth...");
        
        // ✅ Récupérer les tokens depuis le hash (flow implicit)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        console.log("📋 Paramètres reçus:", {
          hasAccessToken: !!accessToken,
          hasRefreshToken: !!refreshToken,
        });

        // Si pas de tokens, essayer de récupérer la session existante
        if (!accessToken) {
          console.log("🔄 Tentative de récupération de session existante...");
          
          const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError || !sessionData.session) {
            console.error("❌ Aucune session trouvée:", sessionError);
            setError("Aucune session d'authentification trouvée");
            setTimeout(() => router.replace("/login"), 2000);
            return;
          }

          console.log("✅ Session existante trouvée");
          const user = sessionData.session.user;
          await handleUserRedirection(user);
          return;
        }

        // ✅ Créer la session avec les tokens du hash
        console.log("🔐 Création de la session avec les tokens...");
        
        const { data, error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || "",
        });

        if (sessionError || !data.session) {
          console.error("❌ Erreur création de session:", sessionError);
          setError("Échec de la création de session");
          setTimeout(() => router.replace("/login"), 2000);
          return;
        }

        const user = data.session.user;
        console.log("✅ Session créée avec succès pour:", user.email);

        // Traiter la redirection de l'utilisateur
        await handleUserRedirection(user);

      } catch (err) {
        console.error("💥 Erreur inattendue:", err);
        setError("Une erreur est survenue lors de la connexion");
        setTimeout(() => router.replace("/login"), 2000);
      } finally {
        setLoading(false);
      }
    };

    const handleUserRedirection = async (user: any) => {
      try {
        // Vérifier si c'est un employé
        const { data: employe, error: employeError } = await supabase
          .from("employe")
          .select("id, role")
          .eq("auth_id", user.id)
          .maybeSingle();

        if (employeError) {
          console.error("⚠️ Erreur vérification employé:", employeError);
        }

        // Redirection selon le rôle
        if (employe) {
          console.log("👤 Employé détecté, rôle:", employe.role);
          router.replace("/dashboard");
        } else {
          console.log("👤 Client détecté");

          // ✅ Vérifier si le profil client existe dans la table CLIENT
          const { data: client, error: clientError } = await supabase
            .from("client")
            .select("*")
            .eq("auth_id", user.id)
            .maybeSingle();

          // ✅ Créer le profil CLIENT si nécessaire
          if (!client && !clientError) {
            console.log("📝 Création du profil client...");
            
            // Extraire nom et prénom depuis user_metadata ou full_name
            const fullName = user.user_metadata?.full_name || user.user_metadata?.name || "";
            const nameParts = fullName.split(" ");
            const prenom = nameParts[0] || "";
            const nom = nameParts.slice(1).join(" ") || nameParts[0] || "";

            const { error: insertError } = await supabase.from("client").insert({
              auth_id: user.id,
              email: user.email,
              prenom: prenom,
              nom: nom,
              role: "client",
              statut: "ACTIF",
              date_inscription: new Date().toISOString(),
            });

            if (insertError) {
              console.error("⚠️ Erreur création profil:", insertError);
            } else {
              console.log("✅ Profil client créé avec succès");
            }
          } else if (client) {
            console.log("✅ Profil client existant trouvé");
          }

          router.replace("/profile");
        }
      } catch (err) {
        console.error("💥 Erreur lors de la redirection:", err);
        router.replace("/profile");
      }
    };

    handleOAuthCallback();
  }, [router]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        background: "linear-gradient(135deg, #fff5fb 0%, #ffe6f3 100%)",
        padding: 3,
      }}
    >
      {error ? (
        <>
          <Alert
            severity="error"
            sx={{
              maxWidth: "500px",
              borderRadius: 2,
            }}
          >
            {error}
          </Alert>
          <Typography variant="body2" color="text.secondary">
            Redirection vers la page de connexion...
          </Typography>
        </>
      ) : (
        <>
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: "#ff66cc",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              background: "linear-gradient(135deg, #ff66cc, #ff99dd)",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {loading ? "Connexion avec Google en cours..." : "Redirection..."}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Veuillez patienter, nous configurons votre compte
          </Typography>
        </>
      )}
    </Box>
  );
}