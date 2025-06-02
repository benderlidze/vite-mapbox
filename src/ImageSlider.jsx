import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const ImageSlider = ({ images, className = "", height = "h-80" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter out empty/invalid images
  const validImages = images?.filter((img) => img && img.trim() !== "") || [];

  if (validImages.length === 0) {
    return (
      <div
        className={`bg-gray-200 ${height} ${className} flex items-center justify-center`}
      >
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? validImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === validImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`relative ${height} ${className}`}>
      {/* Main Image */}
      <div
        className={`bg-cover bg-center w-full ${height}`}
        style={{
          backgroundImage: `url("${validImages[currentIndex]}")`,
        }}
      />

      {/* Navigation Arrows - only show if more than 1 image */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
            aria-label="Previous image"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="sm" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
            aria-label="Next image"
          >
            <FontAwesomeIcon icon={faChevronRight} size="sm" />
          </button>
        </>
      )}

      {/* Dots Indicator - only show if more than 1 image */}
      {validImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-white"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter - only show if more than 1 image */}
      {validImages.length > 1 && (
        <div className="absolute top-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {currentIndex + 1} / {validImages.length}
        </div>
      )}
    </div>
  );
};

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  height: PropTypes.string,
};

export default ImageSlider;
