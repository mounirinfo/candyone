import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function HeroSection() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#d0f7ff",
        px: { xs: 2, md: 8 },
        py: { xs: 6, md: 10 },
        position: "relative",
        overflow: "hidden",
        minHeight: "500px", 
      }}
    >
      <Box sx={{ maxWidth: "50%", zIndex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Box
            sx={{
              width: 100, 
              height: 150, 
              background: "url(/silhouette.png) no-repeat center",
              backgroundSize: "contain",
              mr: 3,
            }}
          />
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "black",
                letterSpacing: "2px",
              }}
            >
              BODY
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "white",
                backgroundColor: "black",
                px: 1.5,
                borderRadius: "4px",
              }}
            >
              CANDY
            </Typography>
          </Box>
        </Box>

        {/* Texte principal */}
        <Box
          sx={{
            display: "inline-block",
            background: "linear-gradient(90deg, #53d0fc 0%, #53fceb 100%)",
            px: 4, 
            py: 1.5, 
            borderRadius: "60px",
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "3rem" }, 
              fontWeight: "bold",
              color: "#ffb6fa", // Rose
              letterSpacing: "3px",
              textAlign: "center",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            DÉCOUVREZ
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: { xs: "3rem", md: "4.5rem" }, 
            fontWeight: "bold",
            color: "#ffb6fa",
            textShadow: "0 0 10px #ffb6fa, 0 0 20px #ffb6fa, 0 0 30px #ff69b4",
            mb: 3,
          }}
        >
          CANDY ONE
        </Typography>

        {/* Prix */}
        <Typography
          sx={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: { xs: "1.5rem", md: "2.2rem" }, // Agrandi
            color: "white",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
            mb: 3,
          }}
        >
          À partir de 9,99€/4 semaines
        </Typography>
      </Box>

      {/* Colonne droite (image découpée) */}
      <Box
        sx={{
          width: "55%", // Augmenté pour coller à droite
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          display: { xs: "none", md: "block" },
          clipPath: "polygon(40% 0%, 100% 0%, 100% 100%, 40% 100%, 0% 50%)", // 60% gauche visible
          background: "linear-gradient(135deg, #ff8cd7 0%, #d0f7ff 100%)",
          border: "15px solid #d0f7ff", // Contour plus large
          borderRadius: "30px", // Plus grand
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <Image
          src="/image2.png"
          alt="Candy Body Hero"
          width={1000} // Agrandi
          height={800} // Agrandi
          style={{
            borderRadius: "30px",
            objectFit: "contain",
            transform: "scale(1.2)", // Ajusté pour remplir
          }}
        />
      </Box>
    </Box>
  );
}