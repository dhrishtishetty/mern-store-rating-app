import { useState } from "react";
import api from "../api/axios";

export default function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/users", form);
      alert("User Created");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Create User
      </h1>

      <form
        onSubmit={submit}
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >
        {Object.keys(form).map(
          (key) =>
            key !== "role" && (
              <input
                key={key}
                name={key}
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
            )
        )}

        <select
          className="w-full border p-3 rounded"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
        >
          <option>USER</option>
          <option>ADMIN</option>
          <option>OWNER</option>
        </select>

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Create
        </button>
      </form>
    </div>
  );
}