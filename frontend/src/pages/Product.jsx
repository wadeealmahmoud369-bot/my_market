import React, { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";

const Product = () => {
  const { addToCart, all_products,url } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_products.find((p) => p._id === productId);
  const [quantity, setQuantity] = useState(1);
  if (!product) {
    return (
      <section
        className="min-h-screen flex items-center justify-center text-white
      bg-linear-to-r from-green-700 via-green-600 to-green-500"
      >
        <p className="text-2xl font-bold">المنتج غير موجود</p>
      </section>
    );
  }
  const handleAddToCart = () => {
    addToCart(product._id, quantity);
    alert(`تمت اضافة${quantity} قطعة من ${product.name} الى السلة`);
  };
  return (
    <section
      className="relative w-full min-h-screen bg-linear-to-r from-green-700 via-green-600 to-green-500
    text-white py-24  sm:px-10"
    >
      <div
        className="  max-w-6xl mx-auto bg-white/10 backdrop-blur-md 
      rounded-3xl p-10 flex flex-col md:flex-row gap-10 shadow-2xl"
      >
        <div className="  md:w-1/2 flex items-center justify-center bg-white/5 rounded-3xl p-6">
          <img
            src={`${url}/image/${product.image}`}
            className="w-64 h-55 object-center rounded-2xl"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl font-extrabold gap-6 mb-5">
            {product.name} -
          </h2>
          <p>{product.description}</p>
          <p className="text-yellow-400 text-3xl font-bold mb-5">
            السعر : $ {product.price}
          </p>
          <p className="  text-yellow-400 text-xl mb-10">
            الصنف : {product.category}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-white/20 px-6 py-2 rounded-xl mb-5 hover:bg-white/30 transition-all"
            >
              -
            </button>
            <span className="px-3 mb-5">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-white/20 px-6 py-2 rounded-xl mb-5 hover:bg-white/30 transition-all"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-linear-to-r from-green-500 to-yellow-400 px-6 py-3 
      rounded-2xl font-semibold  hover:opacity-90 transition-all text-white shadow-lg "
          >
            أضافة الى السلة
          </button>
        </div>
      </div>
    </section>
  );
};

export default Product;
