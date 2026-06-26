import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ClipboardCheck,  List, LogOut, Menu, PlusCircle,  Users,  X } from "lucide-react";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuItems = [
    { to: "/admin/add", label: "أضافة منتج", Icon: PlusCircle },
    { to: "/admin/list", label: " قاىمة المنتجات", Icon: List },
    { to: "/admin/orders", label: "طلبات العملاء ", Icon: ClipboardCheck },
    { to: "/admin/users", label: "المستخدمين", Icon: Users },
  ];
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 rounded-lg p-1
         bg-linear-to-r from-green-500 to-yellow-400
         text-white shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none"
      >
        {isOpen?<X className="w-10 h-10 cursor-pointer "/>:<Menu className="w-10 h-10 cursor-pointer" />}
      </button>
      <aside className={`fixed top-0 left-0 h-full w-64 bg-linear-to-r from-green-700 via-green-600 to-green-500
      text-white shadow-lg z-40 transform transition-transform duration-300 ${isOpen?"translate-x-0":"-translate-x-full"} md:translate-x-0 `}>
<div className="flex flex-col h-full justify-between py-10 px-6"> 
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center mb-6">لوحة الأدارة</h2>
    {
    menuItems.map((item)=>(
      <NavLink key={item.to} to={item.to}
       className={({isActive})=>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
         ${isActive?"bg-linear-to-r from-green-500 to-yellow-400 text-white shadow-lg scale-105 "
  :"hover:bg-white/10 hover:shadow-md text-gray-200 "
         }`}>
<item.Icon className="w-7 h-7"/>
<span className="font-semibold">{item.label}</span>
      </NavLink> 
    ))}
  </div>
<button className="flex items-center gap-2 justify-center
mt-6 w-full px-4 py-3 bg-red-600 rounded-xl hover:bg-red-700"
onClick={handleLogout}>
  <LogOut className="w-6 h-6"/>
<span className="font-semibold">تسجيل الدخول</span>
</button>
</div>
      </aside>
    </>
  );
};

export default Sidebar;
