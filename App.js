import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';
import HomeScreen from './screens/Home';
import { isOnboardingCompleted } from './utils/State';
import { LogBox } from 'react-native';
import { MenuProvider } from './utils/MenuProvider';

LogBox.ignoreLogs(['new NativeEventEmitter']);


import { ActivityIndicator } from 'react-native';


function HeaderRightButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <Image
        style={{ width: 30, height: 30, marginRight: 10 }}
        source={require('./images/Profile.png')}
      />
    </TouchableOpacity>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 300, height: 50, resizeMode: 'contain', alignSelf: 'center' }}
      source={require('./images/Logo.png')}
    />
  );
}
  
  const Stack = createNativeStackNavigator();

export default function App() {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  (async () => {
    console.log("H: " + await isOnboardingCompleted());
    setOnboardingCompleted(await isOnboardingCompleted());
    setIsLoading(false);
  })();
}, []);
  
if (isLoading) {
  return <ActivityIndicator />; // Or some other loading indicator
}

  return (
    <NavigationContainer>
      <MenuProvider>
        <Stack.Navigator 
          initialRouteName={onboardingCompleted ? "Home" : "Welcome"}
          screenOptions={{
            headerRight: () => (
              <HeaderRightButton />
            ),
            headerTitle: () => (
              <LogoTitle />
            ),
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Welcome" component={OnboardingScreen} options={{ headerRight: null }} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </MenuProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
