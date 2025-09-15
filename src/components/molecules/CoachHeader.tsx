"use client";

import React from "react";
import { Stack } from "@mui/material";
import OutlineTitle from "../atoms/OutlineTitle";
import SubOutline from "../atoms/SubOutline";

export const CoachHeader: React.FC<{ name: string; role: string }> = ({ name, role }) => (
  <Stack spacing={0.5}>
    <OutlineTitle>{name}</OutlineTitle>
    <SubOutline>{role}</SubOutline>
  </Stack>
);

export default CoachHeader;