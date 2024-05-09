"use client";
import { MapPin } from "lucide-react";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const GoogleAddressSearch = ({selectedAddress, setCoordinates}) => {
  return (
    <div className="mt-3 flex items-center">
      <MapPin className="h-10 w-10 p-2 rounded-l-lg text-primary bg-purple-200" />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        selectProps={{
          placeholder: "Search Property Address",
          isClearable: true,
          className: "w-full",
          onChange: (place) => {
            selectedAddress(place);
            geocodeByAddress(place.label)
              .then((result) => getLatLng(result[0]))
              .then(({ lat, lng }) => {
                // console.log("Successfully got latitude and longitude", {
                //   lat,
                //   lng,
                // });
                setCoordinates({lat, lng})
              });
          },
        }}
      />
    </div>
  );
};

export default GoogleAddressSearch;