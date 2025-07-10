import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <div className="bg-darkBackground text-lightText min-h-screen pt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 animate-fadeIn">
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 md:mb-0 animate-slideInLeft">
                Special Products
              </h1>

              <Link
                to="/shop"
                className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 animate-slideInRight"
              >
                Shop All Products
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {data.products.map((product, index) => (
                <div key={product._id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
