import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`fixed top-4 right-4 z-50 bg-gray-800 p-3 rounded-lg shadow-lg text-lightText transition-all duration-300 transform hover:scale-110`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes size={24} color="white" />
        ) : (
          <AiOutlineMenu size={24} color="white" />
        )}
      </button>

      {isMenuOpen && (
        <section className={`fixed top-0 left-0 h-full w-64 bg-gray-900 z-40 p-6 shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-end mb-6 md:hidden">
            <button onClick={toggleMenu} className="text-lightText hover:text-primary transition-colors duration-300">
              <FaTimes size={28} />
            </button>
          </div>
          <ul className="list-none space-y-4">
            <li>
              <NavLink
                className="flex items-center py-2 px-4 rounded-lg text-lightText hover:bg-primary hover:text-white transition-all duration-300"
                to="/admin/dashboard"
                onClick={toggleMenu}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex items-center py-2 px-4 rounded-lg text-lightText hover:bg-primary hover:text-white transition-all duration-300"
                to="/admin/categorylist"
                onClick={toggleMenu}
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex items-center py-2 px-4 rounded-lg text-lightText hover:bg-primary hover:text-white transition-all duration-300"
                to="/admin/productlist"
                onClick={toggleMenu}
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex items-center py-2 px-4 rounded-lg text-lightText hover:bg-primary hover:text-white transition-all duration-300"
                to="/admin/allproductslist"
                onClick={toggleMenu}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex items-center py-2 px-4 rounded-lg text-lightText hover:bg-primary hover:text-white transition-all duration-300"
                to="/admin/userlist"
                onClick={toggleMenu}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex items-center py-2 px-4 rounded-lg text-lightText hover:bg-primary hover:text-white transition-all duration-300"
                to="/admin/orderlist"
                onClick={toggleMenu}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
