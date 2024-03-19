import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback , useEffect, useState} from 'react';
import LoginScreen from './App/Screen/LoginScreen/LoginScreen';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './src/firebase/config';
import TabNavigation from './App/Navigation/TabNavigation';
import HomeScreen from './App/Screen/HomeScreen/HomeScreen';
import * as Location from 'expo-location';
import { UserLocationContext } from './App/Context/UserLocationContext';
import { createContext } from 'react';

const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <UserLocationContext.Provider value={{location,setLocation}}>
      <NavigationContainer>
        {user ? (
          <TabNavigation>
            <TabNavigation.Screen name="Home" component={HomeScreen} />
          </TabNavigation>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </UserLocationContext.Provider>
  );
}

export default App;