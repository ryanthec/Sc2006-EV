import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import React, { useContext } from 'react';
import Colours from '../../Utils/Colours';
import { UserLocationContext } from '../../Context/UserLocationContext';

export default function GetDistance({ place }) {
    const { location } = useContext(UserLocationContext);
    const distance = getDis(location.latitude, location.longitude, place.location.latitude, place.location.longitude);
    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.displayName.text)}`;
        Linking.openURL(url);
    };
    return (
        <TouchableOpacity style={styles.container} onPress={openGoogleMaps}>
            <Image source={require('./../../../assets/images/Location.png')}
                style={{ width: 20, height: 20 }} />
            <Text style={{ color: Colours.WHITE }}>
                {distance.toFixed(2)} km
            </Text>
        </TouchableOpacity>
    );
}

// Function to calculate distance between two points using Haversine formula
function getDis(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1); // Convert degrees to radians
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

// Function to convert degrees to radians
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

const styles = StyleSheet.create({
    container: {
        marginRight: -3,
        marginTop: 20,
        backgroundColor: Colours.GRAY,
        width: 102,
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 25,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center', // Center content vertically
        maxHeight: 50, // Set maximum height for the container
    },
});
