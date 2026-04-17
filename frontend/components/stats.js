export default function Stats({ stats }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-black xl font-bold mb-4">
        Mood Statistics
      </h2>

      {stats.length === 0 ? (
        <p className="text-black">No data available</p>
      ) : (
        stats.map((item) => (
          <div
            key={item._id}
            className="text-black flex justify-between border-b py-2"
          >
            <span className="capitalize">
              {item._id}
            </span>

            <span className="font-semibold">
              {item.count}
            </span>
          </div>
        ))
      )}
    </div>
  );
}