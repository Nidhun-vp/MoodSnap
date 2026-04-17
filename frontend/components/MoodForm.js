"use client";

import { useState } from "react";
import axios from "axios";

export default function MoodForm({ user, refresh }) {
  const [mood, setMood] = useState("happy");
  const [note, setNote] = useState("");

  const saveMood = async () => {
    try {
      await axios.post("http://localhost:5000/api/moods", {
        userId: user._id,
        username: user.username,
        mood,
        note,
      });

      setNote("");
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-black text-xl font-bold mb-4">
        How are you today?
      </h2>

      <div className="flex gap-4 text-3xl mb-4">

        <button
          onClick={() => setMood("happy")}
          className={`p-2 rounded-full transition ${
            mood === "happy"
              ? "bg-yellow-300 scale-110 ring-2 ring-yellow-500"
              : "hover:bg-gray-100"
          }`}
        >
          😊
        </button>

        <button
          onClick={() => setMood("neutral")}
          className={`p-2 rounded-full transition ${
            mood === "neutral"
              ? "bg-gray-300 scale-110 ring-2 ring-gray-500"
              : "hover:bg-gray-100"
          }`}
        >
          😐
        </button>

        <button
          onClick={() => setMood("sad")}
          className={`p-2 rounded-full transition ${
            mood === "sad"
              ? "bg-blue-300 scale-110 ring-2 ring-blue-500"
              : "hover:bg-gray-100"
          }`}
        >
          😢
        </button>

        <button
          onClick={() => setMood("angry")}
          className={`p-2 rounded-full transition ${
            mood === "angry"
              ? "bg-red-300 scale-110 ring-2 ring-red-500"
              : "hover:bg-gray-100"
          }`}
        >
          😡
        </button>

      </div>

      <textarea
        placeholder="Write a note..."
        className="text-blue-400 border p-2 rounded w-full mb-4"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        onClick={saveMood}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Mood
      </button>
    </div>
  );
}