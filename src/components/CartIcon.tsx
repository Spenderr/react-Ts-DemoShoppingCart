import React, { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";
import CartDropdown from "./CartDropdown";
import { ShoppingCart } from "lucide-react";
import "./CartIcon.css";

export default function CartIcon() {
  const { cartItems } = useCart();
  const [open, setOpen] = useState(false);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const CLOSE_DELAY_MS = 700;

  // delayed close refs (unchanged)
  const closeTimeoutRef = useRef<number | null>(null);
  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };
  const handleMouseEnter = () => {
    clearCloseTimeout();
    setOpen(true);
  };
  const handleMouseLeave = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpen(false);
      closeTimeoutRef.current = null;
    }, CLOSE_DELAY_MS);
  };
  useEffect(() => {
    return () => clearCloseTimeout();
  }, []);

  /* --- badge animation logic --- */
  const prevCountRef = useRef<number>(itemCount);
  const [bump, setBump] = useState(false);
  const [direction, setDirection] = useState<"inc" | "dec" | "none">("none");
  const animTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const prev = prevCountRef.current;
    if (prev === itemCount) return;

    setDirection(itemCount > prev ? "inc" : "dec");
    setBump(true);

    // clear previous timeout if any
    if (animTimeoutRef.current) {
      window.clearTimeout(animTimeoutRef.current);
    }

    animTimeoutRef.current = window.setTimeout(() => {
      setBump(false);
      setDirection("none");
      animTimeoutRef.current = null;
    }, 400); // match with CSS animation length

    prevCountRef.current = itemCount;

    // cleanup if component unmounts while anim running
    return () => {
      if (animTimeoutRef.current) {
        window.clearTimeout(animTimeoutRef.current);
        animTimeoutRef.current = null;
      }
    };
  }, [itemCount]);

  return (
    <div
      className="cp-cart-icon-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-haspopup="true"
      aria-expanded={open}
    >
      <div className="cp-cart-icon" aria-hidden>
        <ShoppingCart size={28} />
        {itemCount > 0 && (
          <span
            className={`cp-cart-badge ${bump ? "bump" : ""} ${
              direction === "inc" ? "inc" : direction === "dec" ? "dec" : ""
            }`}
            aria-live="polite"
            aria-atomic="true"
          >
            {itemCount}
          </span>
        )}
      </div>

      {/* Render dropdown only while hovered/open */}
      {open && <CartDropdown />}
    </div>
  );
}
