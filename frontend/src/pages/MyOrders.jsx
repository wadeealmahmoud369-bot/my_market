import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.js";
import axios from "axios";
import { CheckCircle, Loader2, XCircle } from "lucide-react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { url, token } = useContext(ShopContext);
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${url}/api/order/userorder`,
        {},
        { headers: { token } },
      );
      const data = res.data.data;
      const ordersData = Array.isArray(data) ? data : [data];
      setOrders(ordersData);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setOrders([]);
    }
  };
  useEffect(() => {
    const getOrders = async () => {
      if (token) await fetchOrders();
    };
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (loading) {
    return (
      <section
        className="relative w-full min-h-screen  bg-linear-to-r from-green-700 via-green-600 to-green-500
     text-white py-24 px-6 sm:px-10"
      >
        <div className=" relative flex flex-col items-center">
          <Loader2 className="w-20 h-20 animate-spin text-yellow-400 mb-6" />
          <h2 className="text-2xl font-semibold">جاري تحميل الطلبات</h2>
          <p className="text-gray-300 mt-2">الرجاء الأنتظار لحظة</p>
        </div>
      </section>
    );
  }
  return (
    <section className=" min-h-screen px-6 py-10 bg-linear-to-r from-green-700 via-green-600 to-green-500">
      <h1 className=" text-3xl font-bold text-white mt-10 mb-8 text-center">
        طلباتي
      </h1>
      {orders.length === 0 ? (
        <p className="text-center text-yellow-300 text-2xl">
          ...لايوجد طلبات حاليا
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
          {orders.map((order) => {
            return (
              <div
                key={order._id}
                className="bg-linear-to-b via bg-green-500/70 to-transparent rounded-2xl 
       shadow-lg p-6 flex flex-col justify-between  hover:scale-105 transform transition-all duration-300"
              >
                <div className="text-xl font-semibold mb-2 text-white">
                  <h2>Order ID:{order._id.slice(-6).toUpperCase()}</h2>
                  <p className="mb-4 text-white">
                    {order.items.length || 0} 
                    {order.items && order.items.length > 1 ? " عناصر" : " عنصر"}
                  </p>
                  <div className="space-y-2">
                    {order.items?.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between items-center border-b border-gray-200 py-2"
                      >
                        <div className="flex items-center gap-2 ">
                          {item.image && (
                            <img
                              src={`${url}/image/${item.image}`}
                              
                              className=" w-12 h-12 object-cover rounded"
                            />
                          )}
                          <p className="text-white">
                            {item.name} x {item.quantity || 1}
                          </p>
                        </div>
                        <p className="font-semibold text-white ">
                          ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 justify-between items-center">
                  <span
                    className={`flex items-center gap-2 font-semibold ${order.status === "تم الأستلام" ? "text-green-500" : order.status === "الأنتظار" ? "text-yellow-500" : "text-red-500"}`}
                  >
                    {order.status === "delivered" && <CheckCircle />}
                    {order.status === "الأنتظار" && (
                      <Loader2 className="animate-spin" />
                    )}
                    {order.status === "cancled" && <XCircle />}
                    {order.status?.charAt(0).toUpperCase() +
                      order.status?.slice(1)}
                  </span>
                  <span className="font-bold text-white">
                    المجموع:${order.amount}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MyOrders;
