import { Bath, BedDouble, CarFront, MapPin, Ruler, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MarkerListingItem = ({ item, closeHandler }) => {

  return (
    <div className=" relative shadow-lg rounded p-2 hover:border hover:border-primary w-[420px] max-w-48 bg-white">
      <X
        onClick={() => closeHandler()}
        className="absolute right-0 p-2 w-8 h-8 cursor-pointer text-red-700 font-bold bg-white"
      />
      <Image
        className="object-cover h-[100px] rounded cursor-pointer"
        src={item.houseListingImages[0].url}
        width={180}
        height={80}
      />
      <div className="flex flex-col gap-2 mt-3">
        <h2 className="font-bold text-xl text-primary">
          GHS {item.price.toLocaleString()}
        </h2>
        <h2 className="flex gap-2 items-center text-sm text-gray-500">
          {item.address}
        </h2>
      </div>
      <div className="bg-slate-100 rounded-md p-2 text-gray-400 mt-3">
        <div className="flex items-center justify-between text-sm mt-3 border-b pb-2">
          <p className="flex items-center gap-1">
            <BedDouble className="h-4 w-4" /> <span>Bedrooms</span>
          </p>
          <p className="">
            <span>{item?.bedroom}</span>
          </p>
        </div>

        <div className="flex items-center justify-between text-sm pt-2">
          <p className="flex items-center gap-1">
            <Ruler className="h-4 w-4" /> <span>Area Size</span>
          </p>
          <p className="">
            <span>{item?.areaSize} sqft.</span>
          </p>
        </div>
        
      </div>
      <div className="text-center my-2">
          <Link className="text-primary text-center text-lg border border-primary rounded-lg py-1 px-2" href={'/edit-listing/'+item.id}>View Details</Link>
        </div>
    </div>
  );
};

export default MarkerListingItem;
