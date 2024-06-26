import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import debounce from "lodash/debounce";

export default function SearchBar({ searchValue, onChange }) {
  const [focus, setFocus] = useState(true);
  const searchRef = useRef();
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#F1F5F9",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9D9EA1",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "#9D9EA1",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "40ch",
      },
    },
  }));
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (searchRef.current) {
        if (e.target !== searchRef.current.firstChild) {
          console.log("current-1", e.target);
          console.log("current-2", searchRef.current.firstChild);
          setFocus(false);
        } else {
          console.log('current-3', searchRef.current.autofocus)
          // searchRef.current.autofocus = true;
        }
      }
    });
  }, []);
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        ref={searchRef}
        autoFocus={focus}
        value={searchValue ? searchValue : ""}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => {
          // setInput(e.target.value);
          // e.preventDefault();
          console.log(e.target.value);
          console.log("trigered");
          // debounce(() => onChange(e.target.value), 300);
          // searchRef.current.autofocus = true;
          onChange(e.target.value);
          setFocus(true);
        }}
      />
    </Search>
  );
}
