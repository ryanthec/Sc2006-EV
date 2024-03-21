import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppMapView from './AppMapView'
import Header from './Header'
import { StyleSheet } from 'react-native'
import SearchBar from './SearchBar'
import { UserLocationContext } from '../../Context/UserLocationContext'
import { useContext } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import PlaceListView from './PlaceListView'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'

export default function HomeScreen() {

  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(0);

  useEffect(() => {
    location && GetNearByPlace();
  }, [location])

  const GetNearByPlace = () => {
    const data = {
      "includedTypes": ["electric_vehicle_charging_station"],
      "maxResultCount": 20,
      "locationRestriction": {
        "circle": {
          "center": {
            "latitude": location?.latitude,
            "longitude": location?.longitude
          },
          "radius": 5000.0
        }
      }
    }

    // See full log 
    // console.log(JSON.stringify(resp.data));
    // get list of all places of Ev charger
    GlobalApi.NewNearByPlace(data).then(resp => {
      console.log(JSON.stringify(resp.data));
      setPlaceList(resp.data?.places);
    })
  }

  return (
    <SelectMarkerContext.Provider value={{ selectedMarker, setSelectedMarker }}>
      <View>
        <View style={styles.headerContainer}>
          {/* <Header /> */}
          <SearchBar
            searchedLocation={(location) =>
              setLocation({
                latitude: location.lat,
                longitude: location.lng
              })} />
        </View>
        <AppMapView placeList={placeList} />
        <View style={styles.placeListContainer}>
          {placeList && <PlaceListView placeList={placeList} />}
        </View>
      </View>
    </SelectMarkerContext.Provider>
  )
}
const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 50,
    width: '100%',
    paddingHorizontal: 20
  },
  placeListContainer: {
    position: 'absolute',
    bottom: 80,
    zIndex: 10,
    width: '100%'
  }
})