"use client";

import React from "react";
import { Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BulletRow from "./BulletRow";

const Lime = "#9cff57";

export const BulletItem: React.FC<{ text: string; strong?: boolean }> = ({ text, strong }) => (
  <BulletRow>
    <CheckCircleIcon sx={{ color: Lime }} />
    <Typography sx={{ color: "#fff", fontWeight: strong ? 900 : 600 }}>{text}</Typography>
  </BulletRow>
);

export default BulletItem;