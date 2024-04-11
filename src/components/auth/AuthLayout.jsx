import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import Logo from "../../assets/svg/Logo.svg";
import backGroundBlur from "../../assets/svg/blurBackground.svg";
import AuthFooter from './AuthFooter';

export default function AuthLayout({ children }) {
  return (
    <Box>
      <Box className="container-blur-bg">
        <img className="blur-bg" src={backGroundBlur} alt="background blur" />
      </Box>
      <Box paddingTop={2} paddingLeft={2}>
        <img src={Logo} alt="logo" />
      </Box>
      <Grid item xs={12} container justifyContent="center" alignItems="center">
        <Container>
          <Box
            sx={{
              minHeight: {
                xs: "calc(100vh - 80px)",
                sm: "calc(100vh - 80px)",
                md: "calc(100vh - 120px)",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            { children }
          </Box>
        </Container>
        <Grid item xs={12}>
          <AuthFooter />
        </Grid>
      </Grid>
    </Box>
  )
}
