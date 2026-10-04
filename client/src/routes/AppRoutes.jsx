import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import ProductEntry from "../pages/ProductEntry/ProductEntry";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product-entry" element={<ProductEntry />} />
    </Routes>
  );
}

export default AppRoutes;