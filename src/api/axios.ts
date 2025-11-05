import axios from "axios";

// 🔹 สร้าง instance ของ axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // สำคัญมาก เพื่อส่ง cookie JSESSIONID
});

// 🔹 โหลด token จาก /security/token หนึ่งครั้งก่อนทำ POST/PUT/DELETE
let csrfToken: string | null = null;

const fetchCsrfToken = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/security/token`, {
      withCredentials: true,
    });
    csrfToken = res.data.token;
    // console.log("🔑 CSRF Token Loaded:", csrfToken);
  } catch (err) {
    console.error("❌ โหลด CSRF token ไม่สำเร็จ", err);
  }
};

// 🔹 interceptor ก่อนส่ง request
api.interceptors.request.use(
  async (config) => {
    // โหลด token ถ้ายังไม่มี
    if (!csrfToken) {
      await fetchCsrfToken();
    }

    // ถ้าเป็น request ที่ต้องการการป้องกัน CSRF
    const method = config.method?.toUpperCase();
    if (["POST", "PUT", "DELETE", "PATCH"].includes(method || "") && csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
