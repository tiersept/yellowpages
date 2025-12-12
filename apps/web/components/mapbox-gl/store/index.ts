import { create } from "zustand";
import { LngLatLike } from "mapbox-gl";
import { User } from "@repo/db";

const INITIAL_CENTER: LngLatLike = [-74.0242, 40.6941];
const INITIAL_ZOOM = 2.4;
const INITIAL_PITCH = 0;

interface MapState {
  center: LngLatLike;
  zoom: number;
  pitch: number;
  users: User[];
  setCenter: (center: LngLatLike) => void;
  setZoom: (zoom: number) => void;
  setPitch: (pitch: number) => void;
  setUsers: (users: User[]) => void;
  flyToUser: (user: User, zoomLevel?: number, pitch?: number) => void;
  reset: () => void;
}

export const useMapStore = create<MapState>((set) => ({
  center: INITIAL_CENTER,
  zoom: INITIAL_ZOOM,
  pitch: INITIAL_PITCH,
  users: [],
  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
  setPitch: (pitch) => set({ pitch }),
  setUsers: (users) => set({ users }),
  flyToUser: (user, zoomLevel = 6, pitch = 64) => {
    const address = user.address as {
      geo?: { lat?: string; lng?: string };
    };
    const geo = address?.geo;

    if (geo?.lat && geo?.lng) {
      const lng = parseFloat(geo.lng);
      const lat = parseFloat(geo.lat);

      if (!isNaN(lng) && !isNaN(lat)) {
        set({ center: [lng, lat], zoom: zoomLevel, pitch });
      }
    }
  },
  reset: () =>
    set({ center: INITIAL_CENTER, zoom: INITIAL_ZOOM, pitch: INITIAL_PITCH }),
}));
