"use client";
import GoogleAddressSearch from "@/app/_components/GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const page = () => {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();

  const nextHandler = () => {
    console.log("selected Address", selectedAddress);
    console.log("selected coordinates:", coordinates);
    
  };
  return (
    <div className="w-full px-10">
      <div className="">
        <div className="flex items-center justify-center flex-col gap-5">
          <h2 className="font-bold">Add New Listing</h2>
          <div className="p-5 rounded-lg border shadow-sm flex flex-col gap-5 w-full md:w-80 lg:w-[60%] xl:w-[60%]">
            <h2 className="text-g">Enter Address you want to list</h2>
            <GoogleAddressSearch
              selectedAddress={(value) => setSelectedAddress(value)}
              setCoordinates={(value) => setCoordinates(value)}
            />
            <>
              {selectedAddress && coordinates && (
                <Button onClick={nextHandler}>Next</Button>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
