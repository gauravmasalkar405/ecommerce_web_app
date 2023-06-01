import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Products from "./Products";
import { useSelector } from "react-redux";
import { setCartItems, setCartTotal } from "../redux/slice/Cart";
import { useDispatch } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CartProducts = ({ product }) => {
  const dispatch = useDispatch();
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);

  // Function to handle adding an item to the cart
  const handleAddItem = () => {
    if (product.quantity > 0) {
      const updatedProduct = {
        ...product,
        quantity: product.quantity - 1,
        quantityAdded: product.quantityAdded + 1,
      };

      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? updatedProduct : item
      );

      setIsOutOfStock(false);

      dispatch(setCartItems({ cartItems: updatedCartItems }));
    } else {
      setIsOutOfStock(true);
    }
  };

  // Function to handle removing an item from the cart
  const handleRemoveItem = () => {
    if (product.quantityAdded > 0) {
      const updatedProduct = {
        ...product,
        quantity: product.quantity + 1,
        quantityAdded: product.quantityAdded - 1,
      };

      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? updatedProduct : item
      );

      setIsOutOfStock(false);
      dispatch(setCartItems({ cartItems: updatedCartItems }));
    } else {
      setIsOutOfStock(false);
    }
  };

  const deleteFromCart = () => {
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    dispatch(
      setCartItems({
        cartItems: updatedCartItems,
      })
    );
  };

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total = total + cartItems[i].quantityAdded * cartItems[i].price;
    }

    dispatch(
      setCartTotal({
        cartTotal: total,
      })
    );
  }, [cartItems]);

  return (
    <CartProductWrapper>
      <Box className="product-image-info-container">
        {/* Render the product information */}
        <Box className="product-image">
          <Products
            product={product}
            isCart={true}
            isOutOfStock={isOutOfStock}
          />
        </Box>
        <Box className="product-name-and-price-container">
          <Typography className="product-name">{product.name}</Typography>
          <Typography className="price">Rs {product.price}</Typography>
        </Box>
      </Box>
      <Box className="counter-and-remove-btn-container">
        <Box className="counter-container">
          <IconButton
            onClick={() => handleRemoveItem()}
            sx={{ color: "rgb(25, 118, 210)" }}
          >
            <RemoveIcon />
          </IconButton>
          {/* Display the quantity added */}
          <Typography className="product-count">
            {product.quantityAdded}
          </Typography>
          {/* Button to add an item */}
          <IconButton
            onClick={() => handleAddItem()}
            sx={{ color: "rgb(50, 209, 72) " }}
          >
            <AddIcon />
          </IconButton>
        </Box>
        {/* Button to remove an item */}
        <IconButton
          onClick={() => deleteFromCart()}
          sx={{ color: "rgb(219, 27, 27)" }}
        >
          <DeleteOutlineIcon style={{ color: "rgb(219, 27, 27)" }} />
        </IconButton>
      </Box>
    </CartProductWrapper>
  );
};

export default CartProducts;

const CartProductWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 10px 20px;
  box-shadow: 1px 1px 11px -6px rgba(10, 6, 6, 0.71);

  .product-image-info-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .product-name {
    font-size: 0.95rem;
    font-weight: 600;
  }

  .price {
    font-size: 0.9rem;
  }

  .counter-and-remove-btn-container {
    display: flex;
    gap: 0.8rem;
  }

  .product-count {
    font-size: 0.9rem;
  }

  .counter-container {
    display: flex;
    align-items: center;
  }
`;
