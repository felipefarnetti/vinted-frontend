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

function App() {
  const [token, setToken] = useState(Cookies.get("vintedToken") || null);
  // state pour la recherche
  const [search, setSearch] = useState("");
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("vintedToken", token, { expires: 6 });
    } else {
      setToken(null);
      Cookies.remove("vintedToken");
    }
  };

  return (
    <Router>
      <Header
        handleToken={handleToken}
        token={token}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/offer/:id" element={<Offer token={token} />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment token={token} />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
