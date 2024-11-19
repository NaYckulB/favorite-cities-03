import dynamic from "next/dynamic";

const Map = dynamic(() => import("../src/components/Map"), { ssr: false });

const HomePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore Cities</h1>
      <Map center={{ lat: 37.7749, lng: -122.4194 }} /> {/* Default: San Francisco */}
    </div>
  );
};

export default HomePage;
