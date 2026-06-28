import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Home from "./pages/Home";
import Success from "./pages/Success";
import Failed from "./pages/Failed";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment-success" element={<Success />} />
          <Route path="/payment-failed" element={<Failed />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;