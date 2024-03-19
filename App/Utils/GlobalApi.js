import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";
const BASE_URL_DISTANCE_MATRIX = "https://maps.googleapis.com/maps/api/distancematrix/json";
const API_KEY = "AIzaSyAbduTPol6xy5Bm8FBw4d7lyHrmRpq0pzg";

//For the Google Map API calls 
const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': "AIzaSyAbduTPol6xy5Bm8FBw4d7lyHrmRpq0pzg",
        //get the approriate info from the API 
        'X-Goog-FieldMask': [
            'places.displayName', 'places.formattedAddress',
            'places.location', 'places.evChargeOptions',
            'places.photos', 'places.id', 'places.parkingOptions', 'places.fuelOptions', 'places.fuelOptions'
        ]
    }
}

// Configurations for Google Distance Matrix API
const distanceMatrixConfig = {
    params: {
        key: API_KEY
    }
}

//Make the API calls
const NewNearByPlace = (data) => axios.post(BASE_URL, data, config);

// Function to make Distance Matrix API call
const calculateDistance = (origins, destinations) => axios.get(BASE_URL_DISTANCE_MATRIX, {
    ...distanceMatrixConfig,
    params: {
        ...distanceMatrixConfig.params,
        origins: origins.join('|'),
        destinations: destinations.join('|')
    }
});

//Use the API call everywhere (Make it accessible throughout the whole application)
export default {
    NewNearByPlace,
    calculateDistance,
    API_KEY
}