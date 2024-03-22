import { View, Text } from 'react-native'
import React from 'react'
import Colours from '../../../Utils/Colours'

export default function Services() {
  return (
    <View style={{height:450,backgroundColor:Colours.WHITE,margin:10}}>
      <Text style={{color:Colours.BLACK}}>Services</Text>
    </View>
  )
}