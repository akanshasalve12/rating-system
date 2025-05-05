import React, { useState } from "react";

const RatingForm: React.FC = () => {
  const [storeId, setStoreId] = useState("");
  const [rating, setRating] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Store ID:", storeId);
    console.log("Rating:", rating);
    // TODO: Send POST request to backend
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Submit a Rating</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="storeId" className="block font-medium">
            Store ID
          </label>
          <input
            id="storeId"
            type="text"
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="rating" className="block font-medium">
            Rating (1 to 5)
          </label>
          <input
            id="rating"
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RatingForm;
