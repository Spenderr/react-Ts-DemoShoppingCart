import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // example: 10% tax
  const total = subtotal + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Order placed successfully!");
    clearCart();
  };

  return (
    <div className="cp-checkout-page">
  <div className="cp-checkout-card">
    <h1>Checkout</h1>

    {/* CART SUMMARY */}
    <div className="mb-6">
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/" className="text-blue-500">Go shopping</Link></p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <div className="totals">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Tax (10%): ${tax.toFixed(2)}</p>
          <p className="total-amount">Total: ${total.toFixed(2)}</p>
        </div>
      )}
    </div>

    {/* CHECKOUT FORM */}
    {cartItems.length > 0 && (
      <form onSubmit={handleCheckout} className="space-y-4">
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Address" required />
        <select required>
          <option value="">Select Payment Method</option>
          <option value="card">Credit/Debit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cod">Cash on Delivery</option>
        </select>
        <button type="submit">Place Order</button>
      </form>
    )}
  </div>
</div>

  );
}
