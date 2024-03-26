import { View, Text, Dimensions, touchableo, Pressable } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { getFirestore } from 'firebase/firestore'
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { StyleSheet } from 'react-native'
import { FIREBASE_AUTH, app } from '../../../../src/firebase/config';


export default function ReviewItem({place}) {
    
    const user = FIREBASE_AUTH.currentUser
    const db = getFirestore(app);

    const addReview = async()=>{
        try {
            // Add a new document in collection "ev-reviews"
            await setDoc(doc(db, "ev-reviews", place.id.toString()), {
                place: place,
                email: user?.email,
                reviewString: 'Hello'
            });
            console.log("Review added successfully");
        } catch (error) {
            console.error("Error adding review:", error);
        }
      }



    return (
        <View>
            <Text>Profile Info here</Text>
            <View>
                <Text>Review Here</Text>
                <View style={styles.addReviewBtn}>
                    <TouchableOpacity onPress={addReview}>
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