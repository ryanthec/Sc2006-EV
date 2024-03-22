import { View, Text } from 'react-native'
import React from 'react'
import Colours from '../../../Utils/Colours'

export default function Services() {
  return (
    <View style={{height:450,backgroundColor:Colours.PRIMARY,margin:10}}>
      <Text style={{color:Colours.WHITE}}>Services</Text>
    </View>
  )
}