import { Alert, TouchableOpacity, Button, ImageBackground, View, TextInput, Text, Image, StyleSheet, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colours from './../../Utils/Colours'
import ImageOverlay from 'react-native-image-overlay'
import AppMapView from '../HomeScreen/AppMapView'
import { FIREBASE_AUTH } from '../../../src/firebase/config'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const user = await getAuth().currentUser;
            await signInWithEmailAndPassword(auth, email, password);
            if (user) {
                return <AppMapView />;
            }
        } catch (error) {
            console.log(error);
            alert('Invalid credentials!');
        } finally {
            setLoading(false);
        }
    }

    // checks if input email is valid
    const validateEmail = (email) => {
        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegEx.test(email);
    }

    // checks if input password is strong enough 
    const checkPasswordStrength = (password) => {
        function containsDigits(password) {
            return /\d/.test(password);
        }
        function containsUppercaseChar(password) {
            return /[A-Z]/.test(password);
        }
        function containsLowercaseChar(password) {
            return /[a-z]/.test(password);
        }
        if (password.length < 8) {
            showAlert("shortPassword");
            return false;
        }
        else if (!containsDigits(password)) {
            showAlert("noDigits");
            return false;
        }
        else if (!containsUppercaseChar(password)) {
            showAlert("noUppercase");
            return false;
        }
        else if (!containsLowercaseChar(password)) {
            showAlert("noLowercase");
            return false;
        }
        return true;
    }

    // displays alert depending on the type of password error
    const showAlert = (type) => {
        switch (type) {
            case "shortPassword":
                return (
                    Alert.alert(
                        'Weak Password',
                        'Password must be minimally 8 characters',
                    )
                );
            case "noDigits":
                return (
                    Alert.alert('Weak Password',
                        'Password must include a number')
                );
            case "noUppercase":
                return (
                    Alert.alert('Weak Password',
                        'Password must include uppercase character')
                );
            case "noLowercase":
                return (
                    Alert.alert('Weak password',
                        'Password must include lowercase character')
                );
            default:
                break;
        }
    }

    const signUp = async (email, password) => {
        setLoading(true);
        // attempts to validate email
        if (!validateEmail(email)) {
            return (Alert.alert('Invalid email', 'Please enter a valid email address'))
        }
        // check password strength
        if (!checkPasswordStrength(password)) {
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(FIREBASE_AUTH.currentUser);
            alert('Check your emails!');
        } catch (error) {
            console.log(error);
            alert('Sign up failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={{
            flex: 1
        }}>
            <ImageBackground source={require('./../../../assets/images/login-bg.png')}
                style={{
                    width: '100%', height: '100%', display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image source={require('./../../../assets/images/logo.png')} style={styles.logoImage}>
                </Image>
                <View style={styles.padding}>
                    <KeyboardAvoidingView behavior='padding'>
                        <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
                        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
                    </KeyboardAvoidingView>
                </View>
                <View>
                    <TouchableOpacity style={styles.loginButton}
                        onPress={signIn}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.regButton}
                        onPress={() => signUp(email, password)}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    logoImage: {
        width: 200,
        height: 40,
        objectFit: 'contain'
    },
    padding: {
        backgroundColor: Colours.CREAM,
        padding: 15,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: Colours.DARKCREAM
    },
    input: {
        marginVertical: 4,
        width: 300,
        borderWidth: 1,
        borderRadius: 4,
        padding: 16,
        color: Colours.BLACK,
        backgroundColor: Colours.WHITE
    },
    buttonText: {
        color: Colours.WHITE,
        textAlign: 'center',
        fontFamily: 'Inter-Bold',
        fontSize: 13
    },
    loginButton: {
        backgroundColor: Colours.PRIMARY,
        padding: 16,
        width: 175,
        display: 'flex',
        borderRadius: 10,
        marginTop: 10,
    },
    regButton: {
        backgroundColor: Colours.BLACK,
        padding: 16,
        width: 175,
        display: 'flex',
        borderRadius: 10,
        marginTop: 10
    }
})