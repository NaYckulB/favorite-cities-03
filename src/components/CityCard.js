import { Box, Text, Button, Flex } from "@chakra-ui/react";

export default function CityCard({ name, country, lat, lon, onView, onDelete }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      shadow="md"
      bg="white"
    >
      <Text fontSize="xl" fontWeight="bold" color="teal.600">
        {name}, {country}
      </Text>
      <Text mt={2}>Latitude: {lat}</Text>
      <Text>Longitude: {lon}</Text>

      <Flex mt={4} gap={2}>
        <Button
          colorScheme="teal"
          size="sm"
          onClick={onView}
        >
          View Details
        </Button>
        {onDelete && (
          <Button
            colorScheme="red"
            size="sm"
            onClick={() => onDelete(name)}
          >
            Delete
          </Button>
        )}
      </Flex>
    </Box>
  );
}
