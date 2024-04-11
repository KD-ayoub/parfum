import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";


export default function AuthCard({title, signText, children}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flex: "1 1 auto",
        justifyContent: "center",
        padding: "12px",
      }}
    >
      <Card elevation={2} sx={{ width: 575, margin: "0 auto"}}>
          <CardContent sx={{ padding: { xs: "24px", md: "40px" } }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                fontFamily={"Public sans variable, sans-serif"}
                fontWeight={600}
              >
                {title}
              </Typography>
              <Typography
                component={Link}
                sx={{ textDecoration: "none", color: "#77B5FE" }}
                variant="body2"
                fontFamily={"Public sans variable, sans-serif"}
              >
                {signText}
              </Typography>
            </Box>
            { children }
          </CardContent>
      </Card>
    </Box>
  );
}
