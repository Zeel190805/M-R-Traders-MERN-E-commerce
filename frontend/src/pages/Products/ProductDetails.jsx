import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="bg-darkBackground text-lightText min-h-screen pt-8">
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <div className="flex flex-wrap relative items-center mt-8 md:ml-10 justify-center lg:justify-start">
            <div className="animate-slideInLeft mr-4 mb-8 lg:mb-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-lg object-cover rounded-lg shadow-xl"
              />

              <HeartIcon product={product} />
            </div>

            <div className="flex flex-col justify-between p-4 bg-gray-900 rounded-lg shadow-xl animate-slideInRight flex-grow max-w-xl">
              <h2 className="text-3xl font-bold text-primary mb-3">{product.name}</h2>
              <p className="my-4 text-lightText leading-relaxed">
                {product.description}
              </p>

              <p className="text-5xl my-4 font-extrabold text-primary">$ {product.price}</p>

              <div className="grid grid-cols-2 gap-4 text-lightText text-sm mb-6">
                <div className="flex items-center">
                  <FaStore className="mr-2 text-secondary" /> Brand:{" "}
                  <span className="font-medium ml-1">{product.brand}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2 text-secondary" /> Added:{" "}
                  <span className="font-medium ml-1">{moment(product.createAt).fromNow()}</span>
                </div>
                <div className="flex items-center">
                  <FaStar className="mr-2 text-secondary" /> Reviews:{" "}
                  <span className="font-medium ml-1">{product.numReviews}</span>
                </div>
                <div className="flex items-center">
                  <FaShoppingCart className="mr-2 text-secondary" /> Quantity:{" "}
                  <span className="font-medium ml-1">{product.quantity}</span>
                </div>
                <div className="flex items-center">
                  <FaBox className="mr-2 text-secondary" /> In Stock:{" "}
                  <span className="font-medium ml-1">{product.countInStock}</span>
                </div>
              </div>

              <div className="flex justify-between items-center flex-wrap mb-6">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-24 rounded-lg text-black bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-primary text-white py-3 px-6 rounded-full mt-4 md:mt-0 shadow-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="mt-12 w-full animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
