const CityCard = ({ name, lat, lon, onGoTo, onDelete }) => {
  return (
    <div className="p-4 border rounded shadow-lg mb-2">
      <h3 className="font-bold">{name}</h3>
      <p>Lat: {lat}, Lon: {lon}</p>
      <div className="flex justify-between mt-2">
        <button
          onClick={onGoTo}
          className="bg-blue-500 text-white p-1 rounded"
        >
          Go to City
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white p-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CityCard;
