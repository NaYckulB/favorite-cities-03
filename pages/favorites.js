import { useEffect, useState } from "react";
import CityCard from "@/components/CityCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Change this to use the correct route: /api/cities
        const response = await fetch("/api/cities");
        const data = await response.json();
        setFavorites(data);
      } catch (err) {
        console.error("Error fetching favorite cities:", err);
      }
    };
  
    fetchFavorites();
  }, []);
  

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
    <div>
      <h1>Your Favorite Cities</h1>
      <div className="city-list">
        {favorites.length > 0 ? (
          favorites.map((city) => (
            <CityCard key={city.id} city={city} onDelete={handleDelete} />
          ))
        ) : (
          <p>No favorite cities yet. Add some!</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
