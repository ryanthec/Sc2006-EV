import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GlobalApi from '../../Utils/GlobalApi';

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
        key: 'AIzaSyCRD8RcE8oQuxDq5PH3bFQQl14xKscOfx8',
        language: 'en',
      }}
    />
    </View>
  )
}