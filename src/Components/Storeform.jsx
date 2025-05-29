import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const StoreForm = () => {
  const [storeName, setStoreName] = useState("");
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("Bangladesh");
  const [category, setCategory] = useState("Fashion");
  const [currency, setCurrency] = useState("BDT");
  const [domainAvailable, setDomainAvailable] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate(); // for redirecting

  const isStoreNameValid = storeName.length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isDomainValid = domain.length >= 3 && domainAvailable;

  // Domain availability checker
  useEffect(() => {
    const checkDomain = async () => {
      if (domain.length < 3) {
        setDomainAvailable(null);
        return;
      }
      try {
        const fullDomain = `${domain}.expressitbd.com`;
        const res = await axios.get(
          `https://interview-task-green.vercel.app/task/domains/check/${fullDomain}`
        );
        setDomainAvailable(!res.data.taken);
      } catch {
        setDomainAvailable(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      checkDomain();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [domain]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isStoreNameValid || !isEmailValid || !isDomainValid) return;

    const payload = {
      name: storeName,
      currency,
      country: location,
      domain,
      category,
      email,
    };

    try {
      await axios.post(
        "https://interview-task-green.vercel.app/task/stores/create",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Swal.fire({
        title: "Store created successfully!",
        icon: "success",
        draggable: true,
      });

      // ✅ Redirect after success
      navigate("/products");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded-md w-full max-w-xl space-y-6"
      >
        <h2 className="text-2xl font-semibold">Create a store</h2>
        <p className="text-gray-600">
          Add your basic store information and complete the setup
        </p>

        {/* Store Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Give your online store a name
          </label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none ${
              submitted && !isStoreNameValid
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="e.g. QuickMart"
          />
          {submitted && !isStoreNameValid && (
            <p className="text-red-500 text-sm mt-1">
              Store name must be at least 3 characters long
            </p>
          )}
        </div>

        {/* Domain */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Your online store subdomain
          </label>
          <div className="flex items-center mt-1">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className={`w-full px-4 py-2 border rounded-l-md focus:outline-none ${
                submitted && !isDomainValid
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="yourstore"
            />
            <span className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-gray-600 text-sm">
              .expressitbd.com
            </span>
          </div>
          {domain.length >= 3 && domainAvailable === false && (
            <p className="text-red-500 text-sm mt-1">
              Not Available Domain, Re-enter!
            </p>
          )}
          {domain.length >= 3 && domainAvailable === true && (
            <p className="text-green-600 text-sm mt-1">
              ✅ Domain is available
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Where's your store located?
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option>Bangladesh</option>
            <option>India</option>
            <option>USA</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            What's your Category?
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option>Fashion</option>
            <option>Electronics</option>
            <option>Grocery</option>
          </select>
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Choose store currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="BDT">BDT (Taka)</option>
            <option value="USD">USD (Dollar)</option>
            <option value="INR">INR (Rupee)</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Store contact email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none ${
              submitted && !isEmailValid ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="yourstore@email.com"
          />
          {submitted && !isEmailValid && (
            <p className="text-red-500 text-sm mt-1">Invalid email format!</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isStoreNameValid || !isDomainValid || !isEmailValid}
          className={`w-full py-2 rounded-md text-white font-medium ${
            !isStoreNameValid || !isDomainValid || !isEmailValid
              ? "bg-purple-200 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          Create store
        </button>
      </form>
    </div>
  );
};

export default StoreForm;
