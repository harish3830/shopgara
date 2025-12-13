import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
  }, []);

  const save = (items) => {
    setCart(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const addToCart = (product) => {
    const updated = [...cart];

    const found = updated.find((i) => i._id === product._id);

    if (found) {
      found.qty += 1;
    } else {
      updated.push({ ...product, qty: 1 });
    }

    save(updated);
  };

  const removeFromCart = (id) => {
    save(cart.filter((item) => item._id !== id));
  };

  const updateQty = (id, qty) => {
    const updated = [...cart];
    const item = updated.find((i) => i._id === id);

    if (item) {
      item.qty = Number(qty);
      save(updated);
    }
  };

  const clearCart = () => save([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
