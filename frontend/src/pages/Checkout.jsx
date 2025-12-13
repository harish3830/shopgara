import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { orderApi } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  /* ------------------------------------------------------------
     PLACE ORDER → REAL BACKEND
  ------------------------------------------------------------- */
  const placeOrder = async () => {
    setMessage("");

    if (!user) {
      setMessage("Please login before placing an order.");
      return;
    }

    if (cart.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    const items = cart.map((item) => ({
      productId: item._id, // REAL MongoDB product ID
      quantity: item.qty,
    }));

    setLoading(true);

    const res = await orderApi.place({ items });

    setLoading(false);

    if (res.message) {
      setMessage(res.message);
      return;
    }

    clearCart();
    navigate("/orders"); // redirect to actual order page
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      {message && (
        <p className="bg-red-100 border border-red-300 text-red-700 p-3 rounded">
          {message}
        </p>
      )}

      <div className="bg-white shadow p-6 rounded-xl space-y-6">
        <h2 className="text-xl font-semibold">Order Summary</h2>

        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between border-b pb-3"
          >
            <span>
              {item.name} × {item.qty}
            </span>
            <span className="font-semibold">₹{item.price * item.qty}</span>
          </div>
        ))}

        <div className="flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span className="text-blue-700">₹{total}</span>
        </div>

        <button
          onClick={placeOrder}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-lg disabled:bg-gray-400"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
