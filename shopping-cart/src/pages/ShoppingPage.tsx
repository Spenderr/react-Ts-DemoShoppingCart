import React from "react";
import ProductsList from "../components/productList";
import CartIcon from "../components/CartIcon";

const ShoppingPage: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Cart icon on top-left */}
      <CartIcon />

      {/* Page title */}
      <h1 style={{ marginBottom: "20px" }}>Shop Products</h1>

      {/* Products grid centered */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <ProductsList />
      </div>
    </div>
  );
};

export default ShoppingPage;
