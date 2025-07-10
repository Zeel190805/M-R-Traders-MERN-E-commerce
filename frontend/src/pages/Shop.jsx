import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import Message from "../components/Message";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Add "All Brands" option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };

  return (
    <div className="bg-darkBackground text-lightText min-h-screen pt-8">
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="w-full md:w-1/4 bg-gray-900 p-6 rounded-lg shadow-xl animate-slideInLeft">
            <h2 className="text-xl font-bold text-center text-primary py-3 rounded-full mb-4">
              Filter by Categories
            </h2>

            <div className="p-4">
              {categories?.map((c) => (
                <div key={c._id} className="mb-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${c._id}`}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
                    />
                    <label
                      htmlFor={`category-${c._id}`}
                      className="ml-3 text-sm font-medium text-lightText"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold text-center text-primary py-3 rounded-full mb-4">
              Filter by Brands
            </h2>

            <div className="p-4">
              {uniqueBrands?.map((brand) => (
                <div key={brand} className="mb-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`brand-${brand}`}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 text-primary bg-gray-700 border-gray-600 focus:ring-primary focus:ring-2"
                    />
                    <label
                      htmlFor={`brand-${brand}`}
                      className="ml-3 text-sm font-medium text-lightText"
                    >
                      {brand}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold text-center text-primary py-3 rounded-full mb-4">
              Filter by Price
            </h2>

            <div className="p-4">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-4 py-2 bg-gray-700 text-lightText border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500"
              />
            </div>

            <div className="p-4 pt-0">
              <button
                className="w-full bg-secondary text-white font-bold py-2 rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Product Display */}
          <div className="w-full md:w-3/4 p-3 animate-slideInRight">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">
              {products?.length} Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length === 0 ? (
                <Message variant="info">No products found.</Message>
              ) : (
                products?.map((p, index) => (
                  <div key={p._id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
