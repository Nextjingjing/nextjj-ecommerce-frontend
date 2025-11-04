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
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Header />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/info" element={<UserInfoPage/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/orders" element={<OrdersPage/>}/>
          <Route path="/checkout" element={<CheckoutPage />}/>
        </Routes>
      </Router>
    </Elements>
  );
}

export default App;
