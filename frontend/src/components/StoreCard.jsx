import { useState } from "react";

export default function StoreCard({
  store,
  submitRating,
}) {
  const [rating, setRating] = useState(
    store.myRating || 0
  );

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold">
        {store.name}
      </h2>

      <p className="text-gray-600">
        {store.address}
      </p>

      <div className="mt-3">
        <span className="font-semibold">
          Overall Rating:
        </span>{" "}
        ⭐ {store.overallRating || 0}
      </div>

      <div className="mt-3">
        <span className="font-semibold">
          Your Rating:
        </span>
        {store.myRating
          ? ` ⭐ ${store.myRating}`
          : " Not rated"}
      </div>

      <div className="flex gap-2 mt-5">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => setRating(num)}
            className={`text-2xl ${
              rating >= num
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <button
        onClick={() =>
          submitRating(store.id, rating)
        }
        className="mt-5 bg-green-600 text-white px-5 py-2 rounded"
      >
        {store.myRating
          ? "Update Rating"
          : "Submit Rating"}
      </button>
    </div>
  );
}