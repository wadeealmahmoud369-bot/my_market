import { useState } from "react";
import axios from "axios";
const Add = () => {
  const url = "http://localhost:3000";
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
  });
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const onSubmitHandler=async(event)=>{
event.preventDefault()
const formData=new FormData()
formData.append("name",data.name)
formData.append("description",data.description)
formData.append("category",data.category)
formData.append("price",data.price)
if(image)formData.append("image",image)
  try{
const res=await axios.post(`${url}/api/product/add`,formData)
if(res.data.success){
  setData({name:"",description:"",price:"",category:"بهارات"})
  setImage(null)
  alert("تم أضافة المنتج بنجاح")
}
}catch(err){
  console.log(err)
  alert("حدث خطأ اثناء أضافة المنتج")
}
  }
  return (
    <section
      className="relative w-full min-h-screen  bg-linear-to-r from-green-700 via-green-600 to-green-500
     text-white py-24 px-6 sm:px-10"
    >
      <form onSubmit={onSubmitHandler}>
        <div
          className="relative z-10 max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-10 
        rounded-3xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            أضافة منتج جديد
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="أسم المنتج"
              value={data.name}
              onChange={onChangeHandler}
              className={`w-full px-6 py-3 rounded-xl bg bg-white/15
             text-white focus:ring-2 focus:ring-yellow-400 outline-none`}
            />
            <input
              type="number"
              name="price"
              placeholder="  سعر المنتج"
              value={data.price}
              onChange={onChangeHandler}
              className={`w-full px-6 py-3 rounded-xl bg bg-white/15
             text-white focus:ring-2 focus:ring-yellow-400 outline-none`}
            />
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              className="w-full px-6 py-3 rounded-xl bg-white/15 
             text-white focus:ring-2 focus:ring-yellow-400 outline-none"
            >
              
              <option className="bg-green-400">بهارات </option>
              <option className="bg-green-400">منظفات</option>
              <option className="bg-green-400">عصائر</option>
              <option className="bg-green-400">كونسروا</option>
              <option className="bg-green-400">معلبات</option>
              <option className="bg-green-400"> البان واجبان</option>
              <option className="bg-green-400">زيوت وسمنة</option>
              <option className="bg-green-400">بقوليات</option>
            </select>
<input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="w-full text-yellow-400 font-semibold"
            />
          اضغط على اختيار ملف الصورة
            {image && (
              <img
                src={URL.createObjectURL(image)}
                className="w-full h-64 object-cover
                    rounded-2xl mt-2"
              />
            )}
            <button type="submit" className="w-full bg-linear-to-r from-green-500 to-yellow-400
            px-6 py-3 rounded-2xl hover:scale-105 font-semibold hover:opacity-90 transition-all
            text-white shadow-lg mt-4">
              اضافة المنتج
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Add;
