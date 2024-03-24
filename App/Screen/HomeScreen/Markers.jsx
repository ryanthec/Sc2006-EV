<<<<<<< HEAD
import { View, Text } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'
import { Image } from 'react-native'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'
import { useContext } from 'react'

export default function Markers({ index, place }) {
    
    const {selectedMarker,setSelectedMarker}=useContext(SelectMarkerContext);

    return place&&(
=======
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Marker } from 'react-native-maps'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'

export default function Markers({ index, place }) {

    const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);
    return place && (

>>>>>>> master
        <Marker
            coordinate={{
                latitude: place.location?.latitude,
                longitude: place.location?.longitude
            }}
<<<<<<< HEAD
            onPress={()=>setSelectedMarker(index)}
        >
            {selectedMarker == index ?
                <Image source={require('./../../../assets/images/marker.png')}
                    style={{ width: 36, height: 44 }}
                />
            :<Image source={require('./../../../assets/images/marker-2.png')}
                style={{ width: 32.25, height: 39 }}
            />}
        </Marker>
=======

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


>>>>>>> master
    )
}