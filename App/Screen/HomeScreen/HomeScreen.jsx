import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { UserLocationContext } from '../../Context/UserLocationContext';
import GlobalApi from '../../Utils/GlobalApi';
import AppMapView from './AppMapView';
import Header from './Header';
import SearchBar from './SearchBar';
import PlaceListView from './PlaceListView';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';

export default function HomeScreen() {
  const { location } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null); // Assuming selectedMarker is a single marker object

  useEffect(() => {
    if (location) {
      GetNearByPlace();
    }
  }, [location]);

  const GetNearByPlace = async () => {
    try {
      const data = {
        includedTypes: ["electric_vehicle_charging_station"],
        maxResultCount: 10,
        locationRestriction: {
          circle: {
            center: {
              latitude: location?.latitude,
              longitude: location?.longitude
            },
            radius: 5000.0
          }
        }
      };
      const resp = await GlobalApi.NewNearByPlace(data);
      setPlaceList(resp?.data?.places || []);
    } catch (error) {
      console.error('Error fetching nearby places:', error);
      // Handle error as needed
    }
  };

  return (
    <SelectMarkerContext.Provider value={{ selectedMarker, setSelectedMarker }}>
      <View>
        <View style={styles.headerContainer}>
          {/* <Header /> */}
          <SearchBar searchedLocation={(location) => console.log(location)} />
        </View>
        {placeList.length > 0 && <AppMapView placeList={placeList} />}
        <View style={styles.placeListContainer}>
          {placeList.length > 0 && <PlaceListView placeList={placeList} />}
        </View>
      </View>
    </SelectMarkerContext.Provider>
  );
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
    position: "absolute",
    zIndex: 10,
    width: '100%',
    bottom:80,
    paddingHorizontal: 0
  }
});