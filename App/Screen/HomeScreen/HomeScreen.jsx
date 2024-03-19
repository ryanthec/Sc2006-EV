import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AppMapView from './AppMapView'
import Header from './Header'
import { StyleSheet } from 'react-native'
import SearchBar from './SearchBar'
import { UserLocationContext } from '../../Context/UserLocationContext'
import { useContext } from 'react'
import GlobalApi from '../../Utils/GlobalApi'

export default function HomeScreen() {

  const { location, setLocation } = useContext(UserLocationContext);

  useEffect(()=>{
    location&&GetNearByPlace();
  },[location])

  const GetNearByPlace = () => {
    const data = {
      "includedTypes": ["electric_vehicle_charging_station"],
      "maxResultCount": 10,
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
    GlobalApi.NewNearByPlace(data).then(resp => {
      console.log(resp.data);
    })
  }

  return (
    <View>
      <View style={styles.headerContainer}>
        {/* <Header /> */}
        <SearchBar searchedLocation={(location) => console.log(location)} />
      </View>
      <AppMapView />
    </View>
  )
}
const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 50,
    width: '100%',
    paddingHorizontal: 20
  }
})