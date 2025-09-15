import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#f50057" },
    background: {
      default: "#f6f8fb",
      paper: "#ffffff",
    },
    text: {
      primary: "#121212",
      secondary: "#5a5a5a",
    },
    // exemple d'extension de palette
    // neutral: { main: "#64748B" },
  },
  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Arial",
      "sans-serif",
    ].join(","),
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 12, paddingInline: 16 },
      },
    },
  },
});