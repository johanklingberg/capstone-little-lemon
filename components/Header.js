import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header() {
  const navigation = useNavigation();

  

  return (
    <View style={{ backgroundColor: '#495E57', margin: 0 }}>
      <Text style={{ color: '#F4CE14', fontSize: 42, textAlign: 'left', margin: 10 }}>Little Lemon</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#EDEFEE', fontSize: 32, textAlign: 'left' }}>Chicago</Text>
          <Text style={{ color: '#EDEFEE', fontSize: 18, textAlign: 'left' }}>
            We are a family owned Mediterranean restaurant, focused on traditional recipes server with a modern twist.
          </Text>
        </View>
        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
            <Image
            source={require('../images/Hero_image.png')}
            style={{ width: 100, height: 100, borderRadius: 50 }}
            />
        </View>
      </View>
      <View style={{ margin: 10 }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10 }}>
          <MaterialIcons name="search" size={24} color="black" />
          <TextInput
            style={{ flex: 1, marginLeft: 10, borderWidth: 0 }}
            placeholder="Search"
            placeholderTextColor="#000000"
            onPress={() => navigation.navigate('Search')}
          />
        </View>
      </View>
      <View style={{ height: 10 }} />
    </View>
    
  );
}
