import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal, Alert, Image, ScrollView } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, app } from '../../../../src/firebase/config';

export default function ReviewItem({ place }) {
    const user = FIREBASE_AUTH.currentUser;
    const db = getFirestore(app);
    const [reviewText, setReviewText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const reviewsSnapshot = await getDocs(query(collection(db, 'ev-reviews'), where('place.id', '==', place.id)));
            const reviewsData = reviewsSnapshot.docs.map(doc => doc.data());
            console.log(reviewsData)
            setReviews(reviewsData);
        };
        fetchReviews();
    }, [place]); // Add place to dependency array to refetch reviews when place changes

    const addReview = async () => {
        setModalVisible(true);
    };

    const handleSubmitReview = async () => {
        if (reviewText.trim() === '') {
            Alert.alert('Empty Review', 'Please write your review before submitting.');
            return;
        }
        try {
            // Add a new document in collection "ev-reviews"
            await setDoc(doc(db, 'ev-reviews', place.id.toString()), {
                place: place,
                email: user?.email,
                reviewString: reviewText,
            });
            console.log('Review added successfully');
            setModalVisible(false);
            // Fetch reviews again to get the latest
            fetchReviews();
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    const fetchReviews = async () => {
        const reviewsSnapshot = await getDocs(query(collection(db, 'ev-reviews'), where('place.id', '==', place.id)));
        const reviewsData = reviewsSnapshot.docs.map(doc => doc.data());
        setReviews(reviewsData);
    };

    return (
        <View>
            <Text>Profile Info here</Text>
            <View>
                <Text>Review Here</Text>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Write your review:</Text>
                            <TextInput
                                style={styles.reviewInput}
                                placeholder="Write your review here"
                                onChangeText={(text) => setReviewText(text)}
                                value={reviewText}
                                multiline
                            />
                            <TouchableOpacity style={styles.button} onPress={handleSubmitReview}>
                                <Text style={styles.buttonText}>Submit Review</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.addReviewBtn}>
                    <TouchableOpacity onPress={addReview}>
                        <Text style={styles.addReviewBtnText}>Add Review</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.reviewContainer}>
                    {reviews.map((review, index) => (
                        <View key={index} style={styles.reviewCard}>
                            <Image style={styles.profileImage} source={{ uri: review.profilePicture }} />
                            <View style={styles.reviewContent}>
                                <Text style={styles.username}>{review.username}</Text>
                                <Text>{review.reviewString}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    reviewInput: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        height: 100,
        width: 200,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 10,
        width: '100%',
        backgroundColor: '#2196F3',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonClose: {
        backgroundColor: '#FF0000',
    },
    addReviewBtn: {
        backgroundColor: 'white',
        padding: 20,
        fontSize: 50
    },
    addReviewBtnText:{
        fontSize: 20
    },
    reviewContainer: {
        marginTop: 20,
    },
    reviewCard: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    reviewContent: {
        flex: 1,
    },
    username: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
});
