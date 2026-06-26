/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { useState, useEffect } from "react";

const List = () => {
  const [products, setProducts] = useState([]);
  const url="http://localhost:3000"
  const fetchProducts = async () => {
      const res =await axios.get(`${url}/api/product/list`)
      if(res.data.success){
        setProducts(res.data.data)

        
      }else{
        console.log("error")
      }
      
    };
useEffect(()=>{
  fetchProducts()
},[])
    const handleDelete=async(id)=>{
const res = await axios.post(`${url}/api/product/remove`, { id: id });
await fetchProducts()
if(res.data.success){
  console.log("success")
}else{
  console.log("error")
}
}
  
  
  return (
    <section
      className="relative w-full min-h-screen  bg-linear-to-r from-green-700 via-green-600 to-green-500
     text-white py-24 px-6 sm:px-10"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">قائمة المنتجات</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white/10 backdrop-blur-md border border-white/20
        rounded-3xl p-6 flex flex-col justify-between shadow-lg"
            >
              <img
                src={`${url}/image/` + product.image}
                className="w-full h-48 object-contain mb-4 rounded-xl"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-yellow-300 font-bold mb-2">${product.price}</p>
              <p className="text-gray-200 mb-4">{product.category}</p>
            <button onClick={()=>handleDelete(product._id)} className="bg-red-500 px-4 py-2 rounded-xl text-white font-semibold hover:bg-red-600 transition-all">
              حذف
            </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default List;
