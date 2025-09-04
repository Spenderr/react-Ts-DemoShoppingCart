import React from "react";
import { useCart } from "../context/CartContext";
import "./CartDropdown.css";
import { Link } from "react-router-dom";

export default function CartDropdown() {
  const { cartItems, addToCart, deductFromCart } = useCart();

  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cp-cart-dropdown" role="menu" aria-label="Cart dropdown">
      {cartItems.length === 0 ? (
        <p className="cp-empty">Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cp-cart-item-card">
              <img src={item.image} alt={item.title} />
              <div className="cp-item-info">
                <p className="cp-title">{item.title}</p>
                <p className="cp-price">${item.price}</p>
              </div>

              <div className="cp-qty">
                <button onClick={() => deductFromCart(item.id)}>-</button>
                <span className="cp-qty-value">{item.quantity}</span>
                <button onClick={() => addToCart(item)}>+</button>
              </div>
            </div>
          ))}

       <div className="cp-cart-footer">
  <Link
    to="/checkout"
    className="cp-checkout-btn"
  >
    Checkout
  </Link>

  <span className="cp-total">Total: ${grandTotal.toFixed(2)}</span>
</div>

        </>
      )}
    </div>
  );
}
