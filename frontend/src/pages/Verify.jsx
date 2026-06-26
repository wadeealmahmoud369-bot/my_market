import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.js";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url, clearCart, token } = useContext(ShopContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    if (!token) return;
    const verifyPayment = async () => {
      try {
        const res = await axios.post(`${url}/api/order/verify`, {
          success,
          orderId,
        },
        { headers: { token } }
      );
        if (res.data.success) {
          await clearCart();
          setStatus("success");
          setTimeout(() => navigate("/myorders"), 2000);
        } else {
          setStatus("error");
          setTimeout(() => navigate("/"), 2000);
        }
      } catch (err) {
        console.log(err);
        setStatus("error");
        setTimeout(() => navigate("/"), 2000);
      }
    };
    verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, orderId, url, navigate, token]);
  return (
    <section
      className="min-h-screen flex items-center justify-center
    bg-linear-to-r from-green-700 via-green-600 to-green-500
    text-white px-6"
    >
      <div className="text-center flex flex-col items-center ">
        {status === "loading" && (
          <div className="flex flex-col items-center ">
            <Loader2 className="flex flex-col items-center animate-spin w-20 h-20" />
            <h2 className="text-2xl font-semibold">
              ..... جاري التحقق من عملية الدفع
            </h2>
            <p className="text-gray-300 animate-pulse">يرجى الأنتظار قليلا</p>
          </div>
        )}
        {status === "success" && (
          <div className="text-center flex flex-col items-center">
            <CheckCircle className="w-20 h-20  text-yellow-400 mb-6" />
            <h2 className="text-2xl font-semibold">..... تم الدفع بنجاح</h2>
            <p className="text-gray-300 mt-2">يتم نقلك الى طلباتك الان</p>
          </div>
        )}
        {status === "error" && (
          <div className="text-center flex flex-col items-center">
            <XCircle className="w-20 h-20  text-red-400 mb-6" />
            <h2 className="text-2xl font-semibold"> فشلت عملية الدفع</h2>
            <p className="text-gray-300 mt-2">
              {" "}
              حدث خطأ اثناء التحقق سيتم اعادتك للصفحة الرئيسية
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Verify;
