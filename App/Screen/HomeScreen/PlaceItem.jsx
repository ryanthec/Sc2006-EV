import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import Colours from '../../Utils/Colours'
import GlobalApi from '../../Utils/GlobalApi';

export default function PlaceItem({ place }) {
    const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";

    return (
        // TouchableOpacity for expansion???
        <TouchableOpacity style={styles.CardContainer}
            onPress={() => { }}>
            <View
                style={{
                    flexGrow: 1,
                    backgroundColor: Colours.DARK,
                    margin: 10,
                    borderRadius: 10,
                    width: Dimensions.get('screen').width * 0.9,
                    paddingBottom: 10
                }}>


                {/* <Image
                source={
                    place && place.photos && place.photos.length > 0
                        ? {
                            uri: `${PLACE_PHOTO_BASE_URL}${place.photos[0]?.name}/media?key=${GlobalApi.API_KEY}&maxHeightPx=800&maxWidthPx=1200`
                        }
                        : require('./../../../assets/images/login-bg.png')
                } */}
                {/* style={{
                width: '100%', borderRadius: 10,
                height: 130
            }}
        /> */}

                {/* NAME */}
                <View style={{ padding: 15 }}>
                    <Text style={{
                        fontSize: 20,
                        color: Colours.WHITE,
                        fontFamily: 'Inter-Bold',
                        width: '60%', // Set width to 50% of the parent container

                    }}>{place.displayName?.text}</Text>
                    {/* Address */}
                    <View style={styles.AddressContainer}>
                        <Image source={require('./../../../assets/images/assistant_navigation.png')}
                            style={{ width: 15, height: 15 }} />
                        <Text style={{
                            color: Colours.CREAM,
                            fontFamily: 'Inter-SemiBold',
                            marginLeft: 8,
                        }}>{place?.formattedAddress}</Text>
                    </View>
                    {/* Connectors */}
                    <View style={{
                        marginTop: 5,
                    }}>
                        <View style={styles.ConnectContainer}>
                            <Image source={require('./../../../assets/images/Lightning.png')}
                                style={{ width: 11, height: 15 }}
                            />
                            <Text style={{
                                fonFamily: 'Inter-Bold',
                                color: Colours.CREAM,
                                marginLeft: 10,
                            }}>Connectors</Text>
                        </View>
                        <Text style={{
                            fontFamily: 'Inter-SemiBold',
                            fontSize: 20,
                            marginTop: 2,
                            marginLeft: 22,
                            color: Colours.CREAM
                        }}>{place?.evChargeOptions?.connectorCount} Points</Text>
                    </View>

                    {/* Thinking of how to make the bottom part expand using the TouchableOpacity */}
                    <View style={styles.expandedContainer}>
                        <Text style={{ color: Colours.WHITE, fontFamily: 'Inter-SemiBold', fontSize: 20 }}>
                            Connector type
                        </Text>
                        <Image source={require('./../../../assets/images/white-line.png')}
                            style={{ width: 350, height: 15, alignSelf: 'center' }} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    ConnectContainer: {
        flexDirection: 'row', // Horizontal alignment
    },
    AddressContainer: {
        flexDirection: 'row', // Horizontal alignment
        marginTop: 10
    },
    CardContainer: {
        flexGrow: 1,
        width: '200',
        height: 'auto',
        margin: 9.5,
    },
    expandedContainer: {
        flexGrow: 1,
        marginTop: 10,

    }
});