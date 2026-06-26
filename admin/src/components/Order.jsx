/* eslint-disable react-hooks/set-state-in-effect */
import { Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
const Order = () => {
  const url = "https://my-market-backend-i23l.onrender.com";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error("Error");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: newStatus,
      });

      if (res.data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order,
          ),
        );
      } else {
        toast.error("Error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  if (loading) {
    return (
      <section
        className="relative w-full min-h-screen  bg-linear-to-r from-green-700 via-green-600 to-green-500
     text-white py-24 px-6 sm:px-10"
      >
        <div className=" flex flex-col items-center">
          <Loader2 className="w-20 h-20 animate-spin text-yellow-400 mb-6" />
          <h2 className="text-2xl font-semibold">تحميل الطلبات</h2>
        </div>
      </section>
    );
  }
  return (
    <section
      className="relative w-full min-h-screen md:ml-64  bg-linear-to-r from-green-700 via-green-600 to-green-500
     text-white py-24 px-6 sm:px-10"
    >
      {orders.length === 0 ? (
        <p className="text-center text-gray-300 text-xl">لا يوجد طلبات</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {orders.map((order) => {
            const total = order.items?.reduce(
              (sum, item) => sum + item.price * (item.quantity || 1),
              0,
            );
            return (
              <div
                key={order._id}
                className="bg-white/10 backdrop-blur-md
                border border-white/20 rounded-2xl p-4 flex flex-col justify-between
                shadow-lg hover:scale-105 transform transition-all 
                duration-300 lg:w-[60%] md:w-[60%] md:ml-20 lg:ml-20 "
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-200 mb-2">
                    Order ID:{order._id.slice(-6).toUpperCase()}
                  </h2>
                  <p className="text-gray-200 mb-1">
                    <span className="font-semibold">العملاء:</span>
                    {order.user?.name}
                  </p>
                  <p className="text-gray-200 mb-2 text-sm">
                    <span className="font-semibold">العنوان</span>{" "}
                    {order.address
                      ? `${order.address.name},${order.address.address},${order.address.city},${order.address.phone}`
                      : "ليس موجود"}
                  </p>
                  <p className="text-gray-300 text-sm mb-3 ">
                    {order.items?.length || 0}
                    {order.items && order.items.length > 1 ? " عناصر" : " عنصر"}
                  </p>
                  <div className="space-y-1">
                    {order.items?.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between items-center border-b border-white/20 pb-1"
                      >
                        <div className="flex items-center gap-2">
                          {item.image && (
                            <img
                              src={`${url}/image/${item.image}`}
                              className="w-10 h-10 object-cover rounded"
                            />
                          )}
                          <p className="text-gray-200 text-sm">
                            {item.name} x {item.quantity || 1}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-100 text-sm">
                          ${item.price * (item.quantity || 1)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border rounded-lg px-2 py-1 text-gray-800 font-semibold cursor-pointer text-sm"
                  >
                    <option value="الأنتظار">الأنتظار</option>
                    <option value="في الطريق">في الطريق</option>
                    <option value="تم الاستلام">تم الأستلام</option>
                  </select>
                  <span className="font-bold text-gray-100 text-sm">
                    Total:${total}
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

export default Order;
