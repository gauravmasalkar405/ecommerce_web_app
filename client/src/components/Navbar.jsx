import React from "react";
import {
  Box,
  IconButton,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const number_of_itmes_in_cart = cartItems.length;

  // Media querries
  const isMobileScreen = useMediaQuery("(max-width: 480px)");
  const isTabletScreen = useMediaQuery("(max-width: 920px)");

  return (
    <NavbarWrapper
      data-istabletscreen={isTabletScreen}
      data-ismobilescreen={isMobileScreen}
    >
      <Typography className="store-title">amazon.in</Typography>
      <Box className="search-bar-container">
        <Box className="search-bar">
          <Search />
        </Box>
        <Box className="search-icon">
          <SearchIcon />
        </Box>
      </Box>
      <Box className="products-bag-container">
        <Box className="icon-container">
          <Box className="number-of-cart-items-container">
            <Typography className="number-of-cart-items">
              {number_of_itmes_in_cart}
            </Typography>
          </Box>
          <IconButton onClick={() => navigate("/cart")}>
            <LocalMallIcon sx={{ color: "white", fontSize: "1.8rem" }} />
          </IconButton>
        </Box>
      </Box>
    </NavbarWrapper>
  );
};

export default Navbar;

const NavbarWrapper = styled(Box)`
  width: "100%";
  height: 4rem;
  background-color: rgb(15, 17, 17);
  color: white;
  padding: ${(prop) =>
    prop["ismobilescreen"]
      ? "0px 5px"
      : prop["data-istabletscreen"]
      ? "0px 20px"
      : "0px 50px"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: "1rem";

  .store-title {
    font-size: ${(prop) => (prop["data-ismobilescreen"] ? "1rem" : "1.8rem")};
    font-weight: 600;
  }

  .search-bar-container {
    display: flex;
    width: ${(prop) =>
      prop["data-ismobilescreen"]
        ? "50%"
        : prop["data-istabletscreen"]
        ? "400px"
        : "600px"};
  }

  .search-bar {
    background-color: white;
    padding: 3px;
    border-radius: 5px 0px 0px 5px;
    display: flex;
    align-items: center;
    width: calc(100% - 45px);
  }

  .search-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    background-color: rgb(254, 189, 105);
    height: 38px;
    width: 45px;
    border-radius: 0px 5px 5px 0px;
    cursor: pointer;
  }

  .products-bag-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .icon-container {
    position: relative;
  }

  .number-of-cart-items-container {
    background-color: #dd2d2d;
    position: absolute;
    border-radius: 50%;
    height: 18px;
    width: 18px;
    top: -2px;
    color: white;
    z-index: 2;
    left: -1px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .number-of-cart-items {
    font-size: 0.8rem;
    margin-right: 2px;
    margin-top: 2px;
  }
`;
