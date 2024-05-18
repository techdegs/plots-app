"use client";
import Map from "@/app/_components/Map";
import { parcels } from "@/dar-es-salaam/plotDetails";


const page = () => {
  const center ={
    lng:-1.4988789106214604, lat: 6.758705597488173
  }

  return (
    <div className="w-full mx-12 overflow-x-hidden mb-8">
      <h1 className="font-bold text-lg my-4 text-center capitalize">
        DAR ES SALAAM
      </h1>
      <Map geoJsonData={parcels} parcels={parcels} center={center} />
    </div>
  );
};

export default page;
