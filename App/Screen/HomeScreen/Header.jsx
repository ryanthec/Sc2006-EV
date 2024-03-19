import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colours from '../../Utils/Colours';
import { StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text>Header</Text>
      <Ionicons name="search-circle-sharp" size={50} color={Colours.CREAM}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    }
})