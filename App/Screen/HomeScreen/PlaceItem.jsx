import { View, Text, Dimensions, touchableo, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import Colours from '../../Utils/Colours'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { getFirestore } from 'firebase/firestore'
import { app } from '../../../src/firebase/config'
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { FIREBASE_AUTH } from '../../../src/firebase/config'
import { StyleSheet } from 'react-native'

export default function PlaceItem({ place, isFav, onPress, markedFav }) {

  const user = FIREBASE_AUTH.currentUser
  const db = getFirestore(app);
  const onSetFav = async (place) => {

    await setDoc(doc(db, "ev-fav-place", (place.id).toString()),
      {
        place: place,
        email: user?.email
      })
    markedFav()
  }
  const onRemoveFav = async (placeId) => {
    await deleteDoc(doc(db, "ev-fav-place", placeId.toString()));
    markedFav()
  }

  return (
    <View>

    <TouchableOpacity onPress={() => onPress(place)}>
      <View
        style={{
          padding: 15,
          backgroundColor: Colours.PRIMARY,
          margin: 19.5,
          borderRadius: 10,
          height:200,
          width: Dimensions.get('screen').width * 0.9,
        }}>


        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              color: Colours.WHITE,
              fontSize: 21,
              fontFamily: 'Inter-Bold',
              marginBottom: 10,
              marginRight: 20
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

        <View style={{ marginLeft: 18 }}>
          <Text
            style={{
              color: Colours.WHITE,
              fontSize: 21,
              fontFamily: 'Inter-Bold',
            }}>
            {place?.evChargeOptions?.connectorCount} Points
          </Text>

          {/* {isFav ? <Pressable style={styles.blueButton} onPress={() => onRemoveFav(place.id)}>
            <Ionicons style={{ marginTop: 1, marginRight: 5 }} name="bookmark" size={15} color="white" />
            <Text style={{
              fontSize: 14,
              fontFamily: 'Inter-Bold',
              textAlign: 'center',
              color: Colours.WHITE,
            }}>Saved</Text>
          </Pressable> : <Pressable style={styles.blueButton} onPress={() => onSetFav(place)}>
            <Ionicons style={{ marginTop: 1, marginRight: 5 }} name="bookmark-outline" size={15} color="white" />
            <Text style={{
              fontSize: 14,
              fontFamily: 'Inter-Bold',
              textAlign: 'center',
              color: Colours.WHITE,
            }}>Save</Text>
          </Pressable>} */}

        </View>
      </View>
    </TouchableOpacity>

    <View>
    {isFav ? <Pressable style={styles.bookmark} onPress={() => onRemoveFav(place.id)}>
      <Image source={require('./../../../assets/images/bookmarked.png')}
        style={{ width: 40, height: 40 }} />
    </Pressable> : <Pressable style={styles.bookmark} onPress={() => onSetFav(place)}>
      <Image source={require('./../../../assets/images/bookmark.png')}
        style={{ width: 40, height: 40 }} />
    </Pressable>}
  </View>

    </View>
  );
}

const styles = StyleSheet.create({
  blueButton: {
    backgroundColor: Colours.BLUE,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    position: 'absolute',
    left: 200,
    bottom: 4
  },
  bookmark: {
    position:'absolute',
    bottom:225,
    marginHorizontal:310,
  }
});