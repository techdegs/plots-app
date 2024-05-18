"use client";

import { supabase } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Slider from "../_components/Slider";
import Details from "../_components/Details";
import GoogleMapSection from "@/app/_components/GoogleMapSection";
import AgentDetails from "../_components/AgentDetails";

const ViewListing = () => {
  const [listingDetails, setListingDetails] = useState();

  const { id } = useParams();

  useEffect(() => {
    getListingDetails();
  }, []);

  const getListingDetails = async () => {
    const { data, error } = await supabase
      .from("houselistings")
      .select("*, houseListingImages(url, listing_id, id)")
      .eq("id", id);
    //.eq("active", true)

    if (data) {
      setListingDetails(data[0]);
    }
    if (error) {
      toast("Sorry error occured");
      console.log(error);
    }
  };

  return (
    <div className="w-full px-10">
      <div className="px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 border-b pb-4">
          <Slider imageLists={listingDetails?.houseListingImages} />
          <Details listingDetails={listingDetails} />
        </div>
        <div className="mt-4">
          <h2 className="font-bold text-2xl text-center mb-4 text-primary">
            Find on Map
          </h2>
          <GoogleMapSection
            searchedCoordinates={listingDetails?.coordinates}
            listing={[listingDetails]}
          />
        </div>
        <div className="my-6">
        <h2 className="text-primary text-2xl font-bold mb-6">Agent Info</h2>
          <AgentDetails listingDetails={[listingDetails]} />
        </div>
      </div>
    </div>
  );
};

export default ViewListing;
