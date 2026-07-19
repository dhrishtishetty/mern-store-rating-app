import { useState } from "react";
import api from "../api/axios";

export default function CreateStore() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/stores", form);
      alert("Store Created");
    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
          "Failed to create store"
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Create Store
      </h1>

      <form
        onSubmit={submit}
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            value={form[key]}
            onChange={(e) =>
              setForm({
                ...form,
                [key]: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />
        ))}

        <button className="bg-green-600 text-white px-6 py-3 rounded">
          Create Store
        </button>
      </form>
    </div>
  );
}