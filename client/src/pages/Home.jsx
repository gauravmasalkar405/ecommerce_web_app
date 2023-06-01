import React, { useEffect, useState } from "react";
import { Box, IconButton, styled, useMediaQuery } from "@mui/material";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import ProductWrapper from "../components/ProductWrapper";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slice/products";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const Home = () => {
  const dispatch = useDispatch();

  const [isFilterButtonClicked, setIsFilterButtonClicked] = useState(false);

  // Media querries
  const isMobileScreen = useMediaQuery("(max-width: 480px)");

  // fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <HomeWrapper data-ismobilescreen={isMobileScreen}>
      {/* navbar */}
      <Box className="navbar-container">
        <Navbar />
      </Box>
      <Box className="filter-and-products-container">
        {isMobileScreen ? (
          <Box className="filter-and-icon-btn-container">
            <IconButton
              className="filter-icon-button"
              onClick={() => setIsFilterButtonClicked(!isFilterButtonClicked)}
            >
              <FilterAltOutlinedIcon style={{ fontSize: "2rem" }} />
            </IconButton>
            {isFilterButtonClicked && <Filter />}
          </Box>
        ) : (
          <Box className="filter-container">
            <Filter />
          </Box>
        )}
        <Box className="product-container">
          <ProductWrapper />
        </Box>
      </Box>
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled(Box)`
  .navbar-container {
    margin-bottom: 1.5rem;
  }

  .filter-and-products-container {
    display: flex;
  }

  .filter-container {
    width: 30%;
    display: flex;
    justify-content: center;
  }

  .product-container {
    padding-top: 5px;
    position: relative;
    width: ${(prop) => (prop["data-ismobilescreen"] ? "100%" : "70%")};
    overflow: scroll;
    height: calc(100vh - 4rem - 1.5rem);
  }

  .filter-and-icon-btn-container {
    position: absolute;
    z-index: 2;
    width: 50%;
  }

  .filter-icon-button {
  }
`;
