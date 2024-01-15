import React, { useContext, useState, useEffect } from 'react';
import { FlatList, View, Text, Image } from 'react-native';
import {getFilteredMenuItems} from '../utils/MenuData';
import { SettingsContext } from '../utils/MenuProvider';

const MenuList = () => {
  const { settings, updateSetting } = useContext(SettingsContext);
  
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    getFilteredMenuItems(settings.selectedCategories, "")
      .then(data => setMenuData(data));
      
  }, []);

  useEffect(() => {
    getFilteredMenuItems(settings.selectedCategories, "")
      .then(data => setMenuData(data));
      console.log("MenuData: " + JSON.stringify(menuData));
  }, [settings.selectedCategories]);
  
  const dummyData = [
    { id: '1', name: 'Greek Salad', description: 'The famous greek salad of crispy lettuce', price: '12.99', image: 'images/Bruschetta.png' },
    { id: '2', name: 'Item 2', description: 'Description 2', price: '12.99', image: 'images/Bruschetta.png' },
    { id: '3', name: 'Item 3', description: 'Description 3', price: '12.99', image: 'images/Bruschetta.png' },
  ];

  const renderItem = ({ item }) => (
    <View style={{ margin: 10, backgroundColor: '#FFF' }}>
        
    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.name}</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, marginTop: 5 }}>
      <View style={{ flex: 0.8, margin: 5 }}>        
        <Text style={{ fontSize: 14 }}>{item.description}</Text>
        <View style={{ flex: 1 }}></View>
        <Text style={{ fontSize: 14, fontWeight: 'bold', alignSelf: 'flex-start' }}>${item.price}</Text>
      </View>
      <View style={{ flex: 0.4 }}>
        <Image source={require("../images/Bruschetta.png") } style={{ width: 100, height: 100 }} />
      </View>
    </View>
    
    </View>
  );

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={{ borderColor: '#DDDDDD', borderBottomWidth: 1 }} />}
      data={menuData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export default MenuList;
