import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";

import { ShoppingBag } from "lucide-react";

const Offer = () => {
  const { addToCart,url ,all_products } = useContext(ShopContext);
  const [isExpired, setIsExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState();
 const product=all_products?all_products.slice(0 , 4) : []

  useEffect(() => {
    const targetDate = new Date("2026-06-22T13:53:59");
    
    const interval = setInterval(() => {

      const now = new Date();
      const diff = targetDate - now;
      if(diff<=0){
        clearInterval(interval)
        setTimeLeft({days:0,hours:0,minutes:0,seconds:0})
        setIsExpired(true)
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section
      className="relative w-full
      bg-linear-to-r from-green-700 via-green-600 to-green-500 text-white py-20 "
    >
      <div className="absolute inset-0 bg-black/30 backdrop:bg-blue-sm pointer-events-none"></div>
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
          My Market افضل العروض من
        </h2>
        <p className="text-gray-300 mb-12 text-lg sm:text-xl">
         {isExpired? "انتهت العروض الحالية، ترقبوا المزيد قريبًا!" : "استفد من خصوماتنا الحصرية لفترة محدودة!"}
        </p>
        {!isExpired &&(
        <div className="flex justify-center items-center gap-6 mb-16 text-center">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div
              key={unit}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 w-24 sm:w-28  shadow-lg"
            >
              <span className="block text-3xl sm:text-4xl font-bold text-yellow-400 ">
                {timeLeft?.[unit] ?? 0}
              </span>
              <span className="block mt-2 text-yellow-400 capitalize">
                {unit}
              </span>
            </div>
          ))}
        </div>
        )}
        {isExpired?(
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl max-w-md mx-auto border border-white/20 shadow-2xl">
            <p className="text-gray-200 text-lg mt-2 ">نعتذر منك لقد انتهت العروض</p>
            <p className="text-gray-200  mt-2">انتظر العروض القادمة</p>
          </div>
        ):(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {product.map((product) => (
            <div
              key={product._id}
              className="bg-white/10 backdrop-blur-md border border-white/20
  rounded-3xl overflow-hidden shadow-2xl hover:scale-105 hover:shadow-green-400/30
  transition-all duration-500"
            >
              <div
                className="relative w-full h-64 flex items-center justify-center bg-linear-to-b
    from-green-800/40 to-transparent"
              >
                <img
                  src={`${url}/image/${product.image}`}
                  className="object-contain w-50 h-50 hover:scale-110
transition-transform duration-500 rounded-2xl "
                />
              </div>
              <div className="p-5 test-left">
                <h3 className="text-lg font-semibold mb-2 truncate">
                  {product.name}
                </h3>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-yellow-400 ">
                    ${Number(product.price) - 0.2}
                  </span>
                  <span className="text-xl font-bold text-yellow-400 line-through">
                    ${Number(product.price)}
                  </span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="flex items-center gap-2  bg-linear-to-r from-green-500 to-yellow-400 px-4 py-2
                    rounded-xl font-semibold hover:opacity-90 transition-all text-white shadow-lg"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    أضف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default Offer;
