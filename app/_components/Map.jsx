"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";
import mapboxgl from "mapbox-gl";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = ({ parcels, center }) => {
  const [map, setMap] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [plotID, setPlotID] = useState();
  const path = usePathname();

  const mapContainerStyle = {
    height: "75vh",
    width: "85%",
  };

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

    // Add a label at the center
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

  const onClose = () => {
    setModalOpen(true);
  };


  //Add info Window
  var openInfoWindow = null;
  const handleInfo = (coordinates, text1, text2, id) => {
    const contentString = `
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

          <a href="${path}/edit-plot/${id}" id="edit_plot_button" class="border px-4 py-1 mb-2 rounded-md text-sm font-normal">
            Edit Plot
          </a>

          <a href="tel:0322008282" class="border px-4 py-1 rounded-md text-sm font-normal">
            Call For Info
          </a>

          <button data-id=${id} class="bg-primary w-full py-2 mt-3 text-white" id="changePlotID">Change Plot Price</button>
        </div>
      </div>
    `;

    const polygonCoords = coordinates.map((coord) => ({
      lng: coord[0],
      lat: coord[1],
    }));

    // Calculate the centroid of the polygon
    const bounds = new google.maps.LatLngBounds();
    polygonCoords.forEach((coord) => bounds.extend(coord));
    const centroid = bounds.getCenter();

    if (openInfoWindow) {
      openInfoWindow.close();
    }

    // Create a new info window
    const infoWindow = new google.maps.InfoWindow({
      position: centroid,
    });

    infoWindow.setContent(contentString);

    google.maps.event.addListener(infoWindow, "domready", () => {
      document.getElementById("changePlotID").addEventListener("click", () => {
        setModalOpen(true);
      });
    });

    infoWindow.open(map);

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
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-700"
              onClick={onClose}
            >
              &times;
            </button>
            <p>Here we go</p>
          </div>
        </div>
      )}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Plot Price</DialogTitle>
            <DialogDescription>
              Make chages to price, subsequently changing the related client
              payments
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Old Price
              </Label>
              <Input id="name" className="col-span-3" type="number" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newprice" className="text-right">
                New Price
              </Label>
              <Input id="newprice" className="col-span-3" type="number" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => console.log(plotID)} type="button">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
