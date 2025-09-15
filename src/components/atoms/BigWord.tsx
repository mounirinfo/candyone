import { Typography, styled, TypographyProps } from "@mui/material";

const BigWord = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  display: "inline-block",
  fontWeight: 100,
  fontSize: 80,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "#fec7fa",
  fontFamily: "Impact, sans-serif",
  textShadow: `
    0 0 10px rgba(244, 56, 150, 1),
    0 0 20px rgba(255, 14, 135, 0.98),
    0 0 30px rgba(235, 150, 215, 1)
  `,
  width: "auto",
  maxWidth: "100%",
  whiteSpace: "nowrap",
}));

export default BigWord;
