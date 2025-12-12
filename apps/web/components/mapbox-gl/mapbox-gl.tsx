"use client";

import { useRef, useEffect } from "react";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import { User } from "@repo/db";
import { useMapStore } from "./store";

import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.css";
import { useParams } from "next/navigation";
import { Card } from "@repo/ui/card/card";

interface Props {
  debug?: boolean;
  users?: User[];
}

const MAP_OFFSET_X = 192;

const MAP_PADDING = {
  left: MAP_OFFSET_X,
  top: 0,
  right: 0,
  bottom: 0,
};

export const MapboxGl = ({ debug = false, users = [] }: Props) => {
  const params = useParams<{ id: string }>();
  const userId = params.id;

  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef(null);
  const markersRef = useRef<Marker[]>([]);

  const center = useMapStore((state) => state.center) as [number, number];
  const zoom = useMapStore((state) => state.zoom);
  const pitch = useMapStore((state) => state.pitch);
  const setCenter = useMapStore((state) => state.setCenter);
  const setZoom = useMapStore((state) => state.setZoom);
  const setPitch = useMapStore((state) => state.setPitch);
  const setUsers = useMapStore((state) => state.setUsers);
  const storeUsers = useMapStore((state) => state.users);
  const flyToUser = useMapStore((state) => state.flyToUser);
  const reset = useMapStore((state) => state.reset);

  // Initialize users in store
  useEffect(() => {
    if (users.length > 0) {
      setUsers(users);
    }
  }, [users, setUsers]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom,
      pitch,
    });

    mapRef.current.setPadding(MAP_PADDING);

    mapRef.current.on("move", () => {
      const mapCenter = mapRef.current?.getCenter();
      const mapZoom = mapRef.current?.getZoom();
      const mapPitch = mapRef.current?.getPitch();

      if (!mapCenter || !mapZoom || mapPitch === undefined) return;
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
      setPitch(mapPitch);
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  // Sync map center/zoom/pitch with store
  useEffect(() => {
    if (!mapRef.current) return;

    const currentCenter = mapRef.current.getCenter();
    const currentZoom = mapRef.current.getZoom();
    const currentPitch = mapRef.current.getPitch();

    const centerChanged =
      Math.abs(currentCenter.lng - center[0]) > 0.0001 ||
      Math.abs(currentCenter.lat - center[1]) > 0.0001;
    const zoomChanged = Math.abs(currentZoom - zoom) > 0.01;
    const pitchChanged = Math.abs(currentPitch - pitch) > 0.01;

    if (centerChanged || zoomChanged || pitchChanged) {
      mapRef.current.flyTo({
        center: center,
        zoom: zoom,
        pitch: pitch,
        padding: MAP_PADDING,
        retainPadding: true,
      });
    }
  }, [center, zoom, pitch]);

  // Add markers when map is ready and users are available
  useEffect(() => {
    if (!mapRef.current || !storeUsers.length) return;

    if (!mapRef.current.loaded()) {
      mapRef.current.once("load", () => {
        addMarkers(storeUsers);
      });
    } else {
      addMarkers(storeUsers);
    }

    function addMarkers(usersToAdd: typeof storeUsers) {
      // Remove existing markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Add new markers
      usersToAdd.forEach((user) => {
        const address = user.address as {
          geo?: { lat?: string; lng?: string };
        };
        const geo = address?.geo;

        if (geo?.lat && geo?.lng) {
          const lng = parseFloat(geo.lng);
          const lat = parseFloat(geo.lat);

          if (!isNaN(lng) && !isNaN(lat)) {
            const marker = new mapboxgl.Marker()
              .setLngLat([lng, lat])
              .addTo(mapRef.current!);

            markersRef.current.push(marker);
          }
        }
      });
    }

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };
  }, [storeUsers]);

  useEffect(() => {
    if (userId && users.length > 0) {
      const user = users.find((user) => user.id === Number(userId));
      if (user) {
        flyToUser(user);
      }
    } else {
      reset();
    }
  }, [userId, users, flyToUser, reset]);

  const handleButtonClick = () => {
    const reset = useMapStore.getState().reset;
    reset();
    if (mapRef.current) {
      mapRef.current.flyTo({
        center,
        zoom,
        pitch,
        padding: MAP_PADDING,
        retainPadding: true,
      });
    }
  };

  return (
    <>
      {debug ? (
        <>
          <Card className="fixed top-6 right-6 py-1 px-2 z-50 font-mono text-sm rounded-lg text-neutral-800">
            Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)}
          </Card>

          {/* <button className="reset-button" onClick={handleButtonClick}>
            Reset
          </button> */}
        </>
      ) : null}
      <div id="map-container" ref={mapContainerRef} />
    </>
  );
};
