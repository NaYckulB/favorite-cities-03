import { useEffect, useState } from "react";
import CityCard from "@/components/CityCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorite cities from the database
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/cities");
        const data = await response.json();
        setFavorites(data);
      } catch (err) {
        console.error("Error fetching favorite cities:", err);
      }
    };
    fetchFavorites();
  }, []);

  // Handle deleting a favorite city
  const handleDelete = async (cityId) => {
    try {
      const response = await fetch(`/api/cities/${cityId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete city");

      setFavorites((prev) => prev.filter((city) => city.id !== cityId));
    } catch (err) {
      console.error("Error deleting city:", err.message);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Cities</h1>
      <div className="city-list">
        {favorites.length > 0 ? (
          favorites.map((city) => (
            <CityCard
              key={city.id}
              name={city.name}
              country={city.country}
              lat={city.lat}
              lon={city.lon}
              onDelete={() => handleDelete(city.id)}  // Pass delete function to CityCard
            />
          ))
        ) : (
          <p>No favorite cities yet. Add some!</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
