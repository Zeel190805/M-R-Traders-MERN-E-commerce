import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import Message from "../components/Message";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="bg-darkBackground text-lightText min-h-screen pt-8">
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        {cartItems.length === 0 ? (
          <div className="text-center text-lightText text-xl animate-fadeIn">
            Your cart is empty. <Link to="/shop" className="text-secondary hover:underline transition-colors duration-300">Go To Shop</Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-center items-start gap-8">
            <div className="flex flex-col w-full md:w-3/4 animate-slideInLeft">
              <h1 className="text-3xl font-bold text-primary mb-6">Shopping Cart</h1>

              {cartItems.map((item, index) => (
                <div key={item._id} className="flex items-center mb-4 p-4 bg-gray-900 rounded-lg shadow-md animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-24 h-24 mr-4 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-1">
                    <Link to={`/product/${item._id}`} className="text-secondary text-lg font-semibold hover:underline transition-colors duration-300">
                      {item.name}
                    </Link>

                    <div className="mt-1 text-lightText text-sm">Brand: {item.brand}</div>
                    <div className="mt-1 text-primary font-bold text-lg">
                      $ {item.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="w-24 mr-4">
                    <select
                      className="w-full p-2 border rounded-lg text-black bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors duration-300 p-2 rounded-full"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full md:w-1/4 animate-slideInRight">
              <div className="p-6 rounded-lg shadow-xl bg-gray-900 border border-gray-700">
                <h2 className="text-2xl font-bold text-primary mb-4 border-b border-gray-700 pb-3">
                  Order Summary
                </h2>

                <p className="text-lightText mb-2">
                  Items: <span className="font-semibold">({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                </p>

                <div className="text-3xl font-extrabold text-primary mb-6">
                  Total: {" "}
                  ${" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </div>

                <button
                  className="bg-primary hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full w-full shadow-lg transition-all duration-300 transform hover:scale-105"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
