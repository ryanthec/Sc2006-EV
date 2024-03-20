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
          paddingBottom: 500,
          margin: 0,
          borderRadius: 10,
          width: Dimensions.get('screen').width,
        }}>
        <View>
          <Text
            style={{
              color: Colours.WHITE,
              fontSize: 17,
              fontFamily: 'Inter-Bold',
            }}>
            {place.displayName?.text}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: Colours.WHITE,
              fontSize: 12,
              fontFamily: 'Inter-Regular',
            }}>
            {place?.shortFormattedAddress}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}