import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import SidebarVendor from "../../components/SidebarVendor";
import { productApi } from "../../utils/api";

export default function VendorProducts() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  // Edit modal state
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  // ---------------- FETCH PRODUCTS FROM BACKEND ----------------
  const loadProducts = async () => {
    const res = await productApi.myProducts(); // vendor-owned products
    setProducts(res || []);
  };

  // ---------------- OPEN EDIT MODAL ----------------
  const openEdit = (product) => {
    setEditing(product);
    setEditForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      description: product.description,
    });
  };

  // ---------------- HANDLE FORM CHANGE ----------------
  const handleEditChange = (e) => {
    setEditForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // ---------------- SAVE EDITED PRODUCT ----------------
  const saveProduct = async () => {
    const updated = {
      name: editForm.name,
      price: Number(editForm.price),
      stock: Number(editForm.stock),
      category: editForm.category,
      description: editForm.description,
    };

    const res = await productApi.update(editing._id, updated);

    if (res?.message) {
      setMessage(res.message);
    } else {
      setMessage("Product updated successfully!");
    }

    setEditing(null);
    loadProducts();
  };

  // ---------------- DELETE PRODUCT ----------------
  const deleteProduct = async (id) => {
    const res = await productApi.remove(id);

    if (res?.message) {
      setMessage(res.message);
    } else {
      setMessage("Product deleted!");
    }

    loadProducts();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarVendor />

      <div className="flex-1 p-10 space-y-8">

        <h1 className="text-3xl font-semibold">My Products</h1>
        <p className="text-gray-600">Manage and edit your product inventory.</p>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded">
            {message}
          </div>
        )}

        {/* PRODUCT TABLE */}
        <div className="bg-white shadow rounded-xl p-6">
          {products.length === 0 ? (
            <p className="text-gray-500">You haven't added any products yet.</p>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border">Image</th>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Category</th>
                  <th className="p-3 border">Price</th>
                  <th className="p-3 border">Stock</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border">
                    <td className="p-3 border w-24">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="h-16 w-16 object-cover rounded"
                      />
                    </td>

                    <td className="p-3 border">{p.name}</td>
                    <td className="p-3 border capitalize">{p.category}</td>
                    <td className="p-3 border">₹{p.price}</td>
                    <td className="p-3 border">{p.stock}</td>

                    <td className="p-3 flex gap-2">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() => openEdit(p)}
                      >
                        Edit
                      </button>

                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={() => deleteProduct(p._id)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* EDIT PRODUCT MODAL */}
        {editing && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4">
            <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-lg">

              <h2 className="text-xl font-bold mb-4">Edit Product</h2>

              <div className="space-y-3">

                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full border p-2 rounded"
                  placeholder="Product Name"
                />

                <input
                  name="price"
                  type="number"
                  value={editForm.price}
                  onChange={handleEditChange}
                  className="w-full border p-2 rounded"
                  placeholder="Price"
                />

                <input
                  name="stock"
                  type="number"
                  value={editForm.stock}
                  onChange={handleEditChange}
                  className="w-full border p-2 rounded"
                  placeholder="Stock"
                />

                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  className="w-full border p-2 rounded bg-white"
                >
                  <option value="">Select category</option>
                  <option value="tshirt">T-shirt</option>
                  <option value="shoes">Shoes</option>
                  <option value="grocery">Grocery</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                </select>

                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="w-full border p-2 rounded"
                  rows="4"
                  placeholder="Description"
                />

              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={saveProduct}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
