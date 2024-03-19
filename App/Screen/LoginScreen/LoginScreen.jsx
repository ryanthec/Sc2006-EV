import { TouchableOpacity, Button, ImageBackground, View, TextInput, Text, Image, StyleSheet, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import Colours from './../../Utils/Colours'
import ImageOverlay from 'react-native-image-overlay'
import { FIREBASE_AUTH } from '../../../src/firebase/config'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }
    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email,password);
            console.log(response);
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
        flex:1
    }}>
        <ImageBackground source={require('./../../../assets/images/login-bg.png')}
            style={{width:'100%',height:'100%',display:"flex",
            justifyContent:'center',
            alignItems:'center',}}
        >
            <Image source={require('./../../../assets/images/logo.png')} style={styles.logoImage}>
            </Image>
            <View style={styles.padding}>
                <KeyboardAvoidingView behavior='padding'>
                <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text)=>setEmail(text)}></TextInput>
                <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text)=>setPassword(text)}></TextInput>
                </KeyboardAvoidingView>   
            </View>
            <View>
                <TouchableOpacity style={styles.loginButton}
                onPress={signIn}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.regButton}
                onPress={signUp}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    logoImage:{
        width:200,
        height:40,
        objectFit:'contain'
    },
    padding:{
        backgroundColor:Colours.CREAM, 
        padding:15,
        borderRadius:4,
        borderWidth:0.5,
        borderColor: Colours.DARKCREAM
    },
    input:{
        marginVertical:4,
        width:300,
        borderWidth:1,
        borderRadius:4,
        padding:16,
        color:Colours.BLACK,
        backgroundColor:Colours.WHITE
    },
    buttonText:{
        color:Colours.WHITE,
        textAlign:'center',
        fontFamily:'Inter-Bold',
        fontSize: 13
    },
    loginButton:{
        backgroundColor:Colours.PRIMARY,
        padding:16,
        width:175,
        display:'flex',
        borderRadius:10,
        marginTop:10,
    },
    regButton:{
        backgroundColor:Colours.BLACK,
        padding:16,
        width:175,
        display:'flex',
        borderRadius:10,
        marginTop:10
    }
})