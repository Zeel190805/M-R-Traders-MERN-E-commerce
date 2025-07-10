import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="bg-darkBackground text-lightText min-h-screen pt-8">
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <ProgressSteps step1 step2 step3 />

        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-xl p-6 animate-slideInRight">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <td className="px-4 py-3 text-left text-primary font-semibold">Image</td>
                  <td className="px-4 py-3 text-left text-primary font-semibold">Product</td>
                  <td className="px-4 py-3 text-left text-primary font-semibold">Quantity</td>
                  <td className="px-4 py-3 text-left text-primary font-semibold">Price</td>
                  <td className="px-4 py-3 text-left text-primary font-semibold">Total</td>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-800 transition-colors duration-200">
                    <td className="p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>

                    <td className="p-4">
                      <Link to={`/product/${item.product}`} className="text-lightText hover:text-primary transition-colors duration-200">
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-4 text-lightText">{item.qty}</td>
                    <td className="p-4 text-lightText">${item.price.toFixed(2)}</td>
                    <td className="p-4 text-primary font-semibold">
                      ${(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 bg-gray-900 rounded-lg shadow-xl p-8 animate-slideInRight">
          <h2 className="text-3xl font-bold text-primary mb-6">Order Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">Order Details</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-lightText">Items:</span>
                  <span className="text-primary font-semibold">${cart.itemsPrice}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-lightText">Shipping:</span>
                  <span className="text-primary font-semibold">${cart.shippingPrice}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-lightText">Tax:</span>
                  <span className="text-primary font-semibold">${cart.taxPrice}</span>
                </li>
                <li className="flex justify-between border-t border-gray-700 pt-3 mt-3">
                  <span className="text-lightText font-semibold">Total:</span>
                  <span className="text-primary font-bold">${cart.totalPrice}</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">Shipping Address</h3>
              <p className="text-lightText">
                {cart.shippingAddress.address},<br />
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}<br />
                {cart.shippingAddress.country}
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">Payment Method</h3>
              <p className="text-lightText">
                <span className="font-semibold">Method:</span> {cart.paymentMethod}
              </p>
            </div>
          </div>

          {error && <Message variant="danger" className="mt-4">{error.data.message}</Message>}

          <button
            type="button"
            className="w-full bg-primary text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 mt-8"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
