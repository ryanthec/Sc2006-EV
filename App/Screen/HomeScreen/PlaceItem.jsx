import { View, Text, Dimensions, touchableo } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import Colours from '../../Utils/Colours'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

export default function PlaceItem({ place, onPress }) {
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

        <View style={{ paddingLeft: 18 }}>
          <Text
            style={{
              color: Colours.WHITE,
              fontSize: 21,
              fontFamily: 'Inter-Bold',
            }}>
            {place?.evChargeOptions?.connectorCount} Points
          </Text>
        </View>

      </View>
    </TouchableOpacity>
  );
}