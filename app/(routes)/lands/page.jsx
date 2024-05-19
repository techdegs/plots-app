"use client";
import Map from "@/app/_components/Map";
import { parcels } from "@/dar-es-salaam/plotDetails";
import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const page = () => {

  var parcels = {}
  const [plots, setPlots] = useState([]);
  const [center, setCenter] = useState({
    lng: -1.4988789106214604,
    lat: 6.758705597488173,
  });

  useEffect(() => {
    getPlost();
  }, []);

  //Fetch Plots from supabase
  const getPlost = async () => {
    const { data, error } = await supabase.from("dar-es-salaam").select("*");

    if (data) {
      setPlots(data);

      if (plots.length > 0) {
        setCenter({
          lng: plots[0].geometry.coordinates[0][0][1],
          lat: plots[0].geometry.coordinates[0][0][0]
        });
      }
    }
    if (error) {
      console.log(error);
    }
  };



  console.log(plots)

  return (
    <div className="w-full mx-12 overflow-x-hidden mb-8">
      <h1 className="font-bold text-lg my-4 text-center capitalize">
        DAR ES SALAAM
      </h1>
      <Map geoJsonData={plots} parcels={plots} center={center} />
    </div>
  );
};

export default page;
