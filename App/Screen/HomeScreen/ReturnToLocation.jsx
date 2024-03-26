import React, { useContext } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { UserLocationContext } from '../../Context/UserLocationContext';

export default function ReturnToLocation() {
    const { location, setLocation } = useContext(UserLocationContext);

    const handlePress = () => {
        // If location is available, set it again (no need to request permission again)
        if (location) {
            setLocation(location);
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Image source={require('./../../../assets/images/LiveLocation.png')}
                style={{
                    width: 40, height: 40, transform: [{ rotate: '45deg' }]
                }} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        marginRight: 30,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center', // Center content vertically
        maxHeight: 50, // Set maximum height for the container
    },
});
