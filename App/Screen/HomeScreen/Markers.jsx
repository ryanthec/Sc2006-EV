import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Marker } from 'react-native-maps'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'

export default function Markers({ index, place }) {

    const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);
    return place && (

        <Marker
            coordinate={{
                latitude: place.location?.latitude,
                longitude: place.location?.longitude
            }}

            onPress={() => setSelectedMarker(index)}
        >

            {selectedMarker == index ?
                <Image source={require('./../../../assets/images/marker.png')}
                    style={{ width: 40, height: 50 }}
                />
                : <Image source={require('./../../../assets/images/Marker-2.png')}
                    style={{ width: 35, height: 45 }}
                />}

        </Marker>


    )
}