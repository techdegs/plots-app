"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";
import mapboxgl from "mapbox-gl";
import { usePathname } from "next/navigation";


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = ({ parcels, center }) => {
  const [map, setMap] = useState(null);
  const path = usePathname();

  const mapContainerStyle = {
    height: "75vh",
    width: "85%",
  };

  // const center = {
  //   lng: -1.5007916502847063,
  //   lat: 6.759657505706267,
  // };

  const zoom = 17;

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
  const markerInfo = (coordinates, text, status) => {
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
        text: text.toString(),
        color: renderMarkerColor(status),
        fontSize: "11px",
        //fontWeight: "bold",
        scale: 0,
      },
      map: map,
    });
  };

  //Add Content
  var openInfoWindow = null;
  const handleInfo = (coordinates, text1, text2, index, id) => {
    var contentString = `
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4 flex flex-col">
          <div class="font-bold md:text-lg lg:text-lg text-sm mb-2">Plot Number ${text1}, ${text2}</div>
          <hr />
          <a href="${path}/buy-plot/${id}" class="border px-4 py-1 mt-3 rounded-md text-sm font-normal">
            Buy Plot
          </a>

          <a href="${path}/reserve-plot/${id}" id="reserve_plot_button" class="border px-4 py-1 my-2 rounded-md text-sm font-normal">
            Reserve Plot
          </a>

          <a href="${path}/edit-plot/${id}" id="reserve_plot_button" class="border px-4 py-1 mb-2 rounded-md text-sm font-normal">
           Edit Plot
          </a>

          <a href="tel:0322008282" class="border px-4 py-1 rounded-md text-sm font-normal">
            Call For Info
          </a>
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

    // Close the previously open info window, if any
    if (openInfoWindow) {
      openInfoWindow.close();
    }

    var infoWindow = new google.maps.InfoWindow({
      position: centroid,
    });

    infoWindow.setContent(contentString);
    infoWindow.open(map);

    // Update the global variable with the newly opened info window
    openInfoWindow = infoWindow;
  };

  function getColorBasedOnStatus(status) {
    if (status === null || status === "Available" || status === undefined) {
      return "green";
    } else if (status === "Reserved") {
      return "black";
    } else if (status === "Sold") {
      return "red";
    } else {
      return "orange"; // Optional: handle unexpected status values
    }
  }

  function renderMarkerColor(status) {
    if (status === null || status === "Available" || status === undefined) {
      return "black";
    } else if (status === "Reserved") {
      return "white";
    } else if (status === "Sold") {
      return "black";
    } else {
      return "orange"; // Optional: handle unexpected status values
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {parcels?.map((feature, index) => (
          <>
            <Polygon
              key={index}
              path={asCoordinates(feature.geometry?.coordinates[0])}
              options={{
                fillColor: getColorBasedOnStatus(feature.status),
                fillOpacity: 0.8,
                strokeWeight: 1,
              }}
              onClick={() =>
                handleInfo(
                  feature.geometry?.coordinates[0],
                  feature.properties?.Plot_No,
                  feature.properties?.Street_Nam,
                  index,
                  feature.id
                )
              }
            />

            {markerInfo(
              feature.geometry.coordinates[0],
              feature.properties.Plot_No,
              feature.status
            )}
          </>
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
