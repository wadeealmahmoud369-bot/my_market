import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const url = "https://my-market-backend-i23l.onrender.com/api/admin/login";
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin/list");
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(url, { email, password });
      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/list");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className=" min-h-screen flex items-center justify-center  bg-linear-to-r from-green-700 via-green-600 to-green-500
     text-white py-24 px-6 sm:px-10"
    >
      <div
        className="absolute w-72 h-72 bg-yellow-300 rounded-full blur-3xl
        opacity-20 top-20 left-20 animate-pulse"
      ></div>
      <div
        className="absolute w-72 h-72 bg-yellow-300 rounded-full blur-3xl
        opacity-20 bottom-20 right-20 animate-pulse"
      ></div>
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 
        shadow-2xl p-8 rounded-2xl text-white w-96 flex flex-col items-center transition-all
        duration-300 hover:csale-[1.02]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          تسجيل دخول المشرف
        </h2>
        <input
          type="email"
          placeholder="البريد الألكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full  p-3 mb-4 rounded-lg bg-white/20 border border-white/20 focus:outline-none
        focus:ring-2 focus:ring-yellow-400 text-white"
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-white/20 border border-white/20 focus:outline-none
        focus:ring-2 focus:ring-yellow-400 text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-linear-to-r from-green-500 to-yellow-400
        p-3 rounded-lg font-semibold shadow-lg
        hover:shadow-yellow-500/30 transition-all duration-300 hover:scale-[1.03] "
        >
          تسجيل الدخول
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
