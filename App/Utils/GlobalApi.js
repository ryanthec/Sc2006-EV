import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";
const API_KEY = "AIzaSyAbduTPol6xy5Bm8FBw4d7lyHrmRpq0pzg";

//For the Google Map API calls 
const config= {
    headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key': "AIzaSyAbduTPol6xy5Bm8FBw4d7lyHrmRpq0pzg",
        //get the approriate info from the API 
        'X-Goog-FieldMask' : 'places.displayName,places.formattedAddress,places.location,places.evChargeOptions,places.photos,places.id' 
    }
}

//Make the API calls
const NewNearByPlace=(data)=>axios.post(BASE_URL, data, config);

//Use the API call everywhere (Make it accessible throughout the whole application)
export default{
    NewNearByPlace,
    API_KEY
}