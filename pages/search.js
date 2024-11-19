import { useState, useEffect } from "react";
import { Box, Input, Button, List, ListItem, Link, Spinner, Text, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { fetchCityCoordinates } from "../utils/openMeteo";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [randomCities, setRandomCities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    try {
      const response = await fetch("/api/cities"); 
      if (!response.ok) throw new Error("Failed to fetch favorite cities");
      const data = await response.json();
      setFavorites(data.slice(0, 5)); 
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const fetchRandomCities = async () => {
    try {
      const response = await fetch("/api/randomCities"); 
      if (!response.ok) throw new Error("Failed to fetch random cities");
      const data = await response.json();
      setRandomCities(data.slice(0, 5)); 
    } catch (error) {
      console.error("Error fetching random cities:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
    fetchRandomCities();
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a city name.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCityCoordinates(query);
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

  return (
    <Box p={5}>
      <Input
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        mb={4}
      />
      <Button onClick={handleSearch} colorScheme="teal" mb={4} isDisabled={loading}>
        {loading ? <Spinner size="sm" /> : "Search"}
      </Button>
      {error && <Text color="red.500">{error}</Text>}
      <Box>
        <Heading as="h2" size="md" mb={2}>
          Favorite Cities
        </Heading>
        <List>
          {favorites.map((city, index) => (
            <ListItem key={index}>
              <NextLink
                href={{
                  pathname: `/city/${city.name}`,
                  query: { name: city.name, lat: city.lat, lon: city.lon },
                }}
                passHref
              >
                <Link color="teal.500">{city.name}</Link>
              </NextLink>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box mt={5}>
        <Heading as="h2" size="md" mb={2}>
          Random Cities
        </Heading>
        <List>
          {randomCities.map((city, index) => (
            <ListItem key={index}>
              <NextLink
                href={{
                  pathname: `/city/${city.name}`,
                  query: { name: city.name, lat: city.lat, lon: city.lon },
                }}
                passHref
              >
                <Link color="teal.500">{city.name}</Link>
              </NextLink>
            </ListItem>
          ))}
        </List>
      </Box>
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
                    pathname: `/city/${city.coordinates[1]}_${city.coordinates[0]}`,
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
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Search;
