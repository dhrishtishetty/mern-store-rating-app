import { useState } from "react";
import api from "../api/axios";

export default function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    await api.put(
      "/auth/change-password",
      form
    );

    alert("Password Updated");
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            Change Password
          </h2>

          <input
            className="input input-bordered"
            placeholder="Old Password"
            onChange={(e) =>
              setForm({
                ...form,
                oldPassword: e.target.value,
              })
            }
          />

          <input
            className="input input-bordered"
            placeholder="New Password"
            onChange={(e) =>
              setForm({
                ...form,
                newPassword: e.target.value,
              })
            }
          />

          <button
            onClick={submit}
            className="btn btn-primary"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}