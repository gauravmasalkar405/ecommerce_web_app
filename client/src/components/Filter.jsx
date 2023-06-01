import React, { useState, memo } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  styled,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  setColorFilter,
  setGenderFilter,
  setPriceFilter,
  setTypeFilter,
} from "../redux/slice/filter";
import { useEffect } from "react";

const Filter = () => {
  const dispatch = useDispatch();
  // State variables for selected options
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);

  // Gender change
  const handleGenderChange = (event) => {
    const { value, checked } = event.target;
    setSelectedGender((prevSelectedGender) => {
      if (checked) {
        return [...prevSelectedGender, value];
      } else {
        return prevSelectedGender.filter((gender) => gender !== value);
      }
    });
  };

  // Dispatch gender filter to store
  useEffect(() => {
    dispatch(
      setGenderFilter({
        gender: selectedGender,
      })
    );
  }, [selectedGender, dispatch]);

  // Color change
  const handleColorChange = (event) => {
    const { value, checked } = event.target;
    setSelectedColor((prevSelectedColor) => {
      if (checked) {
        return [...prevSelectedColor, value];
      } else {
        return prevSelectedColor.filter((color) => color !== value);
      }
    });
  };

  // Dispatch color filter to store
  useEffect(() => {
    dispatch(
      setColorFilter({
        color: selectedColor,
      })
    );
  }, [selectedColor, dispatch]);

  // Type change
  const handleTypeChange = (event) => {
    const { value, checked } = event.target;
    setSelectedType((prevSelectedType) => {
      if (checked) {
        return [...prevSelectedType, value];
      } else {
        return prevSelectedType.filter((type) => type !== value);
      }
    });
  };

  // Dipatch type to store
  useEffect(() => {
    dispatch(
      setTypeFilter({
        type: selectedType,
      })
    );
  }, [selectedType, dispatch]);

  // Price change
  const handlePriceChange = (event) => {
    const { value, checked } = event.target;
    setSelectedPrice((prevSelectedPrice) => {
      if (checked) {
        return [...prevSelectedPrice, value];
      } else {
        return prevSelectedPrice.filter((price) => price !== value);
      }
    });
  };

  // Dispatch price to store
  useEffect(() => {
    dispatch(
      setPriceFilter({
        price: selectedPrice,
      })
    );
  }, [selectedPrice, dispatch]);

  return (
    <FilterWrapper>
      <Box className="gender-container">
        {/* Gender selection */}
        <FormControl component="fieldset">
          <FormLabel component="legend" className="filter-title">
            Gender
          </FormLabel>
          <FormGroup column>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedGender.includes("Women")}
                  onChange={handleGenderChange}
                  value="Women"
                />
              }
              label={<span style={{ fontSize: "0.9rem" }}>Women</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedGender.includes("Men")}
                  onChange={handleGenderChange}
                  value="Men"
                />
              }
              label={<span style={{ fontSize: "0.9rem" }}>Men</span>}
            />
          </FormGroup>
        </FormControl>
      </Box>
      <Box>
        {/* Color selection */}
        <FormControl component="fieldset">
          <FormLabel component="legend" className="filter-title">
            Color
          </FormLabel>
          <FormGroup column>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedColor.includes("Grey")}
                  onChange={handleColorChange}
                  value="Grey"
                />
              }
              label={<span style={{ fontSize: "0.9rem" }}>Grey</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedColor.includes("Blue")}
                  onChange={handleColorChange}
                  value="Blue"
                />
              }
              label={<span style={{ fontSize: "0.9rem" }}>Blue</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedColor.includes("Black")}
                  onChange={handleColorChange}
                  value="Black"
                />
              }
              label={<span style={{ fontSize: "0.9rem" }}>Black</span>}
            />
          </FormGroup>
        </FormControl>
      </Box>
      <Box>
        {/* Type selection */}
        <FormControl component="fieldset">
          <FormLabel component="legend" className="filter-title">
            Type
          </FormLabel>
          <FormGroup column>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedType.includes("Polo")}
                  onChange={handleTypeChange}
                  value="Polo"
                />
              }
              label={<span style={{ fontSize: "0.9rem" }}>Polo</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedType.includes("Hoodie")}
                  onChange={handleTypeChange}
                  value="Hoodie"
                />
              }
              label={<span style={{ fontSize: "0.9rem" }}>Hoodie</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedType.includes("Basic")}
                  onChange={handleTypeChange}
                  value="Basic"
                />
              }
              label={<span style={{ fontSize: "0.9rem" }}>Basic</span>}
            />
          </FormGroup>
        </FormControl>
      </Box>
      <Box>
        {/* Price selection */}
        <FormControl component="fieldset">
          <FormLabel component="legend" className="filter-title">
            Price
          </FormLabel>
          <FormGroup column>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedPrice.includes("250")}
                  onChange={handlePriceChange}
                  value="250"
                />
              }
              label={<span style={{ fontSize: "0.9rem" }}>Rs 0-250</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedPrice.includes("450")}
                  onChange={handlePriceChange}
                  value="450"
                />
              }
              label={<span style={{ fontSize: "0.9rem" }}>Rs 251-450</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedPrice.includes("451")}
                  onChange={handlePriceChange}
                  value="451"
                />
              }
              label={<span style={{ fontSize: "0.9rem" }}>Rs 450+</span>}
            />
          </FormGroup>
        </FormControl>
      </Box>
    </FilterWrapper>
  );
};

export default memo(Filter);

const FilterWrapper = styled(Box)`
  background-color: #ebebeb;
  width: 80%;
  height: max-content;
  border-radius: 3px;
  padding: 10px;

  .filter-title {
    font-size: 0.95rem;
    font-weight: 600;
  }

  .filter-label {
    font-size: 0.9rem;
  }
`;
