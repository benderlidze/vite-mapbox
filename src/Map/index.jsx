import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Marker from "../Marker";
import Card from "../Card";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

// This demo imports accessToken from your .env file and it's exported for use in App.jsx by SearchBox. To use this demo rename your .env.sample file to .env and add your Mapbox access token.
export const accessToken = (mapboxgl.accessToken =
  import.meta.env.VITE_MAPBOX_ACCESS_TOKEN);

const Map = ({ data, onLoad, onFeatureClick }) => {
  const mapContainer = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  let mapRef = useRef(null);

  useEffect(() => {
    const map = (mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      center: { lng: 23.446339999999964, lat: 13.401151207397135 },
      zoom: 2,
      style: "mapbox://styles/mapbox/streets-v12",
      cooperativeGestures: true,
      projection: "mercator",
    }));

    map.addControl(new mapboxgl.NavigationControl());

    map.on("load", () => {
      onLoad(map);
      setMapLoaded(true);

      // set custom background color
      // map.getStyle().layers.forEach((layer) => {
      //   if (layer.type === "background") {
      //     map.setPaintProperty(layer.id, "background-color", "#e1eff0");
      //   }
      //   // all land fill layers: land, landuse*, landcover*
      //   if (
      //     layer.type === "fill" &&
      //     (layer.id === "land" ||
      //       layer.id.startsWith("landuse") ||
      //       layer.id.startsWith("landcover") ||
      //       layer.id.toLowerCase().includes("park"))
      //   ) {
      //     map.setPaintProperty(layer.id, "fill-color", "#e1eff0");
      //   }
      // });
    });
  }, []);

  useEffect(() => {
    console.log("mapRef.current", mapRef.current);
    if (mapRef.current && data.length > 0) {
      mapRef.current.fitBounds(
        data.reduce((bounds, feature) => {
          return bounds.extend(feature.geometry.coordinates);
        }, new mapboxgl.LngLatBounds())
      );
    }
  }, [data]);

  return (
    <>
      <div ref={mapContainer} className="h-full w-full" />
      {mapLoaded &&
        data &&
        data.map((d, i) => (
          <Marker key={i} feature={d} map={mapRef.current}>
            <Card
              feature={d}
              width={"300px"}
              shortImage
              onClick={onFeatureClick}
            />
          </Marker>
        ))}
    </>
  );
};

Map.propTypes = {
  data: PropTypes.array,
  onFeatureClick: PropTypes.func,
  onLoad: PropTypes.func,
};

export default Map;
