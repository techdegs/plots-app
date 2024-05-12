"use client";
import GoogleAddressSearch from "@/app/_components/GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const page = () => {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const [loader, setLoader] = useState(false)

  const { user } = useUser();

  // useEffect(() => {
  //   if (!user) {
  //     window.location.href = "/sign-in";
  //   }
  // }, [user]);

  const nextHandler = async () => {
    setLoader(true)
    //Save info to Supabase
    const { data, error } = await supabase
      .from("houselistings")
      .insert([
        {
          address: selectedAddress.label,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress.emailAddress,
        },
      ])
      .select();

    //Check Data
    if (data) {
      setLoader(false)
      toast(`New Address added for listing: , ${data[0].address}`);
    }
    if (error) {
      setLoader(false)
      console.log(error);
      toast("Sorry something went wrong");
    }
  };
  return (
    <div className="w-full px-10">
      <div className="">
        <div className="flex items-center justify-center flex-col gap-5">
          <h2 className="font-bold">Add House Listing</h2>
          <div className="p-5 rounded-lg border shadow-sm flex flex-col gap-5 w-full md:w-80 lg:w-[60%] xl:w-[60%]">
            <h2 className="text-g">Search and Enter Address (location) of the property</h2>
            <GoogleAddressSearch
              selectedAddress={(value) => setSelectedAddress(value)}
              setCoordinates={(value) => setCoordinates(value)}
            />
            <>
              {selectedAddress && coordinates && (
                <Button disabled={loader} onClick={nextHandler}>
                  {
                    loader ? <Loader className="animate-spin" /> : 'Next'
                  }
                </Button>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
