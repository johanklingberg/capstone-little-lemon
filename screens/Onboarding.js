import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { isOnboardingCompleted, setUserInfo } from '../utils/State';
import { useNavigation } from '@react-navigation/native';

export default function Onboarding() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigation = useNavigation();

  const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Use effect to update the state of the button
  React.useEffect(() => {
    setIsButtonDisabled(firstName === '' || !isValidEmail(email));
  }, [firstName, email]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../images/Logo.png')}
      />
      <Text style={styles.header}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={text => setFirstName(text.replace(/[^a-zA-Z]/g, ''))}
        defaultValue={firstName}
      />
      <Text style={styles.header}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        defaultValue={email}
        keyboardType="email-address"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
            await setUserInfo(firstName, email);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
        }}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  logo: {
    flex: 1, 
    width: 300, 
    height: 100, 
    resizeMode: 'contain'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 10, // Added to make the corners rounded
  },
  button: {
    height: 50,
    backgroundColor: '#F4CE14', 
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    margin: 4,
    cursor: 'pointer',
    borderRadius: 10, // Added to make the corners rounded
  },
  buttonText: {
    textAlign: 'center'
  },
});
