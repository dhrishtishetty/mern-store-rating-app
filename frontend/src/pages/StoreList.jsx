import { useEffect, useState } from "react";
import api from "../api/axios.js";
import StoreCard from "../components/StoreCard.jsx";

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStores = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/user/stores?search=${search}`
      );

      setStores(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const submitRating = async (storeId, rating) => {
    try {
      await api.post(
        `/user/stores/${storeId}/rate`,
        {
          rating,
        }
      );

      fetchStores();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Stores
      </h1>

      <div className="flex gap-3 mb-6">
        <input
          placeholder="Search store..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded w-full"
        />

        <button
          onClick={fetchStores}
          className="bg-blue-600 text-white px-6 rounded"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {stores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              submitRating={submitRating}
            />
          ))}
        </div>
      )}
    </div>
  );
}