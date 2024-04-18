import React from "react";
import Typography from "@mui/material/Typography";

export default function Logo() {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          color: "#0958D9",
          fontWeight: 700,
          fontSize: "1.25rem",
          letterSpacing: ".2rem",
          display: { xs: "none", sm: "block" },
        }}
      >
        FRAGRANCES
      </Typography>
      <Typography
        variant="h1"
        sx={{
          color: "#0958D9",
          fontWeight: 700,
          fontSize: "1.25rem",
          letterSpacing: ".2rem",
          display: { xs: "block", sm: "none" },
          mr: 2,
        }}
      >
        FRG
      </Typography>
    </>
  );
}
