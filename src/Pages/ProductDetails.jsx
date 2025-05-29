import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  useEffect(() => {
    if (!product) {
      navigate("/products");
    }
  }, [product, navigate]);

  if (!product) return null;

  const handleBuyNow = () => {
    Swal.fire({
      title: "Thank you for your purchase!",
      icon: "success",
      confirmButtonText: "Go to Home",
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        {/* Video Section */}
        <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
          {product.video?.secure_url ? (
            <video
              className="w-full max-h-[520px]  rounded-2xl shadow-lg"
              controls autoPlay
              poster={product.images?.[0]?.secure_url || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
              src={product.video.secure_url}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <p className="text-red-500">Video not available</p>
          )}
        </div>

        {/* Info Section */}
        <div className="lg:ml-10">
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <p className="py-6 text-gray-700 whitespace-pre-line">{product.description}</p>
          <p className="text-3xl font-semibold text-green-600 mb-6">{product.price} BDT</p>
          <button onClick={handleBuyNow} className="btn btn-primary">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
