import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const AdminProductUpdate = () => {
  const params = useParams();

  const { data: productData, isLoading: loadingProduct, refetch } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);

  const navigate = useNavigate();

  const { data: categories = [], isLoading: loadingCategories } = useFetchCategoriesQuery();

  const [uploadProductImage, { isLoading: uploadingImage }] = useUploadProductImageMutation();

  const [updateProduct, { isLoading: updatingProduct }] = useUpdateProductMutation();

  const [deleteProduct, { isLoading: deletingProduct }] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`Product successfully updated`);
        navigate("/admin/allproductslist");
        refetch();
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`);
      navigate("/admin/allproductslist");
      refetch();
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
    }
  };

  return (
    <div className="bg-darkBackground text-lightText min-h-screen pt-8">
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <AdminMenu />
        <div className="md:ml-20 p-3 w-full animate-slideInRight">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Update / Delete Product</h2>

          {loadingProduct || loadingCategories ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-xl animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              {image && (
                <div className="text-center mb-6">
                  <img
                    src={image}
                    alt="product"
                    className="block mx-auto max-h-48 rounded-lg shadow-md border border-gray-700"
                  />
                </div>
              )}

              <div className="mb-6">
                <label className="bg-gray-800 border border-primary text-primary px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-6 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105">
                  {image ? image : "Upload Image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={uploadFileHandler}
                    className="hidden"
                  />
                </label>
                {uploadingImage && <Loader />}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-lightText text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-lightText border-gray-600 focus:ring-2 focus:ring-primary"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-lightText text-sm font-bold mb-2">Price</label>
                  <input
                    type="number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-lightText border-gray-600 focus:ring-2 focus:ring-primary"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="quantity" className="block text-lightText text-sm font-bold mb-2">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-lightText border-gray-600 focus:ring-2 focus:ring-primary"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="brand" className="block text-lightText text-sm font-bold mb-2">Brand</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-lightText border-gray-600 focus:ring-2 focus:ring-primary"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-lightText text-sm font-bold mb-2">Description</label>
                <textarea
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-lightText border-gray-600 focus:ring-2 focus:ring-primary"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="stock" className="block text-lightText text-sm font-bold mb-2">Count In Stock</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-lightText border-gray-600 focus:ring-2 focus:ring-primary"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-lightText text-sm font-bold mb-2">Category</label>
                  <select
                    placeholder="Choose Category"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-lightText border-gray-600 focus:ring-2 focus:ring-primary"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {loadingCategories ? (
                      <option>Loading Categories...</option>
                    ) : (
                      categories?.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-primary text-white py-3 px-6 rounded-full shadow-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105"
                  disabled={updatingProduct}
                >
                  {updatingProduct ? "Updating..." : "Update"}
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                  disabled={deletingProduct}
                >
                  {deletingProduct ? "Deleting..." : "Delete"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
