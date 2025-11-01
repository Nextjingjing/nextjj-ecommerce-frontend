import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logout as apiLogout } from "../api/authApi";

export default function Header() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.error(err);
    } finally {
      logout();
      navigate("/login");
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🛍️ NextJJ Shop
        </Link>

        <div className="flex space-x-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `font-medium ${
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }`
            }
          >
            หน้าแรก
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `font-medium ${
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }`
            }
          >
            ตะกร้า
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `font-medium ${
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
              }`
            }
          >
            เกี่ยวกับเรา
          </NavLink>
        </div>

        <div className="flex items-center space-x-4">
          {username ? (
            <>
              <span className="text-gray-700 font-medium">
                👋 สวัสดี, {username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                ออกจากระบบ
              </button>
            </>
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
    </header>
  );
}
