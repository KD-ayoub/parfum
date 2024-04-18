import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FullScreen from "../../components/main/FullScreen";
import SearchBar from "../../components/main/SearchBar";
import Logo from "../../components/main/Logo";
import FilterSelect from "../../components/styledComponents/FilterSelect";

export default function Dashboard() {
  return (
    <>
      <AppBar position="static" elevation={1}>
        <Container sx={{ backgroundColor: "white" }} maxWidth={"2000px"}>
          <Toolbar disableGutters>
            <Logo />
            <SearchBar />
            <FullScreen />
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        component={"main"}
        sx={{
          height: "calc(100vh - 64px)",
          bgcolor: "#F3F6FA",
          overflowY: "auto",
          padding: 4,
        }}
      >
        <Box sx={{ bgcolor: "white", borderRadius: 2, margin: 4, padding: 3}}>
          <Box>
            <FilterSelect options={['All', 'Tracked', 'Untracked']}/>
            <FilterSelect options={['20', '50', '100']}/>
          </Box>
        </Box>
      </Box>
    </>
  );
}
