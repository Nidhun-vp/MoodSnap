"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import MoodForm from "../../components/MoodForm";
import Timeline from "../../components/Timeline";
import Stats from "../../components/stats";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [moods, setMoods] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const moodRes = await axios.get(
        `http://localhost:5000/api/moods?userId=${user._id}&role=${user.role}`
      );

      const statsRes = await axios.get(
        `http://localhost:5000/api/moods/stats/all?userId=${user._id}&role=${user.role}`
      );

      setMoods(moodRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="p-10 text-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Welcome {user.username}
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {user.role === "user" && (
          <MoodForm
            user={user}
            refresh={fetchData}
          />
        )}

        <Stats stats={stats} />

        <div className="md:col-span-2">
          <Timeline
            moods={moods}
            user={user}
            refresh={fetchData}
          />
        </div>

      </div>

    </div>
  );
}