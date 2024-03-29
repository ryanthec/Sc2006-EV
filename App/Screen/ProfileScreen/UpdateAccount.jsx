import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAuth, AuthCredential, reauthenticateWithCredential, EmailAuthProvider, updatePassword, EmailAuthCredential } from 'firebase/auth'
import { FIREBASE_AUTH, app } from '../../../src/firebase/config';
import { getFirestore, Firestore, doc, updateDoc } from '@firebase/firestore';

function UpdateAccount() {
    const [newUsername, setNewUsername] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = FIREBASE_AUTH;

    const handleChangePassword = async () => {
        setLoading(true);
        try {
            const user = auth.currentUser;

            if (!checkPasswordStrength(newPassword)) {
                return;
            }
            if (newPassword !== confirmPassword) {
                Alert.alert('Error', 'Passwords do not match!');
                return;
            }
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential).then((result) => {
                Alert.alert('Success', 'Password changed successfully!');
                updatePassword(user, newPassword);
                //console.log('password changed');
            })
                .catch((error) => {
                    return alert('wrong password');
                });
        } catch (error) {
            console.log(error);
            Alert.alert('Error', error);
        } finally {
            setLoading(false);
        }
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

    const handleChangeUsername = async () => {
        console.log('entered function');
        setLoading(true);
        const user = getAuth().currentUser;
        const db = getFirestore(app);
        const docRef = doc(db, "username", user.email)
        console.log(docRef);
        console.log(user.email);
        console.log(newUsername);
        const data = { username: newUsername.toString() };
        await updateDoc(docRef, data);
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

    return (
        <View>
            <TextInput value={newUsername} onChangeText={(text) => setNewUsername(text)}
                placeholder="User" />
            <TextInput value={currentPassword} onChangeText={(password) => setCurrentPassword(password)}
                placeholder="Current Password" secureTextEntry={true} />
            <TextInput value={newPassword} onChangeText={(password) => setNewPassword(password)}
                placeholder="New Password" secureTextEntry={true} />
            <TextInput value={confirmPassword} onChangeText={(password) => setConfirmPassword(password)}
                placeholder="Confirm New Password" secureTextEntry={true} />
            <TouchableOpacity title="Change Password" onPress={handleChangePassword}>
                <Text> Change Password </Text>
            </TouchableOpacity>
            <TouchableOpacity title="Change Username" onPress={handleChangeUsername}>
                <Text> Change Username </Text>
            </TouchableOpacity>
        </View>
    );
}


export default UpdateAccount;