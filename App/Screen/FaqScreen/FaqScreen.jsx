import { View, Text } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native'

export default function FaqScreen() {
  return (
    <View>
      <ImageBackground source={require('./../../../assets/images/login-bg.png')}
            style={{width:'100%',height:'100%',display:"flex",
            justifyContent:'center',
            alignItems:'center',}}
        >
      <Text>FAQ Placeholder</Text>
      </ImageBackground>
    </View>
  )
}