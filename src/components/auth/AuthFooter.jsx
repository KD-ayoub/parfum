import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function AuthFooter() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: { xs: "center", md: "space-between" },
        flexDirection: { xs: 'column', md: 'row' }
      }}
    >
      <Box sx={{ marginBottom: { xs: 4, md: 0 } }}>
        <Typography component="p" sx={{color: "#8C8C8C", fontSize: 12}}>
          This site is protected by
          <Typography
            component={Link}
            variant="body1"
            sx={{ textDecoration: "none", color: "#77B5FE", fontSize: 12}}
          >
            {" Privacy Policy"}
          </Typography>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Typography
          component={Link}
          sx={{
            marginX: 4,
            marginBottom: { xs: 4, md: 0 },
            textDecoration: "none",
            color: "#8C8C8C",
            fontSize: 12,
          }}
        >
          Terms and Conditions
        </Typography>
        <Typography
          component={Link}
          sx={{
            marginX: 4,
            marginBottom: { xs: 4, md: 0 },
            textDecoration: "none",
            color: "#8C8C8C",
            fontSize: 12,
          }}
        >
          Privacy Policy
        </Typography>
        <Typography component={Link} sx={{ textDecoration: "none", color: "#8C8C8C", fontSize: 12}}>
          CA Privacy Notice
        </Typography>
      </Box>
    </Container>
  );
}
