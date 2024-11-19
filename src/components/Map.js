import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749, // Example latitude
  lng: -122.4194, // Example longitude
};

const Map = ({ onAddFavorite }) => {
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const onLoad = (mapInstance) => setMap(mapInstance);

  const onAutocompleteLoad = (autocompleteInstance) => setAutocomplete(autocompleteInstance);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const city = {
          name: place.name,
          lat: place.geometry.location.lat(),
          lon: place.geometry.location.lng(),
        };
        setSelectedCity(city);
        map.panTo(city); // Center the map on the selected city
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div>
        <input
          type="text"
          placeholder="Search for a city"
          id="autocomplete"
          style={{ width: "300px", padding: "10px" }}
        />
        {selectedCity && (
          <div>
            <p>
              Selected: {selectedCity.name} ({selectedCity.lat}, {selectedCity.lon})
            </p>
            <button onClick={() => onAddFavorite(selectedCity)}>Add to Favorites</button>
          </div>
        )}
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad}>
          {selectedCity && <Marker position={{ lat: selectedCity.lat, lng: selectedCity.lon }} />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
