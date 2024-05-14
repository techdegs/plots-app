"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";
import mapboxgl from "mapbox-gl";
import MarkerItem from "./MarkerItem";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const GoogleMapSection = ({ searchedCoordinates, listing }) => {
  const [center, setCenter] = useState({
    lat: 6.666254591975245,
    lng: -1.6611130754452268,
  });

  useEffect(() => {
    searchedCoordinates && setCenter(searchedCoordinates);
  }, [searchedCoordinates]);

  const [map, setMap] = useState(null);

  const zoom = 13;

  const { isLoaded, i } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setTimeout(() => {
        map.setZoom(zoom);
        setMap(map);
      }, 1500);
    },
    [map]
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div className="p-1 shadow-sm rounded-sm">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <div className="relative z-50">
          {listing.map((item, index) => (
            <MarkerItem key={index} item={item} />
          ))}
        </div>
      </GoogleMap>
    </div>
  );
};

const mapContainerStyle = {
  height: "80vh",
  width: "100%",
  borderRadius: 10,
};

export default GoogleMapSection;
