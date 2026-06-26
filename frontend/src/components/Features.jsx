import { Headphones, Motorbike, RefreshCcw, ShieldCheck } from "lucide-react";
import React from "react";

const FeaturesData = [
  {
    Icon: Motorbike,
    title: "توصيل مجاني ",
    desc: "حسم على جميع الطلبات الفوق $100",
    color: "from-cyan-400 to-blue-500",
  },
  {
    Icon: ShieldCheck,
    title: "ضمان المنتجات",
    desc: " استبدال او ارجاع مجاني خلال 2 ايام",
    color: "from-green-400 to-emerald-500",
  },
  {
    Icon: RefreshCcw,
    title: "ارجاع سهل",
    desc: " اجرائات بسيطة سريعة خلال دقائق",
    color: "from-purple-400 to-pink-500",
  },
  {
    Icon: Headphones,
    title: "دعم7/24",
    desc: " فريقنا جاهز لمساعدتك في اي وقت",
    color: "from-yellow-400 to-orange-500",
  },
];

const Features = () => {
  return (
    <section
      className="relative w-full
      bg-linear-to-r from-green-700 via-green-600 to-green-500 text-white py-20 "
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 ">
          لماذا تختارنا
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FeaturesData.map((item, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-md border border-white/20
  rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center
 transition-transform transform hover:scale-105 hover:shadow-cyan-600/30"
            >
              <div
                className={`bg-linear-to-r ${item.color} w-20 h-20 rounded-2xl
flex items-center justify-center shadow-lg mb-6`}
              >
                <item.Icon className="w-10 h-10 text-white" />
              </div>
              <h3 className=" text-2xl font-bold mb-3 ">{item.title}</h3>
              <p className="text-gray-200 text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
