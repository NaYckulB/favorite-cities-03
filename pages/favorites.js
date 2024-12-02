import { useEffect, useState } from "react";
import { deleteCity, fetchFavoriteCities } from "@/utils/cityApi";
import CityCard from "@/components/CityCard";
import { useRouter } from "next/router";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();

  // Fetch favorite cities on load
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const cities = await fetchFavoriteCities();
        setFavorites(cities);
      } catch (err) {
        console.error("Error fetching favorite cities:", err.message);
      }
    };

    fetchFavorites();
  }, []);

  const handleGoToCity = (city) => {
    router.push({
      pathname: "/",
      query: {
        name: city.name,
        lat: city.lat,
        lng: city.lon,
      },
    });
  };

  
  const handleDelete = async (cityId) => {
    const confirmation = window.confirm("Are you sure you want to delete this Favorite City?");
    if (!confirmation) return;
  
    try {
      await deleteCity(cityId); // Use deleteCity utility
      setFavorites((prev) => prev.filter((city) => city.id !== cityId)); // Update state
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
              lat={city.lat}
              lon={city.lon}
              onGoTo={() => handleGoToCity(city)}
              onDelete={() => handleDelete(city.id)}
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
