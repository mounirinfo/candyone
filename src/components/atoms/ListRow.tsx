"use client";

import { Stack, styled } from "@mui/material";

const ListRow = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2, 3),
  color: "#fff",
}));

export default ListRow;