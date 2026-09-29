"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useMemo, useState } from "react";

export interface MapPoint {
  latitude: number;
  longitude: number;
}

interface SearchResult extends MapPoint {
  displayName: string;
}

interface MapLocationPickerProps {
  value: MapPoint;
  onChange: (point: MapPoint) => void;
}

const ACCRA_CENTER: [number, number] = [5.6037, -0.187];

function MapClickHandler({
  onChange,
}: {
  onChange: (point: MapPoint) => void;
}) {
  useMapEvents({
    click(event) {
      onChange({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
  });
  return null;
}

function MapPositionController({ value }: { value: MapPoint }) {
  const map = useMap();

  useEffect(() => {
    map.setView([value.latitude, value.longitude], Math.max(map.getZoom(), 15));
  }, [map, value.latitude, value.longitude]);

  return null;
}

export default function MapLocationPicker({
  value,
  onChange,
}: MapLocationPickerProps) {
  const [query, setQuery] = useState("Airport Residential, Accra");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const markerIcon = useMemo(
    () =>
      L.divIcon({
        className: "ecoshel-map-marker",
        html: '<span class="material-symbols-outlined">location_on</span>',
        iconSize: [42, 42],
        iconAnchor: [21, 42],
      }),
    [],
  );

  const searchLocation = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setIsSearching(true);
    setSearchError("");
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&countrycodes=gh&q=${encodeURIComponent(`${trimmedQuery}, Ghana`)}`,
      );
      if (!response.ok) throw new Error("Search failed");
      const places = (await response.json()) as Array<{
        lat: string;
        lon: string;
        display_name: string;
      }>;
      const nextResults = places.map((place) => ({
        latitude: Number(place.lat),
        longitude: Number(place.lon),
        displayName: place.display_name,
      }));
      setResults(nextResults);
      if (nextResults.length === 0) setSearchError("No Ghana locations found.");
    } catch {
      setSearchError("Location search is unavailable. Try clicking the map.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="relative z-1000 flex gap-space-xs border-b border-surface-container-high bg-surface-container-lowest p-space-sm">
        <label className="sr-only" htmlFor="map-location-search">
          Search for a property location in Ghana
        </label>
        <input
          className="min-w-0 flex-1 rounded-lg bg-surface-container-low px-space-sm py-space-xs text-body-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/30"
          id="map-location-search"
          placeholder="Search Accra, Kumasi, Cape Coast..."
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              void searchLocation();
            }
          }}
        />
        <button
          className="rounded-lg bg-primary px-space-md py-space-xs font-label-sm text-on-primary transition-colors hover:bg-primary-container disabled:opacity-60"
          disabled={isSearching}
          onClick={() => void searchLocation()}
          type="button"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>

      {results.length > 0 && (
        <div className="relative z-1000 max-h-36 overflow-y-auto border-b border-surface-container-high bg-surface-container-lowest">
          {results.map((result) => (
            <button
              className="block w-full border-b border-surface-container px-space-sm py-space-xs text-left text-body-sm text-on-surface transition-colors last:border-0 hover:bg-surface-container-low"
              key={`${result.latitude}-${result.longitude}`}
              onClick={() => {
                onChange(result);
                setResults([]);
                setQuery(result.displayName.split(",").slice(0, 2).join(","));
              }}
              type="button"
            >
              {result.displayName}
            </button>
          ))}
        </div>
      )}

      {searchError && (
        <p className="relative z-1000 bg-surface-container-lowest px-space-sm py-space-xs text-caption text-error">
          {searchError}
        </p>
      )}

      <div className="relative min-h-0 flex-1">
        <MapContainer
          center={[value.latitude, value.longitude]}
          className="h-full min-h-112 w-full"
          scrollWheelZoom
          zoom={13}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler onChange={onChange} />
          <MapPositionController value={value} />
          <Marker
            eventHandlers={{
              dragend: (event) => {
                const marker = event.target as L.Marker;
                const position = marker.getLatLng();
                onChange({
                  latitude: position.lat,
                  longitude: position.lng,
                });
              },
            }}
            draggable
            icon={markerIcon}
            position={[value.latitude, value.longitude]}
          />
        </MapContainer>
      </div>
    </div>
  );
}

export { ACCRA_CENTER };
