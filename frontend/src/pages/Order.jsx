import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const { cartItems, all_products, getTotalCartAmount,url,token } =
    useContext(ShopContext);
  const navigate = useNavigate();
  const total = getTotalCartAmount();
  const cartProduct = Object.keys(cartItems)
    .map((id) => {
      const product = all_products.find((P) => P._id === id);
      return product ? { ...product, quantity: cartItems[id] } : null;
    })
    .filter(Boolean);
  const [shopping, setShopping] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
  });
  const [issubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    setShopping({ ...shopping, [e.target.name]: e.target.value });
  };
 
const placeOrder=async(e)=>{
e.preventDefault()
if(issubmitting) return;
 if (
      !shopping.name ||
      !shopping.address ||
      !shopping.city ||
      !shopping.phone
    ) {
      alert("يرجى ملئ جميع بيانات الشحن");
      return;
    }
let orderItems=[]
all_products.map((item)=>{
  if(cartItems[item._id]>0){
    let itemInfo = item;
    itemInfo["quantity"]=cartItems[item._id]
    orderItems.push(itemInfo);
  }
})
let orderData={
  address:shopping,
  items: orderItems,
  amount: getTotalCartAmount() + 2,
}
setIsSubmitting(true);
try{

  let res=await axios.post(url+"/api/order/place",orderData,{ headers: { token }})
  if(res.data.success){
    const session_Url = res.data.session_url
    window.location.replace(session_Url)
    return;}
    alert(res.data.message || "حدث خطأ في الطلب")
  }catch(err){
    console.log(err);
}finally{
  setIsSubmitting(false);
}
}
useEffect(()=>{
  if(!token){
    navigate("/cart")
  }else if(getTotalCartAmount() === 0) {
    navigate("/cart")
  }

},[token,navigate,getTotalCartAmount])
  return (
    <section className="relative w-full min-h-screen bg-linear-to-r from-green-700 via-green-600 to-green-500 text-white py-24 sm:px-10 ">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none"></div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center ">
          اتمام الطلب
        </h2>
        {cartProduct.length === 0 ? (
          <div className="text-center text-gray-300 mt-20 space-y-6">
            <p className="text-xl">السلة فارغة الآن</p>
            <button
              onClick={() => navigate("/")}
              className="
   px-8 py-3 rounded-2xl font-semibold 
  bg-linear-to-r from-green-500 to-yellow-400
  text-white hover:opacity-90 transition-all"
            >
              العودة للتسوق
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              {cartProduct.map((items) => (
                <div
                  key={items._id}
                  className="flex items-center gap-4 bg-white/10 p-4
   rounded-2xl shadow-lg border border-white/20"
                >
                  <img
                    src={`${url}/image/${items.image}`}
                    className="w-20 h-20 object-contain rounded-xl"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{items.name}</h3>
                    <p className="text-sm text-gray-300">
                      {" "}
                      الكمية: {items.quantity}
                    </p>
                    <p className="text-yellow-400 font-bold">
                      $ {Number(items.price || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="text-xl font-bold mt-6">
                <span className="text-yellow-400 ml-2">
                  {" "}
                  المجموع الكلي : ${total.toFixed(2)}
                </span>
              </div>
            </div>
            <div
              className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20
              shadow-xl"
            >
              <h3 className="text-2xl font-semibold mb-6 text-center">
                البيانات الشخصية
              </h3>
              <div className="space-y-4">
                <form onSubmit={placeOrder} className="flex flex-col gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="الأسم"
                    value={shopping.name}
                    onChange={handleChange}
                    className="w-full bg-white/15 text-white  px-4 py-3 rounded-xl outline-none
                  focus:ring-2 focus:ring-yellow-400"
                  />
                  <input
                    type="text "
                    name="address"
                    placeholder="العنوان"
                    value={shopping.address}
                    onChange={handleChange}
                    className="w-full bg-white/15 text-white  px-4 py-3 rounded-xl outline-none
                  focus:ring-2 focus:ring-yellow-400"
                  />
                  <input
                    type="text "
                    name="city"
                    placeholder="المدينة"
                    value={shopping.city}
                    onChange={handleChange}
                    className="w-full bg-white/15 text-white  px-4 py-3 rounded-xl outline-none
              focus:ring-2 focus:ring-yellow-400"
                  />
                  <input
                    type="text "
                    name="phone"
                    placeholder="رقم الهاتف"
                    value={shopping.phone}
                    onChange={handleChange}
                    className="w-full bg-white/15 text-white  px-4 py-3 rounded-xl outline-none
              focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    type="submit" disabled={issubmitting}
                    className="w-full  bg-linear-to-r from-green-500 to-yellow-400 text-white font-semibold py-3 
                  rounded-xl hover:opacity-90 transition-all mt-4 "
                  >
                    {issubmitting ? "جاري اتمام الطلب..." : "اتمام الطلب"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Order;
