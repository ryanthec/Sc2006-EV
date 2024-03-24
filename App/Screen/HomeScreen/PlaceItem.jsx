import { View, Text, Dimensions, touchableo, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import Colours from '../../Utils/Colours'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { getFirestore } from 'firebase/firestore'
import { app } from '../../../src/firebase/config'
import { doc, setDoc } from "firebase/firestore"; 
import { UserContext } from '../../../App'
import { useContext } from 'react'

export default function PlaceItem({ place, onPress }) {

  const db = getFirestore(app);
  const onSetFav=async(place)=>{
    // Add a new document in collection "cities"
    await setDoc(doc(db, "ev-fav-place", (place.id).toString()), place);
  }

  return (
    <TouchableOpacity onPress={() => onPress(place)}>
      <View
        style={{
          padding: 15,
          backgroundColor: Colours.PRIMARY,
          paddingBottom: 20,
          margin: 19,
          borderRadius: 10,
          width: Dimensions.get('screen').width * 0.9,
        }}>

        <View>
          <Text
            style={{
              color: Colours.WHITE,
              fontSize: 21,
              fontFamily: 'Inter-Bold',
              paddingBottom: 10,
            }}>
            {place.displayName?.text}
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Image source={require('./../../../assets/images/assistant_navigation.png')}
            style={{ width: 15, height: 15, marginRight: 5, marginTop: 1.5 }} />
          <Text
            style={{
              color: Colours.WHITE,
              fontSize: 14,
              fontFamily: 'Inter-Regular',
              paddingBottom: 10,
            }}>
            {place?.shortFormattedAddress}
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Image source={require('./../../../assets/images/lightning.png')}
            style={{ width: 11, height: 15, marginRight: 7, marginTop: 3 }} />
          <Text style={{
            color: Colours.WHITE,
            fontSize: 14,
            fontFamily: 'Inter-Regular',
            paddingBottom: 2,
          }}>Connectors</Text>

        </View>

        <View style={{ paddingLeft: 18, flexDirection: 'row' }}>
          <Text
            style={{
              color: Colours.WHITE,
              fontSize: 21,
              fontFamily: 'Inter-Bold',
            }}>
            {place?.evChargeOptions?.connectorCount} Points
          </Text>
          <Pressable style={{
            marginLeft: 120, 
            backgroundColor: Colours.BLUE, 
            borderRadius: 5, 
            padding: 10,
            paddingHorizontal: 25, 
            flexDirection: 'row'
          }} onPress={()=>onSetFav(place)}>
            <Ionicons style={{ marginTop: 1, marginRight: 5 }} name="bookmark-outline" size={15} color="white" />
            <Text style={{
              fontSize: 14,
              fontFamily: 'Inter-Bold',
              textAlign: 'center',
              color: Colours.WHITE,
            }}>Save</Text>
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
}
