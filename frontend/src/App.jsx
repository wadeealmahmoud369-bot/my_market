import { Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Verify from "./pages/Verify";
import MyOrders from "./pages/MyOrders";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import Header from "./components/Header";
import ShopContextProvider from "./context/ShopContext.jsx";
const App = () => {
  return (
    <ShopContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Product/:productId" element={<Product />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="Order" element={<Order />} />
        <Route path="/Verify" element={<Verify />} />
        <Route path="/MyOrders" element={<MyOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </ShopContextProvider>
  );
};

export default App;
