import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function SearchBar({searchedLocation}) {
  return (
    <View>
      <GooglePlacesAutocomplete
      placeholder='Search'
      fetchDetails={true}
      // enablePoweredByContainer={false}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        searchedLocation(details?.geometry?.location)
      }}
      query={{
        key: 'AIzaSyA7iTaqGSsaAQabBRN8gVVC_LeKQb30uwc',
        language: 'en',
      }}
    />
    </View>
  )
}