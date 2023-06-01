import React, { useEffect, useState } from "react";
import { Box, styled, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Products from "./Products";

const ProductWrapper = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Media querries
  const isMobileScreen = useMediaQuery("(max-width: 480px)");
  const isTabletScreen = useMediaQuery("(max-width: 920px)");

  // State from Redux
  const fetchedProducts = useSelector((state) => state.products.data);
  const isLoading = useSelector((state) => state.products.isLoading);

  // Filter values from Redux
  const color = useSelector((state) => state.filter.color);
  const gender = useSelector((state) => state.filter.gender);
  const type = useSelector((state) => state.filter.type);
  const price = useSelector((state) => state.filter.price);
  const searchTerm = useSelector((state) => state.filter.searchTerm);

  useEffect(() => {
    // Filtering logic based on various filters

    // Step 1: Initialize products with fetched products
    let products = fetchedProducts;

    // Step 2: Apply filtering based on search term
    if (searchTerm.length > 0) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      products = products.filter((product) =>
        product.name.toLowerCase().includes(lowercaseSearchTerm)
      );
    }

    // Step 3: Apply filtering based on color
    if (color.length > 0) {
      products = products.filter((product) => color.includes(product.color));
    }

    // Step 4: Apply filtering based on gender
    if (gender.length > 0) {
      products = products.filter((product) => gender.includes(product.gender));
    }

    // Step 5: Apply filtering based on type
    if (type.length > 0) {
      products = products.filter((product) => type.includes(product.type));
    }

    // Step 6: Apply filtering based on price
    if (price.length > 0) {
      products = products.filter((product) => {
        const productPrice = product.price;

        return (
          (price.includes("250") && productPrice < 251) ||
          (price.includes("450") &&
            productPrice >= 251 &&
            productPrice <= 450) ||
          (price.includes("451") && productPrice > 450)
        );
      });
    }

    // Update the filtered products state
    setFilteredProducts(products);
  }, [color, gender, type, price, searchTerm, fetchedProducts]);

  return (
    <ProductContainer
      data-istabletscreen={isTabletScreen}
      data-ismobilescreen={isMobileScreen}
    >
      {!isLoading &&
        filteredProducts &&
        filteredProducts.map((product, index) => {
          return <Products key={index} product={product} isCart={false} />;
        })}
    </ProductContainer>
  );
};

export default ProductWrapper;

const ProductContainer = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) =>
    props["data-ismobilescreen"]
      ? "repeat(1, 1fr)"
      : props["data-istabletscreen"]
      ? "repeat(2, 1fr)"
      : "repeat(3, 1fr)"};
  row-gap: 2rem;
`;
