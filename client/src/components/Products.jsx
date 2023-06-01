import React, { memo, useEffect, useState } from "react";
import { Box, Button, Typography, styled, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../redux/slice/Cart";

const Products = ({ product, isCart, isOutOfStock }) => {
  const [isProductAlreadyInCart, setIsProductAlreadyInCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // Adding product to cartItems array
  const handleClick = () => {
    const quantity = product.quantity; // Get the current quantity value
    const productWithQuantity = {
      ...product,
      quantityAdded: 1,
      quantity: quantity - 1, // Decrease the quantity by 1
    };
    dispatch(
      setCartItems({
        cartItems: [...cartItems, productWithQuantity],
      })
    );
  };

  // Checking whether product is already present in cart or not
  useEffect(() => {
    const productPresent = cartItems.some((item) => item.id === product.id);
    setIsProductAlreadyInCart(productPresent);
  }, [cartItems]);

  return (
    <>
      {isCart ? (
        <CartProductWrapper>
          <CartImageContainer image={product.imageURL}></CartImageContainer>
        </CartProductWrapper>
      ) : (
        <Product data-isproductalreadyincart={isProductAlreadyInCart}>
          <ImageContainer image={product.imageURL}></ImageContainer>
          <Box className="product-name-container">
            <Typography className="product-name">{product.name}</Typography>
          </Box>
          <Box className="price-container">
            <Typography className="price">Rs {product.price}</Typography>
          </Box>
          <Box className="add-to-cart-btn-container">
            {isOutOfStock ? (
              <Typography>Out of stock</Typography>
            ) : (
              !isCart && (
                <Button
                  onClick={() => handleClick()}
                  className="add-to-cart-btn"
                  disabled={isProductAlreadyInCart}
                >
                  {isProductAlreadyInCart ? "Added to cart" : "Add to cart"}
                </Button>
              )
            )}
          </Box>
        </Product>
      )}
    </>
  );
};

export default memo(Products);

const ImageContainer = styled(Box)`
  height: 250px;
  width: 100%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const Product = styled(Box)`
  width: 80%;
  border-radius: 3px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
  box-shadow: 1px 1px 11px -6px rgba(10, 6, 6, 0.71);
  margin: auto;

  .product-name-container {
    width: 95%;
  }

  .price-container {
    width: 95%;
  }

  .product-name {
    font-size: 0.95rem;
    font-weight: 600;
  }

  .price {
    font-size: 0.9rem;
  }

  .add-to-cart-btn-container {
    width: 95%;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .add-to-cart-btn {
    width: 100%;
    border: 1px solid
      ${(props) =>
        props["data-isproductalreadyincart"]
          ? "rgba(0, 0, 0, 0.26)"
          : "rgb(25, 118, 210)"};
  }
`;

const CartImageContainer = styled(Box)`
  height: 80px;
  width: 80px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const CartProductWrapper = styled(Box)``;
