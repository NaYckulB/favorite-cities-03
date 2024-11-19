import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Heading, Text, Spinner, Alert, Button } from "@chakra-ui/react";

export default function CityPage() {
  const router = useRouter();
  const { name, country, lat, lon } = router.query;
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (router.isReady && lat && lon) {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => setWeather(data.current_weather))
        .catch(() => setError("Error fetching weather data"));
    }
  }, [router.isReady, lat, lon]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = storedFavorites.some((city) => city.name === name && city.country === country);
    setIsFavorite(exists);
  }, [name, country]);

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      const updatedFavorites = storedFavorites.filter((city) => city.name !== name || city.country !== country);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      const newCity = { id: `${name}-${country}`, name, country, lat, lon };
      storedFavorites.push(newCity);
      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
      setIsFavorite(true);
    }
  };

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>{name}, {country}</Heading>
      <Text fontSize="lg">Latitude: {lat}</Text>
      <Text fontSize="lg" mb={5}>Longitude: {lon}</Text>

      {error && (
        <Alert status="error" mb={5}>
          {error}
        </Alert>
      )}

      {weather ? (
        <Box>
          <Heading as="h2" size="md" mb={3}>Current Weather</Heading>
          <Text>Temperature: {weather.temperature}°C</Text>
          <Text>Wind Speed: {weather.windspeed} km/h</Text>
          <Text>Weather Code: {weather.weathercode}</Text>
          <Text>Time of Report: {weather.time}</Text>
        </Box>
      ) : (
        !error && <Spinner size="xl" color="teal.500" />
      )}

      <Button
        mt={5}
        colorScheme={isFavorite ? 'red' : 'teal'}
        onClick={toggleFavorite}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Button>
    </Box>
  );
}
