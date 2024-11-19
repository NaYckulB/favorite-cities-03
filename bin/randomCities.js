export default async function handler(res) {
    const allCities = [
      { name: "Berlin", lat: 52.52, lon: 13.405 },
      { name: "Madrid", lat: 40.4168, lon: -3.7038 },
      { name: "Rome", lat: 41.9028, lon: 12.4964 },
      { name: "Dubai", lat: 25.276987, lon: 55.296249 },
      { name: "Singapore", lat: 1.3521, lon: 103.8198 },
      { name: "Moscow", lat: 55.7558, lon: 37.6173 },
      { name: "Beijing", lat: 39.9042, lon: 116.4074 },
      { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729 },
      { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
      { name: "Seoul", lat: 37.5665, lon: 126.978 },
    ];
  
    const randomCities = allCities.sort(() => 0.5 - Math.random()).slice(0, 5);
  
    return res.status(200).json(randomCities);
  }
  