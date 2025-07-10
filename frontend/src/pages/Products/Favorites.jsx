import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="bg-darkBackground text-lightText min-h-screen pt-8">
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center animate-slideInLeft">
          Favorite Products
        </h1>

        {favorites.length === 0 ? (
          <div className="text-center text-lightText text-lg animate-fadeIn">
            No favorite products yet. Start adding some!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favorites.map((product, index) => (
              <div key={product._id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
