import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { saveCity } from "@/utils/cityApi"; // Import saveCity function
 
const containerStyle = {
  width: "100%",
  height: "400px",
};



const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

const libraries = ["places"];

const Map = ({ city, weather }) => {
  const [map, setMap] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [saving, setSaving] = useState(false);
  const { data: session } = useSession(); // Get session at the top level
  
  console.log("Session Data on Map.js:", session);


  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  useEffect(() => {
    if (city && map) {
      map.panTo({ lat: city.lat, lng: city.lng });
      map.setZoom(12);
    }
  }, [city, map]);

  const handleSaveToFavorites = async () => {
    if (!session) {
      alert("Please log in to save favorites!");
      return;
    }
  
    if (!city) return;
  
    setSaving(true);
  
    try {
      await saveCity({
        name: city.name,
        lat: city.lat,
        lon: city.lng, // Send only city-specific data
      });
  
      alert("City saved to favorites!");
    } catch (err) {
      console.error("Error saving city to favorites:", err);
      alert("Failed to save city. Please try again.");
    } finally {
      setSaving(false);
    }
  };
  
  
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={city ? { lat: city.lat, lng: city.lng } : defaultCenter}
        zoom={10}
        onLoad={onLoad}
      >
        {city && (
          <Marker
            position={{ lat: city.lat, lng: city.lng }}
            onClick={() => setShowTooltip(!showTooltip)}
          />
        )}

        {showTooltip && city && (
          <InfoWindow position={{ lat: city.lat, lng: city.lng }} onCloseClick={() => setShowTooltip(false)}>
            <div>
              <h3>{city.name}</h3>
              {weather && (
                <>
                  <p>Temperature: {weather.temperature}°C</p>
                  <p>Wind Speed: {weather.windspeed} km/h</p>
                </>
              )}
              <button
                onClick={handleSaveToFavorites}
                disabled={saving}
                className="mt-2 bg-blue-500 text-white p-1 rounded"
              >
                {saving ? "Saving..." : "Save to Favorites"}
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
