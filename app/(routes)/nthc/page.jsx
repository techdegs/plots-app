"use client";
import Map from "@/app/_components/Map";
import { parcels } from "@/parcels";


const page = () => {

  return (
    <div className="">
      <h1 className="font-bold text-lg my-2 text-center capitalize">
        NTHC SITE
      </h1>
      <Map geoJsonData={parcels} />

    </div>
  );
};

export default page;
