import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Bath, BedDouble, CarFront, MapPin, Ruler, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const MarkerListingItem = ({ item, closeHandler, images }) => {
  const [directions, setDirections] = useState(null);
  const [response, setResponse] = useState(null);
  const [showDirectionsInput, setShowDirectionsInput] = useState(false);
  const [startLocation, setStartLocation] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const productLocation = {
    lat: item.coordinates.lat,
    lng: item.coordinates.lng,
  };

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        setDirections(response);
        setResponse(response.routes[0].legs[0]);
      } else {
        console.error("response: ", response);
      }
    }
  };

  const handleGetDirections = () => {
    const container = document.getElementById("locationContainer")
    container.style.display = 'block'
    container.scrollIntoView({ behavior: 'smooth' })
    closeHandler()
  };

  const handleCalculateRoute = () => {
    setDirections(null);
    setResponse(null);
  };
  return (
    <>
      <div className=" relative shadow-lg rounded p-2 hover:border hover:border-primary w-[420px] max-w-48 bg-white">
        <X
          onClick={() => closeHandler()}
          className="absolute right-0 p-2 w-8 h-8 cursor-pointer text-red-700 font-bold bg-white"
        />
        <Image
          className="object-cover h-[100px] rounded cursor-pointer"
          src={images[0]?.url}
          width={180}
          height={80}
        />
        <div className="flex flex-col gap-2 mt-3">
          <h2 className="font-bold text-xl text-primary">
            GHS {item.price.toLocaleString()}
          </h2>
          <h2 className="flex gap-2 items-center text-sm text-gray-500">
            <MapPin className="w-5 h-5" /> <span>{item.address}</span>
          </h2>
        </div>
        <div className="bg-slate-100 rounded-md p-2 text-gray-400 mt-3">
          {item.bedroom && (
            <div className="flex items-center justify-between text-sm mt-3 border-b pb-2">
              <p className="flex items-center gap-1">
                <BedDouble className="h-4 w-4" /> <span>Bedrooms</span>
              </p>
              <p className="">
                <span>{item?.bedroom}</span>
              </p>
            </div>
          )}

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
          <button
            onClick={handleGetDirections}
            className="text-white text-center text-sm  border border-primary bg-primary py-1 px-2 w-full mt-1"
          >
            Get Directions
          </button>
        </div>
      </div>
    </>
  );
};

export default MarkerListingItem;
