"use client";

import Map from "@/app/_components/Map";
import { supabase } from "@/utils/supabase/client";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

const page = () => {
  const [plots, setPlots] = useState([]);

  useEffect(() => {
    getPlost();
  }, []);

  var lat, lng;
  if (plots.length > 0) {
    lat = plots[0].geometry.coordinates[0][0][1];
    lng = plots[0].geometry.coordinates[0][0][0];
  }

  var center = { lng, lat };
  var parcels = {
    features: plots,
  };

  //Fetch Plots from supabase
  const getPlost = async () => {
    const { data, error } = await supabase.from("dar-es-salaam").select("*");

    if (data) {
      setPlots(data);
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {parcels.features.length > 0 ? (
        <Map geoJsonData={parcels.features} parcels={parcels} center={center} />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default page;
