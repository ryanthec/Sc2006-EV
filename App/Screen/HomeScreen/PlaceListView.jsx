<<<<<<< HEAD
import { View, Text, FlatList } from 'react-native'
import React, { useRef } from 'react'
import PlaceItem from './PlaceItem';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import ExpandedPlaceItem from './ExpandedPlaceItem'
import { Dimensions } from 'react-native';
import { useEffect } from 'react';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';
import { useContext } from 'react';

export default function PlaceListView({ placeList }) {

    const flatListRef = useRef(null);
    const {selectedMarker,setSelectedMarker}=useContext(SelectMarkerContext);

    useEffect(() => {
        selectedMarker&&scrollToIndex(selectedMarker);
    }, [selectedMarker]);

    const scrollToIndex=(index)=>{
        flatListRef.current?.scrollToIndex({animated:true,index})
    }
    const getItemLayout=(_,index)=>({
        length:Dimensions.get('window').width,
        offset:Dimensions.get('window').width*index,
        index
    });

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
                pagingEnabled
                ref={flatListRef}
                getItemLayout={getItemLayout}
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
=======
import { View, Text, FlatList, Dimensions, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import PlaceItem from './PlaceItem'
import { useRef } from 'react'
import { useEffect } from 'react';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';
import Colours from '../../Utils/Colours';

export default function PlaceListView({ placeList }) {
    const FlatListRef = useRef(null);
    const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);

    // slide the display to the left
    useEffect(() => {
        selectedMarker && scrollToIndex(selectedMarker)
    }, [selectedMarker])

    const scrollToIndex = (index) => {
        FlatListRef.current?.scrollToIndex({ animated: true, index })
    }
    const getItemLayout = (_, index) => ({
        length: Dimensions.get('window').width,
        offset: Dimensions.get('window').width * index,
        index
    });
    return (
        <View>
            <FlatList
                data={placeList}
                pagingEnabled
                horizontal={true}
                ref={FlatListRef}
                getItemLayout={getItemLayout}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1, justifyContent:'center'}}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        <PlaceItem place={item} />
                    </View>
                )
                }
            />
        </View>
    )
}

>>>>>>> master
