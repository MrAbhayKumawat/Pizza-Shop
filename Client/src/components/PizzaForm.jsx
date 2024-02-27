import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "./actions";

const PizzaForm = () => {
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [base, setBase] = useState("");
  const [error, setError] = useState(""); // State to manage form validation error
  const dispatch = useDispatch();
  const ordersInProgress = useSelector((state) => state.ordersInProgress);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type.trim() || !size.trim() || !base.trim()) {
      setError("All fields are required"); // Set error message if any field is empty
    } else if (ordersInProgress.length >= 10) {
      setError("Not taking any more orders for now"); // Display an alert if the maximum limit is reached
    } else {
      dispatch(placeOrder({ type, size, base }));
      setType("");
      setSize("");
      setBase("");
      setError(""); // Clear error message upon successful submission
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-3 text-start">
        Place Pizza Order
      </h1>
      <form className="mt-5 lg:flex  xl:flex  gap-5 ">
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          placeholder="Enter type here..."
        />
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          placeholder="Enter Size  here..."
        />
        <input
          type="text"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          placeholder="Enter Base here..."
        />
      </form>
      <div className="flex justify-around">
        <p className="text-xs text-gray-400 mt-2">Ex :- Veg, Non-Veg</p>
        <p className="text-xs text-gray-400 mt-2">Ex :- Large, Medium, Small</p>
        <p className="text-xs text-gray-400 mt-2">Ex :- Thin, Thick</p>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
      <button
        type="submit"
        className="bg-green-700 p-2 w-full mt-3 text-white rounded-sm"
        onClick={handleSubmit}
      >
        Place Order
      </button>
      {ordersInProgress.length >= 10 && (
        <p className="text-red-500 mt-5">Not taking any order for now</p>
      )}
    </div>
  );
};

export default PizzaForm;
