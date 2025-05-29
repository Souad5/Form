import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://glore-bd-backend-node-mongo.vercel.app/api/product")
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setProducts(res.data.data);
          setError("");
        } else {
          setError("Unexpected data format");
          setProducts([]);
        }
      })
      .catch(() => {
        setError("Failed to load products");
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-600 mt-10 text-lg font-semibold">{error}</p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            state={{ product }}
          >
            <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
              <img
                src={
                  product.images?.[0]?.secure_url ||
                  "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                }
                alt={product.name}
                className="object-cover w-full h-[420px] transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h2>
              <p className="mt-2 text-gray-600 line-clamp-3">{product.description}</p>
              <p className="mt-4 font-bold text-green-600">{product.price} BDT</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Product;
