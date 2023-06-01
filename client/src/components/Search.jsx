import React, { useState } from "react";
import { Box, InputBase, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/slice/filter";

const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  // Dispatch searchTerm to store
  const handleChange = (e) => {
    setSearch(e.target.value);
    dispatch(
      setSearchTerm({
        searchTerm: e.target.value,
      })
    );
  };

  return (
    <SearchBar>
      <InputBase
        className="input-field"
        placeholder="Search Amazon.in"
        value={search}
        onChange={(e) => handleChange(e)}
        sx={{ border: "1px solid black" }}
      />
    </SearchBar>
  );
};

const SearchBar = styled(Box)`
  width: 100%;

  .input-field {
    width: 100%;
    border: none;
    padding-left: 10px;
    font-size: 0.8rem;
    font-weight: 600;
    color: black;
  }
`;

export default Search;
