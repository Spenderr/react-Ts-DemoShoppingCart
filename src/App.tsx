import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingPage from "./pages/ShoppingPage";

import Checkout from "./components/Checkout";

export default function App() {
  return (
    <Router>
      <div>
        {/* Fixed cart icon + dropdown (top-left) */}


        {/* Routes */}
        <Routes>
          <Route path="/" element={<ShoppingPage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}
