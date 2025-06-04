import listingsGeojson from '../data/philadelphia_homes.js'
import { dsvFormat } from 'd3-dsv'

export const getFeatures = async () => {


  //const csv = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSg9z-_hkEk2QbB04JlkhFfKb8_ZHwBBpmE1_u4n2w3s3cPlvwCbjFA3uL9d552_pQhLL3UFeR2l-cd/pub?gid=0&single=true&output=csv")
  const csv = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSg9z-_hkEk2QbB04JlkhFfKb8_ZHwBBpmE1_u4n2w3s3cPlvwCbjFA3uL9d552_pQhLL3UFeR2l-cd/pub?output=csv")
  const csvText = await csv.text()

  const parsedData = dsvFormat(',').parse(csvText);
  console.log('parsedData', parsedData);



  const features = []

  parsedData.forEach((data) => {

    if (data['Coordinates'] && data['Coordinates'].length > 0) {

      const [lng, lat] = data['Coordinates'].split(',').map(Number);

      if (!isValidLatLng(lng, lat)) {
        console.warn(`Invalid coordinates for feature: ${data['Coordinates']}`);
        return; // Skip this feature if coordinates are invalid
      }

      const projectType = data['Project Type'] || '';
      const location = data['Location'] || '';
      const description = data['Description'] || '';
      const populationServed = data['Population Served'] || '';
      const villageName = data['Village Name'] || '';
      const imageUrls = Array.from({ length: 20 }, (_, i) => data['Image' + (i + 1)])
      const iconProjectType = data['icon project type'] || '';
      const iconLocation = data['icon location'] || '';
      const iconPopulationServed = data['icon population served'] || '';

      features.push({
        type: 'Feature',
        properties: {
          category_code: '1 ',
          central_air: 'Y',
          location: '742 S BROAD ST',
          market_value: 1501000.0,
          number_of_bathrooms: 3.0,
          number_of_bedrooms: 4.0,
          sale_price: 1695000.0,
          sale_date: '2021-11-10T00:00:00+00:00',
          total_livable_area: 3529.0,
          type_heater: null,
          unit: null,
          year_built: '2021',


          project_type: projectType,
          location: location,
          description: description,
          population_served: populationServed,
          village_name: villageName,
          imageUrls: imageUrls.filter(url => url && url.length > 0),

          iconProjectType,
          iconLocation,
          iconPopulationServed

        },
        geometry: { type: 'Point', coordinates: [lng, lat] }
      })
    }
  })

  return features

}

// Returns true if lat/lng are valid numbers and within world bounds
export function isValidLatLng(lng, lat) {
  return (
    typeof lng === 'number' &&
    typeof lat === 'number' &&
    !isNaN(lng) &&
    !isNaN(lat) &&
    lng >= -180 && lng <= 180 &&
    lat >= -90 && lat <= 90
  );
}




