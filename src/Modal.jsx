import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { PropertyData } from "./Card";
import ImageSlider from "./ImageSlider";

const Modal = ({ feature, onClose }) => {
  const {
    project_type,
    location,
    description,
    population_served,
    village_name,
    imageUrls,
  } = feature.properties;

  console.log("imageUrls", imageUrls);

  return (
    <div>
      <div
        className="justify-center p-6 items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onClick={onClose}
      >
        <div
          className="absolute flex flex-col max-h-[90vh] overflow-y-auto"
          style={{
            width: 550,
            maxWidth: "100%",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* modal inner container */}
          <div className="bg-white outline-none focus:outline-none rounded-xl relative">
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
            {imageUrls[0] && imageUrls[0].length > 5 && (
              <div className="bg-cover h-80 lg:h-80 ">
                <img
                  src={imageUrls[0]}
                  alt="Feature"
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </div>
            )}
            <div className="p-3">
              <PropertyData feature={feature} large />

              <p className="mb-6">{description || ""}</p>

              {imageUrls.length > 0 && (
                <ImageSlider images={imageUrls} height="h-80 lg:h-80" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
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
