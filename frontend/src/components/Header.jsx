import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1 className="text-red-500 text-center py-4">ERROR: {error.message}</h1>;
  }

  return (
    <>
      <div className="flex justify-around items-center bg-darkBackground py-8 animate-fadeIn">
        <div className="xl:block lg:hidden md:hidden sm:hidden">
          <div className="grid grid-cols-2 gap-4">
            {data.map((product, index) => (
              <div key={product._id} className="animate-slideInLeft" style={{ animationDelay: `${index * 0.1}s` }}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className="animate-slideInRight">
          <ProductCarousel />
        </div>
      </div>
    </>
  );
};

export default Header;
