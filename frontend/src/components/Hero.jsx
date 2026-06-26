import { ShoppingBasket, ShoppingCart } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <section
      className="relative w-full min-h-screen bg-linear-to-r from-green-700 via-green-600 to-green-500 
    text-white flex items-center"
    >
      <div className="absolute inset-0  bg-black/30"></div>
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 flex flex-col-reverse md:flex-row
items-center gap-16"
      >
        <div className="flex-1 space-y-8">
          <h1 className='className=" text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight"'>
            تسوق معنا بلا حدود
            <br />
            مع افضل العروض والحسومات
          </h1>
          <p className="text-lg sm:text-6xl md:text-2xl text-gray-200 max-w-xl ">
            تسوق الآن واستمتع بعروض لا تنتهي من الغذائيات والمعلبات والمنظفات
            وغيرها
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
            <button
              onClick={() => {
                
              }}
              className="flex items-center gap-3 bg-yellow-400
            hover:bg-green-600 text-white font-blod px-8 py-4 rounded-2xl text-lg shadow-2xl transition-transform transform
            hover:scale-105"
            >
              <ShoppingCart className="w-8 h-8" />
              تسوق الأن
            </button>
            <button
              onClick={() => {
                
              }}
              className="flex items-center gap-3 bg-yellow-400
            hover:bg-green-600 text-white font-blod px-8 py-4 rounded-2xl text-lg shadow-2xl transition-transform transform
            hover:scale-105"
            >
              <ShoppingBasket className="w-8 h-8" />
              تصفح منتجاتنا
            </button>
          </div>
        </div>
        <div className="flex-1 relative w-full max-w-lg">
          <img
            src="home.jpg"
            className="w-full h-full object-cover rounded-3xl shadow-2xl"
          />
          <div className="absolute top-1 bg-yellow-500 text-white  px-5 rounded-full font-bold  shadow-lg animate-bounce h-7 ">
            خصم حتى %40
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
