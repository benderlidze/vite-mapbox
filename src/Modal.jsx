import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { PropertyData } from "./Card";
import ImageSlider from "./ImageSlider";
import { IconsBlock } from "./IconsBlock";

const Modal = ({ feature, onClose }) => {
  const [lng, lat] = feature.geometry.coordinates;
  const { imageUrl } = feature.properties;

  const {
    project_type,
    location,
    description,
    population_served,
    village_name,
    imageUrls,
  } = feature.properties;

  return (
    <>
      {/* gray out background */}
      <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        {/* modal outer container */}
        <div
          className="absolute flex flex-col  "
          style={{
            width: 550,
            maxWidth: "100%",
          }}
        >
          {/* modal inner container */}
          <div className="bg-white outline-none focus:outline-none rounded-xl my-12 relative">
            <div className="absolute top-0 right-0 m-6 z-10">
              <button
                className="z-150 h-8 w-8 bg-gray-100 hover:bg-gray-200 flex justify-center items-center rounded-md "
                onClick={onClose}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  size="lg"
                  className="text-gray-500"
                />
              </button>
            </div>
            <div className="bg-cover h-80 lg:h-80 ">
              <ImageSlider
                images={imageUrls}
                height="h-80 lg:h-80 rounded-t-xl"
              />
            </div>
            <div className="p-3">
              <PropertyData feature={feature} large />
              <IconsBlock
                project_type={project_type}
                location={location}
                population_served={population_served}
              />
              <p className="mb-6">
                {description || "No description available."}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

Modal.propTypes = {
  feature: PropTypes.shape({
    geometry: PropTypes.shape({
      coordinates: PropTypes.any,
    }),
    properties: PropTypes.shape({
      imageUrl: PropTypes.any,
    }),
  }),
  onClose: PropTypes.any,
};

export default Modal;
