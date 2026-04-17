"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          role,
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md  h-90">
        <h1 className="text-black text-3xl font-bold text-center mb-5">
          MoodSnap
        </h1>

        <input
          type="text"
          placeholder="Enter username"
          className="text-black border p-2 rounded w-full mb-4"
          onChange={(e) => setUsername(e.target.value)}
        />

        <select
          className=" text-black border p-2 rounded w-full mb-4"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={login}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
