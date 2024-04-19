import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FullScreen from "../../components/main/FullScreen";
import SearchBar from "../../components/main/SearchBar";
import Logo from "../../components/main/Logo";
import FilterSelect from "../../components/styledComponents/FilterSelect";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ImageTest from "../../assets/Images/Rectangle40777.png";
import LinkPng from "../../assets/Images/linkPng.png";
import AntSwitch from "../../utils/main/AntSwitch";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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
        <Box sx={{ bgcolor: "white", borderRadius: 2, margin: 2, padding: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <FilterSelect options={["All", "Tracked", "Untracked"]} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography variant="body1" color={"#898CA4"}>
                Items shown
              </Typography>
              <FilterSelect options={["20", "50", "100"]} />
            </Box>
          </Box>
        </Box>
        <Box sx={{ margin: 2 }}>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ bgcolor: "#f5f6fa" }}
          >
            <Table
              sx={{
                minWidth: 1200,
                borderCollapse: "separate",
                borderSpacing: "0 18px",
                borderRadius: "15px",
              }}
            >
              <tr style={{ border: "hidden" }}>
                <TableCell component={"th"} align="center">
                  <Typography variant="h6">Image</Typography>
                </TableCell>
                <TableCell component={"th"} align="center">
                  <Typography variant="h6">Name</Typography>
                </TableCell>
                <TableCell component={"th"} align="center">
                  <Typography variant="h6">Stock</Typography>
                </TableCell>
                <TableCell component={"th"} align="center">
                  <Typography variant="h6">Vendor</Typography>
                </TableCell>
                <TableCell component={"th"} align="center">
                  <Typography variant="h6">Price</Typography>
                </TableCell>
                <TableCell component={"th"} align="center">
                  <Typography variant="h6">Tracked</Typography>
                </TableCell>
                <TableCell component={"th"} align="center">
                  <Typography variant="h6">Last Fetch</Typography>
                </TableCell>
                <TableCell component={"th"} align="center">
                  <Typography variant="h6">Last Update</Typography>
                </TableCell>
                <TableCell component={"th"} align="center">
                  <Typography variant="h6">Link</Typography>
                </TableCell>
              </tr>
              <tr
                key={rows[0].name}
                className="style-table"
                style={{ backgroundColor: "white", borderRadius: "15rem" }}
              >
                <TableCell component={"td"} align="left">
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={ImageTest} />
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ maxWidth: "200px" }}
                  component={"td"}
                  align="center"
                >
                  <Typography
                    component={"p"}
                    variant="subtitle1"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title="Donna Born In Roma Eau de Parfum 1.7 oz/ 50 mL"
                  >
                    Donna Born In Roma Eau de Parfum 1.7 oz/ 50 mL
                  </Typography>
                </TableCell>
                <TableCell component={"td"} align="center">
                  <Typography
                    sx={{
                      height: 30,
                      bgcolor: "#DDF1DD",
                      borderRadius: "20px",
                    }}
                    variant="subtitle1"
                    color={"#42AF43"}
                  >
                    In Stock
                  </Typography>
                </TableCell>
                <TableCell component={"td"} align="center">
                  <Typography variant="subtitle1" sx>
                    Sephora
                  </Typography>
                </TableCell>
                <TableCell component={"td"} align="center">
                  <Typography variant="subtitle1" sx>
                    $135.00
                  </Typography>
                </TableCell>
                <TableCell component={"td"} align="center">
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <AntSwitch
                      id=""
                      // checked={exampleSettings.settings.stock.stock_to_out}
                      // onChange={handlStockToOut}
                    />
                  </Box>
                </TableCell>
                <TableCell component={"td"} align="center">
                  <Typography variant="subtitle1" sx>
                    2days ago
                  </Typography>
                </TableCell>
                <TableCell component={"td"} align="center">
                  <Typography variant="subtitle1" sx>
                    16hours ago
                  </Typography>
                </TableCell>
                <TableCell component={"td"} align="center">
                  <img src={LinkPng} alt="link png" />
                </TableCell>
              </tr>
              {/* <Box>sgsdgsdgdgsd</Box> */}
              
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
