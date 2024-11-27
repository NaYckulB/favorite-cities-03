import { useState, useEffect } from "react";
import { Box, Input, Button, List, ListItem, Link, Spinner, Text, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { fetchCityCoordinates } from "../utils/openMeteo";  // Assuming this is your function

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [randomCities, setRandomCities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch favorite cities from the database
  const fetchFavorites = async () => {
    try {
      const response = await fetch("/api/cities");
      if (!response.ok) throw new Error("Failed to fetch favorite cities");
      const data = await response.json();
      setFavorites(data.slice(0, 5)); // Display only the first 5
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  // Fetch random cities from the database or API
  const fetchRandomCities = async () => {
    try {
      const response = await fetch("/api/randomCities"); // Use your own API if needed
      if (!response.ok) throw new Error("Failed to fetch random cities");
      const data = await response.json();
      setRandomCities(data.slice(0, 5)); // Display the first 5 random cities
    } catch (error) {
      console.error("Error fetching random cities:", error);
    }
  };

  // Fetch data on page load
  useEffect(() => {
    fetchFavorites();
    fetchRandomCities();
  }, []);

  // Handle the search for a city
  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a city name.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCityCoordinates(query);  // Fetch the coordinates of the city
      if (data) {
        setResults([data]);
      } else {
        setResults([]);
        setError("City not found");
      }
    } catch (error) {
      setError("An error occurred while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle random city search (when button is clicked)
  const handleRandomCities = () => {
    fetchRandomCities();
  };

  // Handle adding a city to favorites
  const handleAddToFavorites = async (city) => {
    try {
      const response = await fetch("/api/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: city.placeName.split(",")[0],
          lat: city.coordinates[1],
          lon: city.coordinates[0],
        }),
      });

      if (!response.ok) throw new Error("Failed to save favorite city");
      const data = await response.json();
      setFavorites((prev) => [...prev, data]); // Update favorites with the newly added city
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  // Handle deleting a city from favorites
  const handleDeleteFavorite = async (cityId) => {
    try {
      const response = await fetch(`/api/cities/${cityId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete favorite city");
      setFavorites((prev) => prev.filter((city) => city.id !== cityId)); // Remove city from the list
    } catch (error) {
      console.error("Error deleting favorite city:", error);
    }
  };

  return (
    <Box p={5}>
      <Input
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        mb={4}
      />
      <Button
        onClick={handleSearch}
        colorScheme="teal"
        mb={4}
        isDisabled={loading}
      >
        {loading ? <Spinner size="sm" /> : "Search City"}
      </Button>
      <Button
        onClick={handleRandomCities}
        colorScheme="purple"
        mb={4}
        isDisabled={loading}
      >
        {loading ? <Spinner size="sm" /> : "Search Random Cities"}
      </Button>
      {error && <Text color="red.500">{error}</Text>}
      
      {/* Favorite Cities */}
      <Box>
        <Heading as="h2" size="md" mb={2}>
          Favorite Cities
        </Heading>
        <List>
          {favorites.map((city, index) => (
            <ListItem key={index} display="flex" justifyContent="space-between">
              <NextLink
                href={{
                  pathname: `/`,
                  query: { name: city.name, lat: city.lat, lon: city.lon },
                }}
                passHref
              >
                                <Link color="teal.500">{city.name}</Link>
              </NextLink>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => handleDeleteFavorite(city.id)}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Random Cities */}
      <Box mt={5}>
        <Heading as="h2" size="md" mb={2}>
          Random Cities
        </Heading>
        <List>
          {randomCities.map((city, index) => (
            <ListItem key={index}>
              <NextLink
                href={{
                  pathname: `/`,
                  query: { name: city.name, lat: city.lat, lon: city.lon },
                }}
                passHref
              >
                <Link color="teal.500">{city.name}</Link>
              </NextLink>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => handleAddToFavorites(city)}
              >
                Save to Favorites
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Search Results */}
      {!loading && results.length > 0 && (
        <Box mt={5}>
          <Heading as="h2" size="md" mb={2}>
            Search Results
          </Heading>
          <List>
            {results.map((city, index) => (
              <ListItem key={index}>
                <NextLink
                  href={{
                    pathname: `/`,
                    query: {
                      name: city.placeName.split(",")[0],
                      country: city.placeName.split(",")[1]?.trim(),
                      lat: city.coordinates[1],
                      lon: city.coordinates[0],
                    },
                  }}
                  passHref
                >
                  <Link color="teal.500">{city.placeName}</Link>
                </NextLink>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleAddToFavorites(city)}
                >
                  Save to Favorites
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Search;

