import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="bg-darkBackground text-lightText min-h-screen pt-8">
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <ProgressSteps step1 step2 />
        <div className="mt-16 flex justify-center items-center">
          <form onSubmit={submitHandler} className="w-full max-w-2xl bg-gray-900 p-8 rounded-lg shadow-xl animate-slideInRight">
            <h1 className="text-3xl font-bold text-primary mb-6 text-center">Shipping Information</h1>
            <div className="mb-6">
              <label className="block text-lightText mb-2 font-medium">Address</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-800 text-lightText border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500"
                placeholder="Enter address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-lightText mb-2 font-medium">City</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-800 text-lightText border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500"
                placeholder="Enter city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-lightText mb-2 font-medium">Postal Code</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-800 text-lightText border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500"
                placeholder="Enter postal code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-lightText mb-2 font-medium">Country</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-800 text-lightText border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500"
                placeholder="Enter country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="mb-8">
              <label className="block text-lightText mb-4 font-medium">Payment Method</label>
              <div className="bg-gray-800 p-4 rounded-lg">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    className="w-5 h-5 text-primary bg-gray-700 border-gray-600 focus:ring-primary focus:ring-2"
                    name="paymentMethod"
                    value="PayPal"
                    checked={paymentMethod === "PayPal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="text-lightText">PayPal or Credit Card</span>
                </label>
              </div>
            </div>

            <button
              className="w-full bg-primary text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105"
              type="submit"
            >
              Continue to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
