import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import Colours from '../../Utils/Colours'
import GlobalApi from '../../Utils/GlobalApi';

export default function PlaceItem({ place }) {
    const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
    return (
        <View
            style={{
                backgroundColor: Colours.WHITE,
                margin: 10,
                borderRadius: 10,
                width: Dimensions.get('screen').width * 0.9,
                paddingBottom: 10
            }}>
            <Image
                source={
                    place && place.photos && place.photos.length > 0
                        ? {
                            uri: `${PLACE_PHOTO_BASE_URL}${place.photos[0]?.name}/media?key=${GlobalApi.API_KEY}&maxHeightPx=800&maxWidthPx=1200`
                        }
                        : require('./../../../assets/images/login-bg.png')
                }
                style={{
                    width: '100%', borderRadius: 10,
                    height: 130
                }}
            />
            {/* HELPPPPPPPP IDK why fonts cant work */}
            <View style={{ padding: 15 }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'Inter-Bold'
                }}>{place.displayName?.text}</Text>
                <Text style={{
                    color: Colours.GRAY,
                    fontFamily: 'Inter-SemiBold'
                }}>{place?.formattedAddress}</Text>
                <View style={{
                    marginTop: 5,
                }}>
                    <Text style={{
                        fonFamily: 'Inter-Bold',
                        color: Colours.GRAY
                    }}>Connectors</Text>
                    <Text style={{
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 20,
                        marginTop: 2
                    }}>{place.evChargeOptions.connectorCount}</Text>
                </View>
            </View>

        </View>
    )
}