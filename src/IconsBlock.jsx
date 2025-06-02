export const IconsBlock = ({ project_type, location, population_served }) => {
  const projectTypeText =
    project_type !== "" ? (
      <div className="flex flex-row align-middle items-center text-sm text-gray-500 mb-2 sm:mb-0">
        <img
          src="/vite-mapbox/icons/icon1.webp"
          alt="Project Type Icon"
          className="inline-block mr-1"
          style={{ width: "20px" }}
        />
        Project Type: {project_type}
      </div>
    ) : null;

  const locationText =
    location !== "" ? (
      <div className="flex flex-row align-middle items-center text-sm text-gray-500 mb-2 sm:mb-0">
        <img
          src="/vite-mapbox/icons/icon2.webp"
          alt="Location Icon"
          className="inline-block mr-1"
          style={{ width: "20px" }}
        />
        Location: {location}
      </div>
    ) : null;

  const populationServedText =
    population_served !== "" ? (
      <div className="flex flex-row align-middle items-center text-sm text-gray-500">
        <img
          src="/vite-mapbox/icons/icon3.webp"
          alt="Population Served Icon"
          className="inline-block mr-1"
          style={{ width: "20px" }}
        />
        Population Served: {population_served}
      </div>
    ) : null;

  return (
    <div className="flex flex-col mb-4 gap-1">
      {projectTypeText}
      {locationText}
      {populationServedText}
    </div>
  );
};
