// FeatureList.tsx
import React from "react";
import { Box } from "@mui/material";
import FeatureBox from "../atoms/FeatureBox";
import ContactBtn from "../atoms/ContactBtn";

export type FeatureListProps = {
  features: string[];
};

export const FeatureList: React.FC<FeatureListProps> = ({ features }) => (
  <Box
    sx={{
      overflow: "hidden",
      boxShadow: "0 12px 30px rgba(0,0,0,.2)",
      width: 650,   
      height : 735,   
      display: "flex",
      flexDirection: "column",
      gap: 0,
    }}
  >
    {features.map((f, i) => (
      <FeatureBox key={i}>{f}</FeatureBox>
    ))}
    <ContactBtn>Contacter</ContactBtn>
  </Box>
);

export default FeatureList;
