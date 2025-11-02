import React from "react";
import { motion } from "framer-motion";
import { Github, Server, Cloud, Database, CreditCard, Boxes } from "lucide-react";

const techs = [
  { icon: <Server size={28} />, name: "Spring Boot" },
  { icon: <CreditCard size={28} />, name: "Stripe" },
  { icon: <Cloud size={28} />, name: "Cloudinary" },
  { icon: <Boxes size={28} />, name: "React" },
  { icon: <Database size={28} />, name: "PostgreSQL" },
  { icon: <Boxes size={28} />, name: "Docker" },
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold mb-4 text-center"
      >
        เกี่ยวกับโปรเจกต์นี้
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-2xl text-center text-lg leading-relaxed text-gray-300"
      >
        โปรเจกต์นี้ถูกสร้างขึ้นเพื่อการ <strong>เรียนรู้และพัฒนาทักษะการเขียนโปรแกรม</strong> 
        ด้วยเทคโนโลยีสมัยใหม่ทั้งฝั่ง Frontend และ Backend  
        โดยไม่มีวัตถุประสงค์ทางการค้า หรือมีการใช้เงินจริงในระบบ
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10"
      >
        {techs.map((tech, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-4 rounded-2xl shadow-lg"
          >
            {tech.icon}
            <span className="mt-2 font-semibold">{tech.name}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-400 mb-3">
          ซอร์สโค้ดของผู้พัฒนา:
        </p>
        <a
          href="https://github.com/Nextjingjing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full shadow-md transition"
        >
          <Github className="mr-2" /> Visit My GitHub
        </a>
      </motion.div>

      <p className="text-xs text-gray-500 mt-10 text-center">
        © {new Date().getFullYear()} Nextjingjing | สร้างเพื่อการศึกษาเท่านั้น
      </p>
    </div>
  );
};

export default About;
