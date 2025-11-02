import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { logout } from "../store/authSlice";
import { logout as apiLogout } from "../api/authApi";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const username = useSelector((state: RootState) => state.auth.username);

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
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg shadow-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4 relative">
        {/* โลโก้ */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-blue-600 flex items-center gap-2 hover:scale-105 transition-transform"
          onClick={() => setMenuOpen(false)}
        >
          🛍️ NextJJ <span className="text-gray-700">Shop</span>
        </Link>

        {/* Hamburger menu (มือถือ) */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* เมนูหลัก (Desktop) */}
        <div className="hidden md:flex space-x-8">
          {[
            { to: "/", label: "หน้าแรก" },
            { to: "/cart", label: "ตะกร้า" },
            { to: "/about", label: "เกี่ยวกับเรา" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `text-lg font-medium transition ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 hover:text-blue-500"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* ผู้ใช้ */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {username ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full transition shadow-sm"
              >
                🤗 {username}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180" : ""
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

              {/* Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden animate-fade-in">
                  <NavLink
                    to="/info"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                  >
                    ข้อมูลของฉัน
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 text-red-600 hover:bg-gray-100 transition"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                เข้าสู่ระบบ
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
          {[
            { to: "/", label: "หน้าแรก" },
            { to: "/cart", label: "ตะกร้า" },
            { to: "/about", label: "เกี่ยวกับเรา" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              onClick={() => setMenuOpen(false)}
              className="py-2 text-gray-700 font-medium hover:text-blue-600 transition"
            >
              {item.label}
            </NavLink>
          ))}

          <div className="border-t border-gray-200 pt-3 mt-2">
            {username ? (
              <>
                <span className="block text-gray-700 font-medium py-1">
                  👋 {username}
                </span>
                <NavLink
                  to="/info"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full bg-blue-500 text-white py-2 rounded-lg text-center hover:bg-blue-600 transition"
                >
                  ข้อมูลของฉัน
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition mt-2"
                >
                  ออกจากระบบ
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-gray-700 font-medium hover:text-blue-600 transition"
                >
                  เข้าสู่ระบบ
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
