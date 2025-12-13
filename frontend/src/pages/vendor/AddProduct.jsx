import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import SidebarVendor from "../../components/SidebarVendor";
import { productApi } from "../../utils/api";
import ImageUpload from "../../components/ImageUpload";

export default function AddProduct() {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [limitReached, setLimitReached] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadMyProducts = async () => {
      const res = await productApi.myProducts();
      setProducts(res || []);
      setLimitReached((res || []).length >= 10);
    };
    loadMyProducts();
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (limitReached) {
      setMessage("You cannot add more than 10 products.");
      return;
    }

    if (!imageUrl) {
      console.log("Image URL missing");
      setMessage("Please wait for image upload to complete.");
      return;
    }

    const payload = {
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
      category: form.category,
      description: form.description,
      imageUrl: imageUrl,
    };

    const res = await productApi.add(payload);

    if (res?.message) {
      setMessage(res.message);
      return;
    }

    setMessage("Product added successfully!");

    setForm({
      name: "",
      price: "",
      stock: "",
      category: "",
      description: "",
    });

    setImageUrl("");

    const newList = await productApi.myProducts();
    setProducts(newList || []);
    setLimitReached((newList || []).length >= 10);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarVendor />

      <div className="flex-1 p-10 space-y-8">
        <h1 className="text-3xl font-semibold">Add Product</h1>
        <p className="text-gray-600">
          Create a new product listing for your store.
        </p>

        {limitReached && (
          <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded-lg">
            <strong>Limit reached:</strong> You can only add up to 10 products.
          </div>
        )}

        {message && (
          <div className="bg-blue-100 text-blue-700 border border-blue-300 p-3 rounded-lg">
            {message}
          </div>
        )}

        {!limitReached && (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow rounded-xl p-6 w-full max-w-xl space-y-5"
          >
            <div className="flex flex-col">
              <label className="font-medium mb-1">Product Image</label>

              <ImageUpload
                folder={`/shopgara/products/${user?._id}`}
                onUploadSuccess={(url) => setImageUrl(url)}
              />

              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="preview"
                  className="mt-4 h-40 w-40 object-cover rounded-lg border"
                />
              )}
            </div>
            <div>
              <label className="font-medium">Product Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Cotton T-shirt"
                className="w-full border p-2 rounded mt-1"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1"
                  required
                />
              </div>

              <div>
                <label className="font-medium">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  className="w-full border p-2 rounded mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-medium">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1 bg-white"
                required
              >
                <option value="">Select Category</option>
                <option value="tshirt">T-shirt</option>
                <option value="shoes">Shoes</option>
                <option value="grocery">Grocery</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
              </select>
            </div>
            <div>
              <label className="font-medium">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your product..."
                className="w-full border p-2 rounded mt-1"
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              Add Product
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
