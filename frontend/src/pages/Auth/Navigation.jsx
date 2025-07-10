import { useState, useRef, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineDashboard,
  AiOutlineAppstore,
  AiOutlineUser,
  AiOutlineOrderedList,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#000] text-white z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-10">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <div className="text-2xl font-bold tracking-wider">
                  <span className="text-pink-500">M</span>
                  <span className="text-white">R</span>
                </div>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></div>
              </div>
            </Link>

            <Link to="/" className="relative group">
              <div className="flex items-center hover:text-pink-500 transition-colors duration-300">
                <AiOutlineHome size={20} />
                <span className="ml-2">Home</span>
              </div>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></div>
            </Link>

            <Link to="/shop" className="relative group">
              <div className="flex items-center hover:text-pink-500 transition-colors duration-300">
                <AiOutlineShopping size={20} />
                <span className="ml-2">Shop</span>
              </div>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></div>
            </Link>

            <Link to="/cart" className="relative group">
              <div className="flex items-center hover:text-pink-500 transition-colors duration-300">
                <AiOutlineShoppingCart size={20} />
                <span className="ml-2">Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-bounce">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></div>
            </Link>

            <Link to="/favorite" className="relative group">
              <div className="flex items-center hover:text-pink-500 transition-colors duration-300">
                <FaHeart size={20} />
                <span className="ml-2">Favorites</span>
                <FavoritesCount />
              </div>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></div>
            </Link>
          </div>

          {/* Right side - User Menu */}
          <div className="flex items-center space-x-9">
            {userInfo ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 hover:text-pink-500 transition-colors duration-300 group"
                >
                  <span className="font-medium">{userInfo.username}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 text-black transform transition-all duration-300 ease-in-out ${
                    dropdownOpen
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  {userInfo.isAdmin && (
                    <div className="px-4 py-2 border-b border-gray-100">
                      <span className="text-xs text-gray-500 uppercase">Admin Panel</span>
                      <div className="mt-2 space-y-1">
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center px-2 py-1.5 text-sm hover:bg-pink-50 hover:text-pink-500 rounded-md transition-colors duration-200"
                        >
                          <AiOutlineDashboard className="mr-2" /> Dashboard
                        </Link>
                        <Link
                          to="/admin/productlist"
                          className="flex items-center px-2 py-1.5 text-sm hover:bg-pink-50 hover:text-pink-500 rounded-md transition-colors duration-200"
                        >
                          <AiOutlineAppstore className="mr-2" /> Products
                        </Link>
                        <Link
                          to="/admin/categorylist"
                          className="flex items-center px-2 py-1.5 text-sm hover:bg-pink-50 hover:text-pink-500 rounded-md transition-colors duration-200"
                        >
                          <AiOutlineAppstore className="mr-2" /> Categories
                        </Link>
                        <Link
                          to="/admin/orderlist"
                          className="flex items-center px-2 py-1.5 text-sm hover:bg-pink-50 hover:text-pink-500 rounded-md transition-colors duration-200"
                        >
                          <AiOutlineOrderedList className="mr-2" /> Orders
                        </Link>
                        <Link
                          to="/admin/userlist"
                          className="flex items-center px-2 py-1.5 text-sm hover:bg-pink-50 hover:text-pink-500 rounded-md transition-colors duration-200"
                        >
                          <AiOutlineUser className="mr-2" /> Users
                        </Link>
                      </div>
                    </div>
                  )}
                  <div className="px-4 py-2">
                    <Link
                      to="/profile"
                      className="flex items-center px-2 py-1.5 text-sm hover:bg-pink-50 hover:text-pink-500 rounded-md transition-colors duration-200"
                    >
                      <AiOutlineUser className="mr-2" /> Profile
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className="flex items-center w-full px-2 py-1.5 text-sm hover:bg-pink-50 hover:text-pink-500 rounded-md transition-colors duration-200"
                    >
                      <AiOutlineLogout className="mr-2" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="relative group">
                  <div className="flex items-center hover:text-pink-500 transition-colors duration-300">
                    <AiOutlineLogin size={20} />
                    <span className="ml-2">Login</span>
                  </div>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></div>
                </Link>
                <Link to="/register" className="relative group">
                  <div className="flex items-center hover:text-pink-500 transition-colors duration-300">
                    <AiOutlineUserAdd size={20} />
                    <span className="ml-2">Register</span>
                  </div>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full"></div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
