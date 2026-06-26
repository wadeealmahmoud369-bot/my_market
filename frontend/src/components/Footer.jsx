import { Mail, MapPin, Phone } from "lucide-react";
import React, { useState } from "react";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

const FacebookIcon = () => <FaFacebook size={30} color="#3b5998" />;
const InstagramIcon = () => <FaInstagram size={30} color="#E1306C" />;
const LinkedInIcon = () => <FaLinkedin size={30} color="#0077B5" />;
const WhatsappIcon = () => <FaWhatsapp size={30} color="#25D366" />;

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handelChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    alert(`شكرا لتواصلك معنا${formData.name}!`);
    setFormData({ name: "", email: "", message: "" });
  };
  return (
    <section className="relative w-full min-h-screen bg-linear-to-r from-green-700 via-green-600 to-green-500 text-white py-24 sm:px-10 ">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-semibold mb-6 text-center">
          تواصل معنا
        </h2>
        <p className="text-white mb-12 text-center text-lg sm:text-xl">
          نحن هنا لمساعدتك في اي وقت ارسل لنا رسالة وسنعود اليك قريبا
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div
              className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6
 rounded-3xl shadow-lg hover:shadow-green-400/30 transition-all"
            >
              <MapPin className="w-8 h-8 text-red-400" />
              <div>
                <h4 className="font-semibold text-lg"> العنوان</h4>
                <p className="text-gray-300">مزة الشيخ سعد فيلات متصلة</p>
              </div>
            </div>
            <div
              className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6
rounded-3xl shadow-lg hover:shadow-green-400/30 transition-all"
            >
              <Phone className="w-8 h-8 text-green-400" />
              <div>
                <h4 className="font-semibold text-lg"> الهاتف</h4>
                <p className="text-white"> 0997790469</p>
              </div>
            </div>
            <div
              className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6
 rounded-3xl shadow-lg hover:shadow-green-400/30 transition-all"
            >
              <Mail className="w-8 h-8 text-yellow-400" />
              <div>
                <h4 className="font-semibold text-lg">البريد الالكتروني </h4>
                <p className="text-white"> wadeihalmahmoud2@gmail.com</p>
              </div>
            </div>
            <form
              onSubmit={handelSubmit}
              className="bg-white/10 backdrop-blur-md p-8
             rounded-3xl shadow-2xl flex flex-col gap-6 "
            >
              <input
                type="text"
                name="name"
                placeholder="ادخل اسمك"
                value={formData.name}
                onChange={handelChange}
                required
                className="bg-white/10 p-4 rounded-xl text-white
              font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
              <input
                type="email"
                name="email"
                placeholder="ادخل ايميلك"
                value={formData.email}
                onChange={handelChange}
                required
                className="bg-white/10 p-4 rounded-xl text-white
              font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
              <textarea
                name="message"
                placeholder="أرسل مشكلتك"
                value={formData.message}
                onChange={handelChange}
                required
                rows={5}
                className="bg-white/10 p-4 rounded-xl text-white
              font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              ></textarea>
              <button
                type="submit"
                className=" bg-linear-to-r from-green-500 to-yellow-400 px-6 py-3 rounded-2xl font-semibold text-white hover:opacity-90 transition-all shadow-lg "
              >
                أرسل الرسالة
              </button>
            </form>
          </div>
        </div>
        <footer className="mt-24 relative z-10 max-w-7xl mx-auto text-center">
          <p>© 2026 E_Commerce.جميع الحقوق محفوظة</p>
          <div className="flex flex-col justify-center gap-6">
            <p className="text-base text-gray-400">
              Designed by Eng : Wadee3 Almahmoud
            </p>
            <div className="flex items-center justify-center gap-6 mt-2">
              <a
                href="https://www.facebook.com/abdulrahman.aldully"
                target="_blank"
                rel="noopener "
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/wadee3_almahmoud?igsh=b2tzcDR1eG52dms4"
                target="_blank"
                rel="noopener "
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener "
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://www.whatsapp.com"
                target="_blank"
                rel="noopener "
              >
                <WhatsappIcon />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
