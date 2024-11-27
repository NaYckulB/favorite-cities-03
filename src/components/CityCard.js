export default function CityCard({ name, country, lat, lon, onDelete }) {
  return (
    <div className="border border-gray-300 rounded-lg p-5 shadow-md bg-white">
      <p className="text-xl font-bold text-teal-600">
        {name}, {country}
      </p>
      <p className="mt-2">Latitude: {lat}</p>
      <p>Longitude: {lon}</p>

      <div className="mt-4 flex gap-2">
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded text-sm"
          onClick={() => {
            window.location.href = `/city/${name}_${lat}_${lon}`; // Redirect to city details
          }}
        >
          View Details
        </button>

        {onDelete && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded text-sm"
            onClick={onDelete} // Handle delete from favorites
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
