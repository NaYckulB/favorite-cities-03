import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchCityCoordinates, fetchCityWeather } from "@/utils/openMeteo"; // Ensure the import path is correct

const Map = dynamic(() => import("../src/components/Map"), { ssr: false });

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // Handle query parameters to prepopulate and trigger search
  useEffect(() => {
    const { name, lat, lng } = router.query;
    if (name && lat && lng) {
      setCity({
        name,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      });
      fetchCityWeather(parseFloat(lat), parseFloat(lng)).then(setWeather).catch(console.error);
    }
  }, [router.query]);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/autocomplete?query=${query}`);
      const data = await response.json();

      if (data.length > 0) {
        const suggestion = data[0];
        setCity({
          name: suggestion.name,
          lat: suggestion.lat,
          lng: suggestion.lng,
        });

        const weatherData = await fetchCityWeather(suggestion.lat, suggestion.lng);
        setWeather(weatherData);
        setSuggestions([]);
      } else {
        setError("City not found.");
      }
    } catch (err) {
      setError("An error occurred while searching.");
      console.error("Search Error:", err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSelectSuggestion = async (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
    setCity({
      name: suggestion.name,
      lat: suggestion.lat,
      lng: suggestion.lng,
    });

    const weatherData = await fetchCityWeather(suggestion.lat, suggestion.lng);
    setWeather(weatherData);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Explore Cities</h1>

      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={handleAutocomplete}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
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

      <Map city={city} weather={weather} />

      <Link href="/favorites" legacyBehavior>
        <a className="text-blue-500 hover:underline">Go to Favorite Cities</a>
      </Link>
    </div>
  );
};

export default HomePage;
