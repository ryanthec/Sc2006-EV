import { View, Text, FlatList } from 'react-native'
import React, { useRef } from 'react'
import PlaceItem from './PlaceItem';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import ExpandedPlaceItem from './ExpandedPlaceItem'

export default function PlaceListView({ placeList }) {

    const [selectedPlace, setSelectedPlace] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const handlePlacePress = (place) => {
        setSelectedPlace(place);
        setExpanded(!expanded);
        console.log('selected place:', place);
        // Do whatever you want with the selected place
    };


    return (
        <View>
            {!expanded && (<FlatList
                data={placeList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        <PlaceItem place={item} onPress={handlePlacePress} />
                    </View>
                )}
            />)}
            {expanded && <View><ExpandedPlaceItem place={selectedPlace} onPress={handlePlacePress}/></View>}
        </View>
    );
}