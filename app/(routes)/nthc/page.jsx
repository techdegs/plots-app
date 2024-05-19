"use client";
import Map from "@/app/_components/Map";
import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const page = () => {
  const [plots, setPlots] = useState([]);
  const [center, setCenter] = useState({
    lng: -1.6633491209999534,
    lat: 6.6715352750000534,
  });

  useEffect(() => {
    getPlost();
  }, []);

  //Fetch Plots from supabase
  const getPlost = async () => {
    const { data, error } = await supabase.from("nthc").select("*");

    if (data) {
      setPlots(data);

      if (plots.length > 0) {
        setCenter({
          lng: plots[0].geometry.coordinates[0][0][1],
          lat: plots[0].geometry.coordinates[0][0][0],
        });
      }
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full mx-12 overflow-x-hidden mb-8">
      <h1 className="font-bold text-lg my-4 text-center capitalize">
        NTHC SITE
      </h1>
      <Map geoJsonData={plots} parcels={plots} center={center} />
    </div>
  );
};

export default page;
