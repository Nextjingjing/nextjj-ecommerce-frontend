import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { logout } from "../store/authSlice";
import { logout as apiLogout } from "../api/authApi";
import logo from "../assets/logo.svg";
import {
  Home,
  ShoppingCart,
  Info,
  User,
  LogOut,
  Menu,
  X,
  UserCircle2,
  ClipboardList,
} from "lucide-react";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const username = useSelector((state: RootState) => state.auth.username);
  const cartCount = useSelector(
    (state: RootState) =>
      state.cart.items?.reduce((sum, i) => sum + i.quantity, 0) || 0
  );

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(logout());
      navigate("/login");
      setMenuOpen(false);
      setUserMenuOpen(false);
    }
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4 relative">
        {/* โลโก้ */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3 hover:scale-105 transition-transform"
        >
          <img
            src={logo}
            alt="NextJJ Shop Logo"
            className="w-20 h-20 object-contain"
          />
          <span className="text-2xl font-extrabold text-blue-600">
            NextJJ <span className="text-gray-700">Shop</span>
          </span>
        </Link>

        {/* ปุ่มเมนูมือถือ */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* เมนูหลัก (Desktop) */}
        <div className="hidden md:flex space-x-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 text-lg font-medium transition ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-500"
              }`
            }
          >
            <Home size={20} />
            หน้าแรก
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative flex items-center gap-2 text-lg font-medium transition ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-500"
              }`
            }
          >
            <ShoppingCart size={20} />
            ตะกร้า
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center gap-2 text-lg font-medium transition ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-500"
              }`
            }
          >
            <Info size={20} />
            เกี่ยวกับเรา
          </NavLink>
        </div>

        {/* ผู้ใช้ (Desktop) */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {username ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full transition shadow-sm"
              >
                <User size={18} />
                {username}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transform transition-transform duration-300 ${
                    userMenuOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown ผู้ใช้ */}
              <div
                className={`absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 ${
                  userMenuOpen
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-3 invisible"
                }`}
              >
                <NavLink
                  to="/orders"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                >
                  <ClipboardList size={18} />
                  คำสั่งซื้อของฉัน
                </NavLink>

                <NavLink
                  to="/info"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                >
                  <UserCircle2 size={18} />
                  ข้อมูลของฉัน
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 text-left px-5 py-3 text-red-600 hover:bg-gray-100 transition"
                >
                  <LogOut size={18} />
                  ออกจากระบบ
                </button>
              </div>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition"
              >
                <User size={18} /> เข้าสู่ระบบ
              </NavLink>
              <NavLink
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full font-medium shadow transition"
              >
                สมัครสมาชิก
              </NavLink>
            </>
          )}
        </div>
      </nav>

      {/* เมนูมือถือ */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-inner flex flex-col space-y-2 px-4 pb-4 animate-slide-down">
          <NavLink
            to="/"
            end
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-gray-700 font-medium hover:text-blue-600 transition"
          >
            <Home size={18} /> หน้าแรก
          </NavLink>

          <NavLink
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-gray-700 font-medium hover:text-blue-600 transition relative"
          >
            <ShoppingCart size={18} /> ตะกร้า
            {cartCount > 0 && (
              <span className="absolute left-16 top-1 bg-red-500 text-white text-xs font-bold px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-gray-700 font-medium hover:text-blue-600 transition"
          >
            <Info size={18} /> เกี่ยวกับเรา
          </NavLink>

          <div className="border-t border-gray-200 pt-3 mt-2">
            {username ? (
              <>
                <span className="block text-gray-700 font-medium py-1 flex items-center gap-2">
                  <User size={18} /> {username}
                </span>

                {/* ✅ เพิ่มลิงก์คำสั่งซื้อในมือถือ */}
                <NavLink
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full bg-yellow-500 text-white py-2 rounded-lg text-center hover:bg-yellow-600 transition mt-2 flex items-center justify-center gap-2"
                >
                  <ClipboardList size={18} /> คำสั่งซื้อของฉัน
                </NavLink>

                <NavLink
                  to="/info"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full bg-blue-500 text-white py-2 rounded-lg text-center hover:bg-blue-600 transition mt-2 flex items-center justify-center gap-2"
                >
                  <UserCircle2 size={18} /> ข้อมูลของฉัน
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition mt-2 flex items-center justify-center gap-2"
                >
                  <LogOut size={18} /> ออกจากระบบ
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 py-2 text-gray-700 font-medium hover:text-blue-600 transition"
                >
                  <User size={18} /> เข้าสู่ระบบ
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-gray-700 font-medium hover:text-blue-600 transition"
                >
                  สมัครสมาชิก
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
