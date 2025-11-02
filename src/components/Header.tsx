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
  const [userMenuOpen, setUserMenuOpen] = useState(false); // ✅ dropdown user

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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4 relative">
        {/* โลโก้ */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          🛍️ NextJJ Shop
        </Link>

        {/* ปุ่ม hamburger (มือถือ) */}
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

        {/* เมนูหลัก (desktop) */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `font-medium ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`
            }
          >
            หน้าแรก
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `font-medium ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`
            }
          >
            ตะกร้า
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `font-medium ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`
            }
          >
            เกี่ยวกับเรา
          </NavLink>
        </div>

        {/* เมนูผู้ใช้ (desktop) */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {username ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition"
              >
                🤗 {username}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${
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

              {/* ✅ dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                  <NavLink
                    to="/info"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    ข้อมูลของฉัน
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
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
                className="font-medium text-gray-600 hover:text-blue-500"
              >
                เข้าสู่ระบบ
              </NavLink>
              <NavLink
                to="/register"
                className="font-medium text-gray-600 hover:text-blue-500"
              >
                สมัครสมาชิก
              </NavLink>
            </>
          )}
        </div>
      </nav>

      {/* เมนูมือถือ (เหมือนเดิม) */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-inner border-t border-gray-100 flex flex-col space-y-2 px-4 pb-4 animate-slide-down">
          <NavLink
            to="/"
            end
            onClick={() => setMenuOpen(false)}
            className="py-2 text-gray-700 font-medium hover:text-blue-600"
          >
            หน้าแรก
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="py-2 text-gray-700 font-medium hover:text-blue-600"
          >
            ตะกร้า
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="py-2 text-gray-700 font-medium hover:text-blue-600"
          >
            เกี่ยวกับเรา
          </NavLink>

          <div className="border-t border-gray-200 pt-2 mt-2">
            {username ? (
              <>
                <span className="block text-gray-700 font-medium py-1">
                  👋 {username}
                </span>
                <NavLink
                  to="/info"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full bg-green-500 text-white py-2 rounded-lg text-center hover:bg-green-600 transition"
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
                  className="block py-2 text-gray-700 font-medium hover:text-blue-600"
                >
                  เข้าสู่ระบบ
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-gray-700 font-medium hover:text-blue-600"
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
