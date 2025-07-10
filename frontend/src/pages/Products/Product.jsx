import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[30rem] mx-auto p-3 relative bg-gray-900 rounded-lg shadow-lg">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center mb-2">
            <div className="text-lg font-semibold text-lightText">{product.name}</div>
            <span className="bg-primary text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
              $ {product.price}
            </span>
          </h2>
        </Link>
        <p className="text-gray-400 text-sm">{product.description.substring(0, 50)}...</p>
      </div>
    </div>
  );
};

export default Product;
