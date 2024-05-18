"use client";
import Map from "@/app/_components/Map";
import { nthc } from "@/nthc";

const page = () => {
  const center = {
    lng: -1.6615226669999288,
    lat: 6.6696035320000533,
  };

  return (
    <div className="w-full mx-12 overflow-x-hidden mb-8">
      <h1 className="font-bold text-lg my-4 text-center capitalize">
        NTHC SITE
      </h1>
      <Map geoJsonData={nthc} parcels={nthc} center={center} />
    </div>
  );
};

export default page;
