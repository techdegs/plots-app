"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";
import mapboxgl from "mapbox-gl";
import { parcels } from "@/parcels";
import { Button } from "@/components/ui/button";
import Modal from "./Modal";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = () => {
  const [selectedPolygon, setSelectedPolygon] = useState(null);

  const [map, setMap] = useState(null);
  const center = {
    lat: 6.666254591975245,
    lng: -1.6611130754452268,
  };

  const zoom = 17.5;

  const { isLoaded, i } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      // map.addListener("idle", () => {
      //   // Check if the current zoom level is less than 16
      //   if (map.getZoom() < 16) {
      //     // Set the zoom level to 16 if it's less than 16
      //     map.setZoom(16);
      //   }else{
      //     map.setZoom(zoom)
      //   }
      // });

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

  //convert coordinates to lat and lng
  const asCoordinates = (coordinates) => {
    const result = [];
    for (const coord of coordinates) {
      const [lng, lat] = coord;
      result.push({ lng, lat });
    }
    return result;
  };

  //Add Marker inside Polygon
  const markerInfo = (coordinates, text) => {
    const polygonCoords = [];
    for (const coord of coordinates) {
      const [lng, lat] = coord;
      polygonCoords.push({ lng, lat });
    }

    // Calculate the centroid of the polygon
    var bounds = new google.maps.LatLngBounds();
    polygonCoords.forEach(function (coord) {
      bounds.extend(coord);
    });
    var centroid = bounds.getCenter();

    // Add a label at the centroid
    var label = new google.maps.Marker({
      position: centroid,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 0, // Set scale to 0 to hide the marker
      },
      label: {
        text: text,
        color: "#000000", // Label color
        fontSize: "11px", // Label font size
        //fontWeight: "bold", // Label font weight
        scale: 0,
      },
      map: map,
    });
  };

  //Add Content
  const handleInfo = (coordinates, text) => {
    var contentString = `
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${text}</div>
          <hr />
          <button className="border px-4 py-2 rounded-md">
            Buy Plot
          </button>

          <button className="border px-4 py-2 rounded-md">
            Reserve Plot
          </button>

          <button className="border px-4 py-2 rounded-md">
            Call For Info
          </button>
        </div>
      </div>
    `;

    const polygonCoords = [];
    for (const coord of coordinates) {
      const [lng, lat] = coord;
      polygonCoords.push({ lng, lat });
    }

    // Calculate the centroid of the polygon
    var bounds = new google.maps.LatLngBounds();
    polygonCoords.forEach(function (coord) {
      bounds.extend(coord);
    });
    var centroid = bounds.getCenter();

    var infoWindow = new google.maps.InfoWindow({
      position: centroid,
      content: contentString,
    });

    infoWindow.open(map);
  };

  return isLoaded ? (
    <div>
      <GoogleMap
        key={i}
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {parcels.features.map((feature, index) => (
          <>
            <Polygon
              key={index}
              path={asCoordinates(feature.geometry.coordinates[0])}
              options={{
                fillColor: "red",
                fillOpacity: 0.8,
                strokeWeight: 1,
              }}
              onClick={() =>
                handleInfo(
                  feature.geometry.coordinates[0],
                  feature.properties.Parcel_num
                )
              }
            />

            {markerInfo(
              feature.geometry.coordinates[0],
              feature.properties.Plot_numbe
            )}
          </>
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

const mapContainerStyle = {
  height: "500px",
  width: "1000px",
};

export default Map;
