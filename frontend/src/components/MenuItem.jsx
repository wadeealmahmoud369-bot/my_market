import {  BellRing, FolderOpen, Home, Mail, ShoppingCart, User } from "lucide-react";
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { ShopContext } from "../context/ShopContext";

const menuItemsData = [
  { to: "home", label: "الصفحة الرئيسية", Icon: Home },
  { to: "categories", label: "الأصناف", Icon: FolderOpen },
  { to: "shop", label: "العروض", Icon: ShoppingCart },
  { to: "contact", label: "تواصل معنا", Icon: Mail },
];
const MenuItem = ({ setSidebarOpen, isMobile }) => {
  const { cartItems, token, setToken } = useContext(ShopContext);
  const totalItems = Object.values(cartItems).reduce((a, b) => a + b, 0);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/");
    setSidebarOpen && setSidebarOpen(false);
  };

  return (
    <div
      className={`flex md:justify-center lg:justify-end ${isMobile ? "flex flex-col  space-y-6-y-6 items-center px-4 gap-y-2" : "flex-row w-full items-center gap-4  "}`}
    >
      {menuItemsData.map((item) =>
        location.pathname === "/" ? (
          <>
          <ScrollLink
          key={item.to}
          to={item.to}
          smooth={true}
          duration={500}
            offset={-80}
            spy={true}
            onClick={() => setSidebarOpen && setSidebarOpen(false)}
            className=" text-gray-100 flex items-center gap-3 px-4 py-3  rounded-lg h-8.75 transition-all shrink-0  w-auto min-w-20 hover:bg-white/10 hover:text-white hover:shadow-xl cursor-pointer"
            activeClass="bg-linear-to-r from-green-700 via-green-500 to-yellow-300 text-white shadow-lg"
          >
            <item.Icon className="w-6 h-6" />
            <span className="font-semibold text-base">{item.label}</span>
            
          </ScrollLink>
          
          </>
        ) : (
          <button
            key={item.to}
            onClick={() => {
              navigate("/");
              setSidebarOpen && setSidebarOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg h-8.75 transition-all 
                shrink-0 w-auto min-w-20 text-gray-200 hover:bg-white/10 hover:text-white hover:shadow-md"
          >
            <item.Icon className="w-6 h-6" />
            <span className="font-semibold text-base">{item.label}</span>
          </button>
        ),
      )}
       <button  className="flex items-center gap-3 px-4 py-3 rounded-lg h-8.75 transition-all 
                shrink-0 w-auto min-w-20 text-gray-200 hover:bg-white/10 hover:text-white hover:shadow-md font-semibold text-base" 
                onClick={()=>navigate("/myorders")} 
                
                >
                 <BellRing className="w-6 h-6"/>
                  طلباتي
                  
                  
                  </button>
      <button
        onClick={() => {
          navigate("/cart");
          setSidebarOpen && setSidebarOpen(false);
        }}
        className="relative flex items-center gap-3 px-4 py-3 rounded-lg h-8 transition-all text-gray-200 hover:bg-white/10 hover:shadow-md"
      >
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold text-white 
                 bg-red-500 rounded-full flex items-center justify-center "
          >
            {totalItems}
          </span>
        )}
      </button>
     
      {!token ? (
        <button
          onClick={() => {
            navigate("/login");
            setSidebarOpen && setSidebarOpen(false);
          }}
          className="flex items-center gap-2 px-4 py-3 rounded-lg h-8.75 bg-yellow-400 font-semibold hover:bg-yellow-600 transition-all"
        >
          Login
        </button>
      ) : (
        <div className="flex items-center gap-4">
          <User className="w-6 h-6" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-3 rounded-lg h-8.75 bg-red-500 text-white font-semibold 
        hover:bg-red-600 transition-all"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
