import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { productApi } from "../utils/api";

export default function Products() {
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const categories = ["tshirt", "shoes", "grocery", "electronics", "fashion"];
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const res = await productApi.getAll();
      setProducts(Array.isArray(res) ? res : []);
      setLoading(false);
    };
    loadProducts();
  }, []);
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? p.category === category : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="text-center py-14 bg-white shadow-sm">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-wide">
          Explore Products
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Discover quality items curated for your lifestyle
        </p>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full md:w-1/2 border p-3 rounded-xl shadow focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border p-3 rounded-xl shadow bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="capitalize">
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {loading ? (
            <p className="text-center text-gray-500 col-span-full">
              Loading products...
            </p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-gray-600 text-center col-span-full">
              No products found.
            </p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-5 border border-gray-200 flex flex-col">
      {/* IMAGE */}
      <div className="rounded-xl overflow-hidden">
        <img
          src={
            product.imageUrl ||
            "https://via.placeholder.com/500x350?text=No+Image"
          }
          alt={product.name}
          className="h-52 w-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mt-4">
        {product.name}
      </h2>

      <p className="text-sm text-gray-500 mt-1 capitalize">
        {product.category}
      </p>

      <p className="text-2xl font-bold text-blue-600 mt-4">₹{product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="mt-auto bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg"
      >
        Add to Cart
      </button>
    </div>
  );
}
