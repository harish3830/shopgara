import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { orderApi } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

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

    if (address.trim().length < 10) {
      setMessage("Please enter a valid delivery address.");
      return;
    }

    const items = cart.map((item) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.qty,
    }));

    setLoading(true);

    const res = await orderApi.place(items);

    setLoading(false);

    if (res.message && !res._id) {
      setMessage(res.message);
      return;
    }

    // SUCCESS
    clearCart();
    navigate("/orders");
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
        {/* ORDER SUMMARY */}
        <h2 className="text-xl font-semibold">Order Summary</h2>

        {cart.map((item) => (
          <div key={item._id} className="flex justify-between border-b pb-3">
            <span>
              {item.name} × {item.qty}
            </span>
            <span >
              <span className="font-semibold">₹{item.price * item.qty}</span>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700 text-sm p-1" // Added padding for easier clicking
              >
                Remove
              </button>
              
            </span>
          </div>
        ))}

        <div className="flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span className="text-blue-700">₹{total}</span>
        </div>

        {/* SHIPPING ADDRESS */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Delivery Address</label>
          <textarea
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            rows={3}
            placeholder="Enter your complete address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
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
