import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  return (
    <div className="bg-darkBackground text-lightText min-h-screen pt-8">
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <div className="flex flex-col md:flex-row gap-8">
          <AdminMenu />
          <div className="w-full md:ml-20 p-3 animate-slideInRight">
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">
              All Products ({products?.length || 0})
            </h2>
            {isLoading ? (
              <Loader />
            ) : isError ? (
              <Message variant="danger">Error loading products.</Message>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <Link
                    key={product._id}
                    to={`/admin/product/update/${product._id}`}
                    className="block bg-gray-900 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col h-full">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4 flex flex-col justify-between flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-xl font-semibold text-lightText">
                            {product?.name}
                          </h5>
                          <p className="text-gray-400 text-xs font-medium">
                            {moment(product.createdAt).format("MMMM Do YYYY")}
                          </p>
                        </div>

                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                          {product?.description?.substring(0, 100)}...
                        </p>

                        <div className="flex justify-between items-center mt-auto">
                          <Link
                            to={`/admin/product/update/${product._id}`}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary rounded-full hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-primary transition-all duration-300 transform hover:scale-105"
                          >
                            Update Product
                            <svg
                              className="w-3.5 h-3.5 ml-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 10"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                              />
                            </svg>
                          </Link>
                          <p className="text-2xl font-bold text-secondary">$ {product?.price}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
