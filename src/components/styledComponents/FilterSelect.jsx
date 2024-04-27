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

export default function FilterSelect({ options, onChange }) {
  const buttonRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const [filter, setFilter] = useState(options[0]);
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
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (buttonRef.current) {
        if (
          e.target.outerText !== buttonRef.current.outerText &&
          e.target.outerText
        ) {
          // console.log('target..', e.target.outerText);
          // console.log('current..', buttonRef.current.outerText);
          setToggle(false);
        }
      }
    });
  }, []);
  return (
    <Box
      component={"div"}
      sx={{
        position: "relative",
        width: options[0] === "All" ? 190 : 90,
        maxWidth: "100%",
      }}
    >
      <StyledButton
        ref={buttonRef}
        onClick={() => {
          console.log("show..");
          setToggle((prev) => !prev);
        }}
      >
        {options[0] === "All" && <FilterAltIcon sx={{ color: "#898CA4" }} />}
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
        {options.map((option, index) => (
          <div key={index}>
            <ListItem sx={{ padding: 0 }}>
              <StyledListButton
                onClick={(e) => {
                  setFilter(e.target.outerText);
                  onChange(e.target.outerText);
                  setToggle((prev) => !prev);
                }}
              >
                {option}
              </StyledListButton>
            </ListItem>
            {index < options.length - 1 && (
              <Divider
                orientation="horizontal"
                sx={{ color: "#898CA4" }}
                flexItem
              />
            )}
          </div>
        ))}
      </StyledList>
    </Box>
  );
}
