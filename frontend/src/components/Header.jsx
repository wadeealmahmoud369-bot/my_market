import { Menu, Store, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <header
        className="hidden md:flex w-full 
     h-20 items-center px-10 py-4 fixed top-0 left-0  backdrop-blur-md shadow-xl z-50 "
      >
        <div className="items-center gap-4 lg:flex  ">
          <Store className="w-10 h-10 text-black-300 animate-pulse" />
          <h1 className=" font-bold text-2xl tracking-widest ">
            <span className="text-green-400">My</span>{" "}
            <span className="text-yellow-300">Market</span>
          </h1>
        </div>
        <div className=" flex-1 flex justify-center lg:justify-end">
          <MenuItem isMobile={false} />
        </div>
      </header>

      <header
        className="md:hidden h-12 flex justify-between items-center px-4 py-4 w-full fixed top-0 left-0 
       backdrop-blur-md shadow-xl z-50"
      >
        <div className=" flex items-center gap-2 ">
          <Store className="w-10 h-10 text-black-300 animate-pulse" />
          <h1 className=" font-bold text-2xl tracking-widest ">
            <span className="text-green-400">My</span>{" "}
            <span className="text-yellow-300">Market</span>
          </h1>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className=" p-2 rounded-lg shadow-xl hover:scale-105 transition-transform "
        >
          <Menu className="w-6 h-6 cursor-pointer" />
        </button>
      </header>
      <aside
        className={`md:hidden fixed top-12 right-0 h-full w-72 bg-linear-to-r from-green-700 via-green-600 to-green-500
      shadow-2xl backdrop-blur-md transform transition-transform duration-500
       z-40 ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white p-3 hover:bg-white/20 rounded-lg transition-all duration-300"
          >
            <X className="w-7 h-7" />
          </button>
        </div>
        <div className="mt-10 px-6 space-y-6">
          <MenuItem setSidebarOpen={setSidebarOpen} isMobile={true} />
        </div>
      </aside>
      {sidebarOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Header;
