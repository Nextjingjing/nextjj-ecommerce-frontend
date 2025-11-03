import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import RegisterPage from "./pages/RegisterPage";
import UserInfoPage from "./pages/UserInfoPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import OrdersPage from "./pages/OrdersPage";
import { Toaster } from "react-hot-toast";


function App() {
  return (
      <Router>
        <Header />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/info" element={<UserInfoPage/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/orders" element={<OrdersPage/>}/>
        </Routes>
      </Router>
  );
}

export default App;
