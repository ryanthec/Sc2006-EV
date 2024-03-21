import { View, Text } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'
import { Image } from 'react-native'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'
import { useContext } from 'react'

export default function Markers({ index, place }) {
    
    const {selectedMarker,setSelectedMarker}=useContext(SelectMarkerContext);

    return place&&(
        <Marker
            coordinate={{
                latitude: place.location?.latitude,
                longitude: place.location?.longitude
            }}
            onPress={()=>setSelectedMarker(index)}
        >
            {selectedMarker == index ?
                <Image source={require('./../../../assets/images/Marker.png')}
                    style={{ width: 36, height: 44 }}
                />
            :<Image source={require('./../../../assets/images/Marker-2.png')}
                style={{ width: 32.25, height: 39 }}
            />}
        </Marker>
    )
}