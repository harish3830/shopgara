import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded-lg mb-4"
      />

      <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>

      <p className="text-sm text-gray-500 capitalize">{product.type}</p>

      <div className="mt-3">
        <p className="text-xl font-bold text-blue-600">₹{product.price}</p>
      </div>

      <button
        onClick={() => addToCart(product)}
        className="mt-auto bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
