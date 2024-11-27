import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

// Define the libraries array as a constant
const libraries = ["places"];

const Map = ({ city }) => {
  const [map, setMap] = useState(null);

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  // Update map position and add marker when `city` changes
  useEffect(() => {
    if (city && map) {
      map.panTo({ lat: city.lat, lng: city.lon }); // Center map on the city
      map.setZoom(12); // Adjust zoom level
    }
  }, [city, map]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={city ? { lat: city.lat, lng: city.lon } : defaultCenter}
        zoom={10}
        onLoad={onLoad}
      >
        {city && <Marker position={{ lat: city.lat, lng: city.lon }} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
