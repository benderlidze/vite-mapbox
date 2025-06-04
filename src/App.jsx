"use client";

import { useState, useRef } from "react";
import classNames from "classnames";
import { SearchBox } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import { accessToken } from "./Map";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faList } from "@fortawesome/free-solid-svg-icons";

import Map from "./Map";
import Card from "./Card";
import Modal from "./Modal";
import { getFeatures } from "./Map/util";

import "./styles.css";

export default function Home() {
  // the data to be displayed on the map (this is static, but could be updated dynamically as the map view changes)
  const [currentViewData, setCurrentViewData] = useState([]);
  // stores the feature that the user is currently viewing (triggers the modal)
  const [activeFeature, setActiveFeature] = useState();
  // the current search value, used in the controlled mapbox-search-js input
  const [searchValue, setSearchValue] = useState("");
  // for toggling between map view and card view on small screens
  const [activeMobileView, setActiveMobileView] = useState("map");

  // a ref to hold the Mapbox GL JS Map instance
  const mapInstanceRef = useRef();

  const [searchParams] = useSearchParams();
  const hideHeaders = searchParams.get("hideHeaders");

  // when the map loads
  const handleMapLoad = async (map) => {
    mapInstanceRef.current = map;
    setCurrentViewData(await getFeatures());
  };

  // on click, set the active feature
  const handleFeatureClick = (feature) => {
    setActiveFeature(feature);
  };

  // when the modal is closed, clear the active feature
  const handleModalClose = () => {
    setActiveFeature(undefined);
  };

  // set the search value as the user types
  const handleSearchChange = (newValue) => {
    setSearchValue(newValue);
  };

  // toggle the map and card view on mobile devices
  const handleActiveMobileClick = () => {
    if (activeMobileView === "map") {
      setActiveMobileView("cards");
    } else {
      setActiveMobileView("map");
    }
  };

  console.log("currentViewData", currentViewData);
  return (
    <>
      {activeFeature && (
        <Modal feature={activeFeature} onClose={handleModalClose} />
      )}
      <main className="flex flex-col h-full">
        <div className="relative lg:flex grow shrink min-h-0">
          <div
            className={classNames("grow shrink-0 relative h-full lg:h-auto", {
              "z-30": activeMobileView === "map",
            })}
          >
            {/* <div className="absolute top-3 left-3 z-10">
              <SearchBox
                className="w-32"
                options={{
                  proximity: [-75.16805, 39.93298],
                  types: [
                    "postcode",
                    "place",
                    "locality",
                    "neighborhood",
                    "street",
                    "address",
                  ],
                }}
                value={searchValue}
                onChange={handleSearchChange}
                accessToken={accessToken}
                marker
                mapboxgl={mapboxgl}
                placeholder="Search for an address, city, zip, etc"
                map={mapInstanceRef.current}
                theme={{
                  variables: {
                    fontFamily: '"Open Sans", sans-serif',
                    fontWeight: 300,
                    unit: "16px",
                    borderRadius: "8px",
                    boxShadow: "0px 2.44px 9.75px 0px rgba(95, 126, 155, 0.2)",
                  },
                }}
              />
            </div> */}
            <Map
              data={currentViewData}
              onLoad={handleMapLoad}
              onFeatureClick={handleFeatureClick}
            />
          </div>
          {/* sidebar */}
          <div className="absolute lg:static top-0 p-4 w-full lg:w-96 shadow-xl z-10 overflow-scroll lg:z-30 h-full lg:h-auto bg-white">
            <div className="text-2xl text-black font-semibold w-full mb-1.5">
              Villages
            </div>
            <div className="mb-4">
              <div className="font-medium text-gray-500">
                {currentViewData.length} results
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {currentViewData.map((feature, i) => {
                return (
                  <div key={i} className="mb-1.5">
                    <Card feature={feature} onClick={handleFeatureClick} />
                  </div>
                );
              })}
            </div>
          </div>
          {/* end sidebar */}
        </div>
      </main>
      <div
        className="absolute z-30 bottom-5 left-1/2 transform -translate-x-1/2 lg:hidden"
        onClick={handleActiveMobileClick}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <FontAwesomeIcon
            icon={activeMobileView === "map" ? faList : faMap}
            className="mr-2"
          />
          {activeMobileView === "map" ? "Cards" : "Map"}
        </button>
      </div>
    </>
  );
}
