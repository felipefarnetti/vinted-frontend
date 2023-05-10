import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";
// Component
import Header from "./components/Header";
import CheckoutForm from "./components/CheckoutForm";

function App() {
  const [token, setToken] = useState(Cookies.get("vintedToken") || null);
  // state pour la recherche
  const [search, setSearch] = useState("");
  const handleTokenAndId = (token, id) => {
    if (token && id) {
      setToken(token);
      Cookies.set("vintedToken", token, { expires: 6, sameSite: "Strict" });
      Cookies.set("vintedId", id, { expires: 6, sameSite: "strict" });
    } else {
      setToken(null);
      Cookies.remove("vintedToken");
      Cookies.remove("vintedId");
    }
  };

  return (
    <Router>
      <Header
        handleTokenAndId={handleTokenAndId}
        token={token}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/offer/:id" element={<Offer token={token} />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route
          path="/payment"
          element={
            <Payment token={token} handleTokenAndId={handleTokenAndId} />
          }
        />
        <Route
          path="/signup"
          element={<Signup handleTokenAndId={handleTokenAndId} />}
        />
        <Route
          path="/login"
          element={<Login handleTokenAndId={handleTokenAndId} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
