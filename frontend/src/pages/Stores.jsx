import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getStores();
  }, []);

  const getStores = async () => {
    const res = await api.get("/admin/stores");
    setStores(res.data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Stores
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-white shadow-lg rounded-xl p-6"
          >
            <h2 className="font-bold text-xl">
              {store.name}
            </h2>

            <p>{store.email}</p>

            <p>{store.address}</p>

            <p className="mt-3">
              ⭐ {store.rating}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}