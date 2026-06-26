import React, { useEffect, useState } from "react";
import { ShopContext } from "./ShopContext.js";

import axios from "axios";

const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cartItems")) || {};
    } catch (err) {
      console.log(err);
      return {};
    }
  });
  const url = "https://my-market-backend-i23l.onrender.com";

  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (id, qty = 1) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + qty : qty,
    }));
    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { id: id, quantity: qty },
          { headers: { token } },
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  const removeFromCart = async (id, removeAll = false) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (removeAll || updated[id] <= 1) delete updated[id];
      else updated[id]--;
      return updated;
    });
    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { id: id, removeAll: removeAll },
          { headers: { token } },
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  const clearCart = async () => {
    if (!token) {
      console.log("err");
    }
    try {
      await axios.post(`${url}/api/cart/clear`, {}, { headers: { token } });
      setCartItems({});
      localStorage.removeItem("cartItems");
    } catch (err) {
      console.log(err);
    }
  };
  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const product = products.find((p) => p._id === id);
      return total + (product ? product.price * qty : 0);
    }, 0);
  };

  const fetchProductsList = async () => {
    try {
      const res = await axios.get(`${url}/api/product/list`);
      setProducts(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCartData = async (token) => {
    try {
      const res = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } },
      );
      setCartItems(res.data.cartData || {});
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchProductsList();

      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const value = {
    all_products: products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    url,
    setCartItems,
    clearCart,
  };
  return <ShopContext.Provider value={value}>{children} </ShopContext.Provider>;
};

export default ShopContextProvider;
