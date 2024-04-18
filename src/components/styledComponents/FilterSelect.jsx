import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import "./style.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function FilterSelect({ options }) {
  const [toggle, setToggle] = useState(false);
  const [filter, setFilter] = useState("All");
  const StyledButton = styled(Button)({
    width: "100%",
    textTransform: "none",
    fontSize: "1.15rem",
    backgroundColor: "#f5f6fa",
    padding: "0.5em 1em",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#caced1",
    borderRadius: "1rem",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });
  const StyledList = styled(List)({
    position: "absolute",
    listStyle: "none",
    width: "100%",
    backgroundColor: "#f5f6fa",
    border: "1px solid #caced1",
    borderRadius: "1rem",
    padding: "10px",
    marginTop: "10px",
    maxHeight: "200px",
    transition: "0.5s ease",
    scale: 1,
    opacity: toggle ? 1 : 0,
    visibility: toggle ? "visible" : "hidden",
  });

  const StyledListButton = styled(ListItemButton)({
    color: "#898CA4",
    fontFamily: "public sans variable",
    fontWeight: 600,
  });
  return (
    <Box
      component={"div"}
      sx={{ position: "relative", width: 190, maxWidth: "100%" }}
      >
      <StyledButton
        role="combobox"
        aria-labelledby="select button"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="select-dropdown"
        onClick={() => {
          setToggle((prev) => !prev);
        }}
      >
        <FilterAltIcon sx={{ color: "#898CA4" }} />
        <Box
          component={"span"}
          sx={{ textAlign: "left", color: "#898ca4", fontWeight: 600 }}
        >
          {filter}
        </Box>
        <Divider orientation="vertical" sx={{ color: "#898CA4" }} flexItem />
        <Box
          component={"span"}
          sx={{
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderTop: "8px solid #898ca4",
            rotate: toggle && "180deg",
          }}
        ></Box>
      </StyledButton>
      <StyledList>
        <ListItem sx={{ padding: 0 }}>
          <StyledListButton
            onClick={(e) => {
              setFilter(e.target.outerText);
              setToggle((prev) => !prev);
            }}
          >
            All
          </StyledListButton>
        </ListItem>
        <Divider orientation="horizontal" sx={{ color: "#898CA4" }} flexItem />
        <ListItem sx={{ padding: 0 }}>
          <StyledListButton
            onClick={(e) => {
              setFilter(e.target.outerText);
              setToggle((prev) => !prev);
            }}
          >
            Tracked
          </StyledListButton>
        </ListItem>
        <Divider orientation="horizontal" sx={{ color: "#898CA4" }} flexItem />
        <ListItem sx={{ padding: 0 }}>
          <StyledListButton
            onClick={(e) => {
              setFilter(e.target.outerText);
              setToggle((prev) => !prev);
            }}
          >
            Untracked
          </StyledListButton>
        </ListItem>
      </StyledList>
    </Box>
  );
}
