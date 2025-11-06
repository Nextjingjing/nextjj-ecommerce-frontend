import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // ✅ สำคัญมาก เพื่อให้ cookie JWT + XSRF ถูกส่งไปกลับได้
});

// ✅ preload CSRF token เมื่อสร้าง instance
async function ensureCsrfToken() {
  const token = Cookies.get("XSRF-TOKEN");
  if (!token) {
    console.log("🔄 โหลด CSRF token ใหม่จาก backend...");
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/security/token`, {
        withCredentials: true,
      });
      console.log("✅ โหลด CSRF token สำเร็จ");
    } catch (err) {
      console.warn("❌ โหลด CSRF token ไม่สำเร็จ:", err);
    }
  }
}

// ✅ interceptor สำหรับแนบ CSRF token อัตโนมัติ
api.interceptors.request.use(
  async (config) => {
    const method = config.method?.toUpperCase();

    // 🔄 ตรวจสอบก่อนว่า token มีไหม ถ้าไม่มี → preload ใหม่
    if (["POST", "PUT", "DELETE", "PATCH"].includes(method || "")) {
      let csrfToken = Cookies.get("XSRF-TOKEN");
      if (!csrfToken) {
        await ensureCsrfToken(); // preload จาก backend
        csrfToken = Cookies.get("XSRF-TOKEN");
      }

      if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] = csrfToken;
        console.log("🛡️ แนบ X-XSRF-TOKEN:", csrfToken);
      } else {
        console.warn("⚠️ ไม่พบ XSRF-TOKEN ใน cookie หลัง preload");
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
