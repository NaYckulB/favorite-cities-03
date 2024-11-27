import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";
import { fetchCityCoordinates } from "../utils/openMeteo"; // Ensure this utility handles API errors properly

const Map = dynamic(() => import("../src/components/Map"), { ssr: false });

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle city search
  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a city name.");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const response = await fetchCityCoordinates(query); // Fetch city details
      console.log("Search Response:", response); // Debug log
  
      if (response && response.coordinates) {
        setCity({
          name: response.placeName.split(",")[0], // Extract the city name
          lat: response.coordinates[1], // Latitude
          lon: response.coordinates[0], // Longitude
        });
        setSuggestions([]); // Clear suggestions
      } else {
        setError("City not found.");
      }
    } catch (err) {
      setError("An error occurred while searching.");
      console.error("Search Error:", err); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };
  

  // Function to handle autocomplete suggestions
  const handleAutocomplete = async (e) => {
    const input = e.target.value;
    setQuery(input);

    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`/api/autocomplete?query=${input}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (err) {
      console.error("Error fetching autocomplete suggestions:", err);
    }
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
    setCity({
      name: suggestion.name,
      lat: suggestion.lat,
      lon: suggestion.lon,
    });
  };

  // Handle Enter key for search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Explore Cities</h1>

      <div className="mb-4">
        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={handleAutocomplete}
          onKeyDown={handleKeyDown}
          placeholder="Search for a city..."
          className="p-2 border rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? (
            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-blue-500 border-t-transparent" />
          ) : (
            "Search"
          )}
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="mt-2 border rounded w-64 bg-white shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {/* Map Component */}
      <Map city={city} />

      {/* Link to Favorites */}
      <Link href="/favorites" legacyBehavior>
        <a className="text-blue-500 hover:underline">Go to Favorite Cities</a>
      </Link>
    </div>
  );
};

export default HomePage;
