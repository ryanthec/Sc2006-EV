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
import { getFirestore, app } from '@firebase/firestore';
import { collection, query, where, getDocs } from "firebase/firestore";
import { FIREBASE_AUTH } from '../../../src/firebase/config';


export default function PlaceListView({ placeList }) {

    const user = FIREBASE_AUTH.currentUser
    const [favList,setFavList] = useState([]);

    const flatListRef = useRef(null);
    const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);

    useEffect(() => {
        selectedMarker && scrollToIndex(selectedMarker);
    }, [selectedMarker]);

    const scrollToIndex = (index) => {
        flatListRef.current?.scrollToIndex({ animated: true, index })
    }
    const getItemLayout = (_, index) => ({
        length: Dimensions.get('window').width,
        offset: Dimensions.get('window').width * index,
        index
    });

    const db = getFirestore(app);
    useEffect(()=>{
        user&&getFav();
    },[user])

    const getFav = async() => {
        setFavList([])
        const q = query(collection(db, "ev-fav-place"), where("email", "==", user?.email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setFavList(favList=>[...favList,doc.data()]);
        });
    }

    const isFav=(place)=>{
        const result=favList.find(item=>item.place.id==place.id);
        console.log(result)
        return result?true:false;
    }

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
                        <PlaceItem place={item}
                         isFav={isFav(item)}
                         markedFav={()=>getFav()}
                         onPress={handlePlacePress} />
                    </View>
                )}
            />)}
            {expanded && <View><ExpandedPlaceItem place={selectedPlace} onPress={handlePlacePress} /></View>}
        </View>
    );
}
