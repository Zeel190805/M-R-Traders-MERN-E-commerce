import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage, { isLoading: uploadingImage }] = useUploadProductImageMutation();
  const [createProduct, { isLoading: creatingProduct }] = useCreateProductMutation();
  const { data: categories, isLoading: loadingCategories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/admin/allproductslist"); // Navigate to all products list after creation
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="bg-darkBackground text-lightText min-h-screen pt-8">
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <AdminMenu />
        <div className="md:ml-20 p-3 w-full animate-slideInRight">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Create Product</h2>

          {imageUrl && (
            <div className="text-center mb-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px] rounded-lg shadow-md border border-gray-700"
              />
            </div>
          )}

          <div className="mb-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <label className="bg-gray-800 border border-primary text-primary px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-6 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105">
              {image ? image : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
            {uploadingImage && <Loader />}
          </div>

          <form onSubmit={handleSubmit} className="p-3 bg-gray-900 rounded-lg shadow-xl animate-fadeIn" style={{ animationDelay: '0.4s' }}>
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

            <button
              onClick={handleSubmit}
              className="bg-primary text-white py-3 px-6 rounded-full mt-4 shadow-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 w-full"
            >
              {creatingProduct ? "Creating Product..." : "Submit"}
            </button>
            {creatingProduct && <Loader />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
