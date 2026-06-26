/* eslint-disable react-hooks/set-state-in-effect */
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Shield, Trash, User } from "lucide-react";

const Users = () => {
  const url = "http://localhost:3000";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const demoteToUser = async (id) => {
    console.log("id:",id);
    try {
      await axios.put(`${url}/api/users/demote/${id}`);
      setUsers((prev) =>
         prev.map((u) => u._id === id ? { ...u, role: "user" } : u)
      );
      alert("تم إعادة المستخدم إلى مستخدم عادي بنجاح");
    } catch (error) {
      console.error("error",error);
      alert("حدث خطأ أثناء إعادة المستخدم إلى مستخدم عادي");
    }
  };

  const promoteToAdmin = async (id) => {
    try {
      await axios.put(`${url}/api/users/make-admin/${id}`);
      setUsers((prev) =>  prev.map((u) => u._id === id ? { ...u, role: "admin" } : u));
      alert("تم ترقية المستخدم إلى أدمن بنجاح");
    } catch (error) {
      console.error("خطأ غي الترقية", error);
      alert("حدث خطأ أثناء الترقية");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${url}/api/users/list`);
      if (res.data && res.data.success) {
        setUsers(res.data.data || []);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log(error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;

    try {
      const res = await axios.delete(`${url}/api/users/delete/${id}`);
      if (res.data && res.data.success) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
        alert("تم حذف المستخدم بنجاح");
      } else {
        alert("حدث خطأ أثناء حذف المستخدم");
      }
    } catch (error) {
      console.error("خطأ في حذف المستخدم", error);
      alert("حدث خطأ أثناء حذف المستخدم");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
<section
      className="relative w-full min-h-screen  bg-linear-to-r from-green-700 via-green-600 to-green-500
     text-white py-24 px-6 sm:px-10"
    >
      <div className="max-w-6xl mx-auto ">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center ">
          إدارة المستخدمين
        </h2>
        {loading ? (
          <div className="text-center text-gray-300 text-lg">
            جاري تحميل المستخدمين......
          </div>
        ):users.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">
            لا يوجد مستخدمين حالياً
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white/10 border border-white/20 backdrop-blur-md p-6
                        rounded-3xl flex flex-col items-center hover:shadow-indigo-500/40 transition-all"
              >
                <div
                  className="w-20 h-20 rounded-full bg-linear-to-r from-green-700 via-green-600 to-green-500
                            flex items-center justify-center mb-4 overflow-hidden"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{user.email}</p>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-semibold mb-4 ${user.role === "admin" ? "bg-yellow-400/80 text-black flex items-center gap-1 " : "bg-cyan-500/80 text-white "}`}
                >
                  {user.role === "admin" && <Shield />}
                  {user.role === "admin" ? "مدير" : "مستخدم"}
                </div>
                <button
                  onClick={() => deleteUser(user._id)}
                  disabled={user.role !== "user"}
                  className={`flex items-center gap-2  px-4 py-2 rounded-lg font-semibold transition-all mb-3 ${user.role === "admin" ? "bg-gray-500/40 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}
                >
                  <Trash className="w-5 h-5" />
                  حذف المستخدم
                </button>

                <button
                  onClick={() => promoteToAdmin(user._id)}
                  disabled={user.role === "admin"}
                  className={`flex items-center gap-2  px-4 py-2 rounded-lg font-semibold transition-all mb-3 ${user.role === "admin" ? "bg-gray-500/40 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"}`}
                >
                <Shield className="w-5 h-5" />
                  {user.role === "admin" ? "مدير":"الترقية إلى أدمن" }
                </button>




                <button
                  onClick={() => demoteToUser(user._id)}
                  disabled={user.role !== "admin"}
                  className={`flex items-center gap-2  px-4 py-2 rounded-lg font-semibold transition-all ${user.role !== "admin" ? "bg-gray-500/40 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"}`}
                >
                    <User className="w-5 h-5" />
                  إعادة إلى مستخدم
               
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Users;
