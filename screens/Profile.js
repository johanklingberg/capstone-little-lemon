import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import { getProfileInfo, saveProfileChanges, logout } from '../utils/State';
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const options =[
    { label: 'Order statuses', value: '1' },
    { label: 'Password changes', value: '2' },
    { label: 'Special offers', value: '3' },
    { label: 'Newsletter', value: '4' },
  ];

  function setSelection(val) {
    console.log(val);
  }

export default function Profile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveChanges = async () => {
    await saveProfileChanges(image, firstName, lastName, email, phoneNumber, true, true, true, true);
  };

  const removeImage = (async ) => {
    setImage(null);
  }

  useEffect(() => {
    getProfileInfo().then(({ firstName, email }) => {
      setFirstName(firstName);
      setEmail(email);
    });
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Personal information</Text>
      <Text style={{fontSize: 12}}>Avatar</Text>
      <View style={styles.profilePicContainer}>
        {image ? 
          <Image style={styles.profilePic} source={{ uri: image }} /> :
          <View style={{...styles.profilePic, backgroundColor: '#495E57', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 20}}>
              {firstName[0]?.toUpperCase()}{lastName[0]?.toUpperCase()}
            </Text>
          </View>
        }
        <View style={{width: 20}}></View>
        <TouchableOpacity style={styles.changeButton} onPress={pickImage}><Text style={styles.changeButtonText}>Change</Text></TouchableOpacity>
        <TouchableOpacity style={styles.removeButton} onPress={removeImage}><Text>Remove</Text></TouchableOpacity>
      </View>
      <Text>First name</Text>
      <TextInput style={styles.inputRounded} value={firstName} onChangeText={setFirstName} />
      <Text>Last name</Text>
      <TextInput style={styles.inputRounded} value={lastName} onChangeText={setLastName} />
      <Text>Email</Text>
      <TextInput style={styles.inputRounded} value={email} onChangeText={setEmail} />
      <Text>Phone number</Text>
      {/* <TextInput style={styles.inputRounded} value={phoneNumber} onChangeText={handlePhoneNumberChange} /> */}
      <MaskedTextInput
        value={phoneNumber}
        mask="(999) 999-9999"
        onChangeText={(text, rawText) => {
          setPhoneNumber(text);
        }}
        style={{...styles.inputRounded, borderWidth: 1, borderColor: 'black', height: 40, alignSelf: 'stretch'}}
      />
      <Text style={styles.header}>Email notifications</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Image style={{ width: 20, height: 20, marginRight: 10 }} source={require('../images/checkbox.png')} />
        <Text>Order statuses</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Image style={{ width: 20, height: 20, marginRight: 10 }} source={require('../images/checkbox.png')} />
        <Text>Password changes</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Image style={{ width: 20, height: 20, marginRight: 10 }} source={require('../images/checkbox.png')} />
        <Text>Special offers</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Image style={{ width: 20, height: 20, marginRight: 10 }} source={require('../images/checkbox.png')} />
        <Text>Newsletter</Text>
      </View>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}><Text>Logout</Text></TouchableOpacity>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>        
        <TouchableOpacity style={{...styles.removeButton, marginLeft: 40}}><Text>Discard changes</Text></TouchableOpacity>
        <TouchableOpacity onPress={saveChanges} style={{...styles.changeButton, marginRight: 40}}><Text style={styles.changeButtonText}>Save changes</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  profilePicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  inputRounded: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    alignSelf: 'stretch',
    marginBottom: 10,
    borderRadius: 5,
  },
  changeButton: {
    backgroundColor: '#495E57',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  changeButtonText: {
    color: '#EDEFEE',
  },
  removeButton: {
    backgroundColor: '#EDEFEE',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  logoutButton: {
    backgroundColor: '#F4CE14',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignSelf: 'stretch',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label: {
    margin: 8,
  },
});