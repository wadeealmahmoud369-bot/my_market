import { useContext, useState } from "react";
import { categories } from "../assets/data";
import { ShopContext } from "../context/ShopContext";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Categories = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState("All");
  const { addToCart, all_products,url } = useContext(ShopContext);
 
  const filteredProducts =
    selectedCategories === "All"
      ? all_products
      : all_products.filter((p) => p.category === selectedCategories);
  return (
    <section
      className="relative w-full min-h-screen  bg-linear-to-r from-green-700 via-green-600 to-green-500
     text-white py-24 px-6 sm:px-10"
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className=" relative z-10 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-12">
          تسوق حسب الفئة
        </h2>
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <button
            onClick={() => setSelectedCategories("All")}
            className={`px-6 py-3 rounded-2xl font-semibold text-lg
   transition-all shadow-lg ${
     selectedCategories === "All"
       ? "bg-linear-to-r from-green-500 to-yellow-400 text-white shadow-yellow-400/50 scale-105"
       : "bg-white/10 hover:bg-white/20 text-gray-200"
   }`}
          >
            الكل
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategories(cat.name)}
              className={`px-6 py-3 rounded-2xl font-semibold text-lg
   transition-all shadow-lg ${
     selectedCategories === cat.name
       ? "bg-linear-to-r from-green-500 to-yellow-400 text-white shadow-yellow-400/50 scale-105"
       : "bg-white/10 hover:bg-white/20 text-gray-200"
   }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white/10 backdrop-blur-md border-white/20 rounded-3xl
            overflow-hidden  shadow-2xl hover:scale-105 hover:shadow-green-400/30 transition-all duration-500"
            >
              <div
                onClick={() => navigate(`/product/${product._id}`)}
                className="relative w-full h-64 flex items-center justify-center
               bg-linear-to-b  from-green-800/80 to-transparent"
              >
                <img
                  src={`${url}/image/${product.image}`}
                  className=" object-contain w-50 h-50 hover:scale-105 transition-transform duration-500 rounded-2xl "
                />
              </div>
              <div className="p-5 text-left">
                <h2 className=" font-semibold mb-2 truncate max-w-2xl">
                  {product.name}
                </h2>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-yellow-400 ">
                    ${Number(product.price).toFixed(2)}
                  </span>

                  <button
                    onClick={() => addToCart(product._id)}
                    className="flex items-center gap-2
                  bg-linear-to-r from-green-500 to-yellow-400 px-4 py-2 rounded-xl
                    font-semibold hover:opacity-90 transition-all text-white shadow-lg"
                  >
                    <ShoppingBag className="w-5" />
                    أضف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
