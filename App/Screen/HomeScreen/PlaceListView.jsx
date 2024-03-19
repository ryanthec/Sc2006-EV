import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import PlaceItem from './PlaceItem'
import { useRef } from 'react'
import { useEffect } from 'react';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';

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
    })
    return (
        <View>
            <FlatList
                data={placeList}
                pagingEnabled
                horizontal={true}
                ref={FlatListRef}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        <PlaceItem place={item} />
                    </View>
                )}
            />
        </View>
    )
}