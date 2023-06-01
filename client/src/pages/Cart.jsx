import React from "react";
import { Box, Typography, styled, useMediaQuery } from "@mui/material";
import CartProducts from "../components/CartProducts";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  // Media querries
  const isMobileScreen = useMediaQuery("(max-width: 480px)");
  const isTabletScreen = useMediaQuery("(max-width: 920px)");

  return (
    <CartWrapper
      data-ismobilescreen={isMobileScreen}
      data-istabletscreen={isTabletScreen}
    >
      <Box>
        {cartItems.length > 0 &&
          cartItems.map((product, index) => {
            return <CartProducts key={index} product={product} />;
          })}
      </Box>
      <Box className="cart-total-container">
        <Typography className="total-amount-text">Total Amount</Typography>
        <Typography className="total-amount-text">Rs {cartTotal}</Typography>
      </Box>
    </CartWrapper>
  );
};

export default Cart;

const CartWrapper = styled(Box)`
  width: ${(prop) =>
    prop["data-ismobilescreen"]
      ? "90%"
      : prop["data-istabletscreen"]
      ? "80%"
      : "60%"};

  margin: 3rem auto;

  .cart-total-container {
    padding: 10px 20px;
    box-shadow: 1px 1px 11px -6px rgba(10, 6, 6, 0.71);
    display: flex;
    justify-content: space-between;
  }

  .total-amount-text {
    font-size: 0.95rem;
    font-weight: 600;
  }
`;
