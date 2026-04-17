"use client";

import axios from "axios";

export default function Timeline({ moods, user, refresh }) {
  const deleteMood = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/moods/${id}?role=admin`
      );
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-black xl font-bold mb-4">
        Mood Timeline
      </h2>

      {moods.length === 0 ? (
        <p className="text-black">No moods found</p>
      ) : (
        moods.map((item) => (
          <div
            key={item._id}
            className="border-b py-3 flex justify-between items-center"
          >
            <div>
              <p className="text-blue-500 font-semibold">
                {item.username} - {item.mood}
              </p>

              <p className="text-sm text-black -500">
                {item.note}
              </p>

              <p className="text-xs text-black -400">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>

            {user.role === "admin" && (
              <button
                onClick={() => deleteMood(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}