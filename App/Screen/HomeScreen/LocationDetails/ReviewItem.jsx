import { View, Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH, app } from '../../../../src/firebase/config';
import { getFirestore } from '@firebase/firestore';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default function ReviewItem(place) {
    
    const user = FIREBASE_AUTH.currentUser
    const db = getFirestore(app);

    const addReview = async(place)=>{
        // Add a new document in collection "ev-reviews"
        await setDoc(doc(db, "ev-reviews", (place.id).toString()), 
       { place:place,
        email:user?.email,
        reviewString:''})
      }

    

    return (
        <View>
            <Text>Profile Info here</Text>
            <View>
                <Text>Review Here</Text>
                <View style={styles.addReviewBtn}>
                    <TouchableOpacity onPress={() => addReview(place)}>
                        <Text>Add Reviews</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    addReviewBtn:{
        backgroundColor:"white",
        padding:20,
    }
})