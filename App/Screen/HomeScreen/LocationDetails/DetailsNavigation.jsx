import { View, Text } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Colours from '../../../Utils/Colours'
import { useState } from 'react'
import Connectors from './Connectors'
import Services from './Services'
import Reviews from './Reviews'
import { StyleSheet } from 'react-native'

export default function DetailsNavigation() {
    const [connectors, setConnectors] = useState('');
    const [services, setServices] = useState('');
    const [reviews, setReviews] = useState('');

    const connectorsPressed = async () => {
        setConnectors(true);
        setServices(false);
        setReviews(false);
        //console.log(connectors)
    }
    const servicesPressed = async () => {
        setConnectors(false);
        setServices(true);
        setReviews(false);
        //console.log(services)
    }
    const reviewsPressed = async () => {
        setConnectors(false);
        setServices(false);
        setReviews(true);
        //console.log(reviews)
    }

    return (
        <View style={{ backgroundColor: Colours.PRIMARY, height: 500 }}>
            <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                {!connectors && <TouchableOpacity style={styles.header} onPress={connectorsPressed}>
                    <Text style={styles.headerText}>Connectors</Text>
                </TouchableOpacity>}
                {connectors && <TouchableOpacity style={styles.headerPressed} onPress={connectorsPressed}>
                    <Text style={styles.headerText}>Connectors</Text>
                </TouchableOpacity>}
                {services && <TouchableOpacity style={styles.headerPressed} onPress={servicesPressed}>
                    <Text style={styles.headerText}>Services</Text>
                </TouchableOpacity>}
                {!services && <TouchableOpacity style={styles.header} onPress={servicesPressed}>
                    <Text style={styles.headerText}>Services</Text>
                </TouchableOpacity>}
                {reviews&&<TouchableOpacity style={styles.headerPressed} onPress={reviewsPressed}>
                    <Text style={styles.headerText}>Reviews</Text>
                </TouchableOpacity>}
                {!reviews && <TouchableOpacity style={styles.header} onPress={reviewsPressed}>
                    <Text style={styles.headerText}>Reviews</Text>
                </TouchableOpacity>}
            </View>
            {connectors && <View>
                <Connectors />
            </View>}
            {services && <View>
                <Services />
            </View>}
            {reviews && <View>
                <Reviews />
            </View>}
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        padding: 12,
        backgroundColor: Colours.WHITE,
        width: 120,
    },
    headerPressed: {
        padding: 12,
        backgroundColor: Colours.WHITE,
        width: 120,
        borderBottomColor: 'red',
        borderBottomWidth: 2,
    },
    headerText: {
        textAlign: 'center',
        color: Colours.BLACK,
        fontFamily: 'Inter-Bold',
        fontSize: 13
    }
});