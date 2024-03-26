import { View, Text } from 'react-native'
import React from 'react'
import Colours from '../../../Utils/Colours'
import ReviewItem from './ReviewItem'

export default function Reviews({place}) {
  return (
    <View style={{height:450,backgroundColor:Colours.PRIMARY,margin:10}}>
      <ReviewItem place = {place}/>
    </View>
  )
}