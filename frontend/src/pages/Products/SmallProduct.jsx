import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] mx-auto p-3 relative bg-gray-900 rounded-lg shadow-lg">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center mb-2">
            <div className="text-md font-semibold text-lightText">{product.name}</div>
            <span className="bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
              ${product.price}
            </span>
          </h2>
        </Link>
        <p className="text-gray-400 text-sm">{product.description.substring(0, 30)}...</p>
      </div>
    </div>
  );
};

export default SmallProduct;
