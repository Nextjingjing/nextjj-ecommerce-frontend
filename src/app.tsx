import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import RegisterPage from "./pages/RegisterPage";
import UserInfoPage from "./pages/UserInfoPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import OrdersPage from "./pages/OrdersPage";
import CheckoutPage from "./pages/CheckoutPage";
import { Toaster } from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// 🧭 Admin pages
import ProductPage from "./pages/admin/ProductPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";

import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import axios from "./api/axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  useEffect(() => {
    axios.get("/api/security/token").catch(() =>
      console.warn("โหลด CSRF token ไม่สำเร็จ")
    );
  }, []);
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Header />
        <Toaster position="top-right" />
        <Routes>
          {/* 🌐 Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/info" element={<UserInfoPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* 🔒 Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="ROLE_ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product"
            element={
              <ProtectedRoute requiredRole="ROLE_ADMIN">
                <ProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute requiredRole="ROLE_ADMIN">
                <AdminOrdersPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Elements>
  );
}

export default App;
